import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { translations } from '../translations'
import CREDENTIALS_DATA from '../data/credentials.json'

const getImagePath = (path) => {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('http') ? path : `${base}${path}`
}

const Field = ({ label, value }) => {
  if (!value) return null
  return (
    <div className="dp-field">
      <span className="dp-field__label">{label}</span>
      <span className="dp-field__value">{value}</span>
    </div>
  )
}

function PublicCredential() {
  const [language] = useState(() => localStorage.getItem('wallet-lang') || 'es')
  const { id } = useParams()
  const t = translations[language] || translations.es
  const [imageFullscreen, setImageFullscreen] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verificationResults, setVerificationResults] = useState(null)

  const credential = CREDENTIALS_DATA.find(c => c.id === id)

  if (!credential) {
    return (
      <div className="dp-page">
        <div className="dp-header">
          <img src={getImagePath('logo_tec.png')} alt="Tec" className="dp-header__logo" />
        </div>
        <div className="dp-not-found">
          <h2>{language === 'es' ? 'Link no disponible' : 'Link not available'}</h2>
          <p>{language === 'es' ? 'Esta credencial no existe o el enlace ha expirado.' : 'This credential does not exist or the link has expired.'}</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString(language === 'es' ? 'es-MX' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const title = language === 'en' && credential.title_en ? credential.title_en : credential.title
  const description = language === 'en' && credential.description_en ? credential.description_en : credential.description
  const criteria = language === 'en' && credential.criteria_en ? credential.criteria_en : credential.criteria
  const fieldOfStudy = language === 'en' && credential.field_of_study_en ? credential.field_of_study_en : credential.field_of_study
  const specialization = language === 'en' && credential.specialization_en ? credential.specialization_en : credential.specialization
  const skills = language === 'en' && credential.skills_en ? credential.skills_en : credential.skills
  const issuerDesc = language === 'en' && credential.issuer_description_en ? credential.issuer_description_en : credential.issuer_description
  const termsOfUse = language === 'en' && credential.terms_of_use_en ? credential.terms_of_use_en : credential.terms_of_use

  const statusModifier = credential.status === 'active' ? 'active' : credential.status === 'expired' ? 'expired' : 'revoked'
  const statusLabel = credential.status === 'active' ? (language === 'es' ? 'Activa' : 'Active') : credential.status === 'expired' ? (language === 'es' ? 'Vencida' : 'Expired') : (language === 'es' ? 'Revocada' : 'Revoked')

  const isTecIssuer = /Tec|Profesional|Posgrado|Tecnológico/i.test(credential.issuer || '')

  const verificationAreas = [
    { key: 'signature', es: 'Firma digital', en: 'Digital Signature' },
    { key: 'issuer', es: 'Emisor', en: 'Issuer' },
    { key: 'integrity', es: 'Integridad', en: 'Integrity' },
    { key: 'expiration', es: 'Vigencia', en: 'Expiration' }
  ]

  const handleVerify = () => {
    setVerifying(true)
    setVerificationResults(null)
    setTimeout(() => {
      const isValid = credential.status === 'active'
      const isRevoked = credential.status === 'revoked'
      setVerificationResults({
        overall: isRevoked ? 'revoked' : isValid ? 'valid' : 'invalid',
        timestamp: new Date().toLocaleString(language === 'es' ? 'es-MX' : 'en-US'),
        areas: {
          signature: true,
          issuer: true,
          integrity: !isRevoked,
          expiration: isValid
        }
      })
      setVerifying(false)
    }, 3000)
  }

  const overallLabel = (status) => {
    if (status === 'valid') return language === 'es' ? 'Valida' : 'Valid'
    if (status === 'revoked') return language === 'es' ? 'Revocada' : 'Revoked'
    return language === 'es' ? 'Invalida' : 'Invalid'
  }

  const overallStatusClass = (status) => {
    if (status === 'valid') return 'dp-status dp-status--active'
    if (status === 'revoked') return 'dp-status dp-status--revoked'
    return 'dp-status dp-status--expired'
  }

  return (
    <div className="dp-page">
      {/* Header */}
      <div className="dp-header">
        <img src={getImagePath('logo_tec.png')} alt="Tec" className="dp-header__logo" />
      </div>

      <div className="dp-body">
        {/* Hero */}
        <div className="dp-hero">
          <img
            src={getImagePath(credential.thumbnail)}
            alt={title}
            className="dp-hero__img"
            onClick={() => setImageFullscreen(true)}
          />
          <h1 className="dp-hero-name">{title}</h1>
        </div>

        {imageFullscreen && (
          <div className="dp-fullscreen" onClick={() => setImageFullscreen(false)}>
            <img src={getImagePath(credential.thumbnail)} alt={title} className="dp-fullscreen__img" />
          </div>
        )}

        {/* Achievement Card */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Logro' : 'Achievement'}</h2>
          {description && <p className="dp-card__desc">{description}</p>}
          <Field label={language === 'es' ? 'Tipo de logro' : 'Achievement Type'} value={credential.achievement_type} />
          <Field label={language === 'es' ? 'Criterios' : 'Criteria'} value={criteria} />
          <Field label={language === 'es' ? 'Campo de estudio' : 'Field of Study'} value={fieldOfStudy} />
          <Field label={language === 'es' ? 'Especializacion' : 'Specialization'} value={specialization} />
          <Field label={language === 'es' ? 'Codigo' : 'Code'} value={credential.code} />
          <Field label={language === 'es' ? 'Creditos' : 'Credits'} value={credential.credits} />
          {skills && skills.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{t.skills || 'Skills'}</span>
              <div className="dp-tags">
                {skills.map((skill, i) => (
                  <span key={i} className="dp-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}
          {credential.alignments && credential.alignments.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{language === 'es' ? 'Alineaciones' : 'Alignments'}</span>
              <ul className="dp-alignments">
                {credential.alignments.map((a, i) => (
                  <li key={i} className="dp-alignment">
                    <a href={a.url} target="_blank" rel="noopener noreferrer">{a.name}</a>
                    {a.description && <span> - {a.description}</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {credential.results && credential.results.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{language === 'es' ? 'Resultados' : 'Results'}</span>
              <table className="dp-table">
                <thead>
                  <tr>
                    <th>{language === 'es' ? 'Nombre' : 'Name'}</th>
                    <th>{language === 'es' ? 'Valor' : 'Value'}</th>
                    <th>{language === 'es' ? 'Estado' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody>
                  {credential.results.map((r, i) => (
                    <tr key={i}>
                      <td>{r.name}</td>
                      <td>{r.value}</td>
                      <td>{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {credential.endorsements && credential.endorsements.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{language === 'es' ? 'Avales' : 'Endorsements'}</span>
              <ul className="dp-endorsements">
                {credential.endorsements.map((e, i) => (
                  <li key={i} className="dp-endorsement">
                    <strong>{e.issuer}</strong>: {e.claim}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Credential Card */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Credencial' : 'Credential'}</h2>
          <div className="dp-field">
            <span className="dp-field__label">{language === 'es' ? 'Estado' : 'Status'}</span>
            <span className={`dp-status dp-status--${statusModifier}`}>{statusLabel}</span>
          </div>
          <Field label={t.issueDate || 'Issue Date'} value={formatDate(credential.issue_date)} />
          <Field label={language === 'es' ? 'Fecha de vencimiento' : 'Expiration Date'} value={formatDate(credential.expiration_date)} />
          <Field label={language === 'es' ? 'Fecha de otorgamiento' : 'Award Date'} value={formatDate(credential.award_date)} />
          {credential.evidences && credential.evidences.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{language === 'es' ? 'Evidencias' : 'Evidences'}</span>
              <ul className="dp-evidences">
                {credential.evidences.map((ev, i) => (
                  <li key={i} className="dp-evidence">
                    <strong>{ev.name}</strong>
                    {ev.description && <p>{ev.description}</p>}
                    {ev.url && <a href={ev.url} target="_blank" rel="noopener noreferrer">{language === 'es' ? 'Ver evidencia' : 'View evidence'}</a>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {termsOfUse && <p className="dp-terms">{termsOfUse}</p>}
        </div>

        {/* Receiver Card */}
        {credential.receiver && (
          <div className="dp-card">
            <h2 className="dp-card__title">{language === 'es' ? 'Receptor' : 'Receiver'}</h2>
            <Field label={language === 'es' ? 'Nombre' : 'Name'} value={credential.receiver.name} />
            <Field label={language === 'es' ? 'Fecha de inicio' : 'Start Date'} value={formatDate(credential.receiver.start_date)} />
            <Field label={language === 'es' ? 'Fecha de fin' : 'End Date'} value={formatDate(credential.receiver.end_date)} />
            <Field label={language === 'es' ? 'Creditos obtenidos' : 'Credits Earned'} value={credential.receiver.credits_earned} />
            <Field label={language === 'es' ? 'Numero de cedula' : 'License Number'} value={credential.receiver.license_number} />
            <Field label={language === 'es' ? 'Periodo academico' : 'Academic Period'} value={credential.receiver.academic_period} />
            <Field label={language === 'es' ? 'Rol' : 'Role'} value={credential.receiver.role} />
          </div>
        )}

        {/* Issuer Card */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Emisor' : 'Issuer'}</h2>
          <div className="dp-issuer-header">
            {credential.issuer_logo && (
              <img src={getImagePath(credential.issuer_logo)} alt={credential.issuer} className="dp-issuer-header__logo" />
            )}
            <span className="dp-issuer-header__name">{credential.issuer}</span>
            {isTecIssuer ? (
              <span className="dp-issuer-verified">{language === 'es' ? 'Verificado' : 'Verified'}</span>
            ) : (
              <span className="dp-issuer-unverified">{language === 'es' ? 'No verificado - Externo' : 'Unverified - External'}</span>
            )}
          </div>
          <Field label={t.description || 'Description'} value={issuerDesc} />
          {credential.issuer_url && (
            <div className="dp-field">
              <span className="dp-field__label">URL</span>
              <a href={credential.issuer_url} target="_blank" rel="noopener noreferrer" className="dp-field__link">{credential.issuer_url}</a>
            </div>
          )}
          <Field label="Email" value={credential.issuer_email} />
          <Field label={language === 'es' ? 'Telefono' : 'Phone'} value={credential.issuer_phone} />
          <Field label={language === 'es' ? 'Direccion' : 'Address'} value={credential.issuer_address} />
        </div>

        {/* Verification Card */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Verificacion' : 'Verification'}</h2>
          <button className="dp-verify-btn" onClick={handleVerify} disabled={verifying}>
            {verifying ? (language === 'es' ? 'Verificando...' : 'Verifying...') : (language === 'es' ? 'Verificar credencial' : 'Verify credential')}
          </button>

          {verificationResults && (
            <div className="dp-verify-results">
              <div className={`dp-verify-overall dp-verify-overall--${verificationResults.overall}`}>
                <span className="dp-verify-overall__icon">
                  {verificationResults.overall === 'valid' ? '✓' : '✕'}
                </span>
                <span className="dp-verify-overall__label">{overallLabel(verificationResults.overall)}</span>
              </div>
              <div className="dp-verify-areas">
                {verificationAreas.map((area) => (
                  <div key={area.key} className={`dp-verify-area ${verificationResults.areas[area.key] ? 'dp-verify-area--pass' : 'dp-verify-area--fail'}`}>
                    <span className="dp-verify-area__name">{language === 'es' ? area.es : area.en}</span>
                    <span className="dp-verify-area__result">
                      {verificationResults.areas[area.key] ? '✓' : '✕'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="dp-verify-timestamp">
                {language === 'es' ? 'Última verificación' : 'Last verification'}: {verificationResults.timestamp}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PublicCredential
