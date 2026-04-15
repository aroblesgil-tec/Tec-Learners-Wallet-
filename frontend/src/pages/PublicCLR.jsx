import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { translations } from '../translations'
import CREDENTIALS_DATA from '../data/credentials.json'
import CLRS_DATA from '../data/clrs.json'

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

function PublicCLR() {
  const [language] = useState(() => localStorage.getItem('wallet-lang') || 'es')
  const [verifying, setVerifying] = useState(false)
  const [verificationResults, setVerificationResults] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const t = translations[language] || translations.es

  const clr = CLRS_DATA.find(c => c.id === id)

  const credentialsMap = useMemo(() => {
    const map = {}
    CREDENTIALS_DATA.forEach(c => { map[c.id] = c })
    return map
  }, [])

  if (!clr) {
    return (
      <div className="dp-page">
        <div className="dp-header">
          <img src={getImagePath('logo_tec.png')} alt="Tec" className="dp-header__logo" />
        </div>
        <div className="dp-not-found">
          <h2>{language === 'es' ? 'Link no disponible' : 'Link not available'}</h2>
          <p>{language === 'es' ? 'Este CLR no existe o el enlace ha expirado.' : 'This CLR does not exist or the link has expired.'}</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString(language === 'es' ? 'es-MX' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const name = language === 'en' && clr.name_en ? clr.name_en : clr.name
  const description = language === 'en' && clr.description_en ? clr.description_en : clr.description
  const issuerDesc = language === 'en' && clr.issuer?.description_en ? clr.issuer.description_en : clr.issuer?.description
  const termsOfUse = language === 'en' && clr.terms_of_use_en ? clr.terms_of_use_en : clr.terms_of_use

  const containedCredentials = (clr.credential_ids || []).map(cid => credentialsMap[cid]).filter(Boolean)

  const statusModifier = clr.status === 'active' ? 'active' : clr.status === 'expired' ? 'expired' : 'revoked'
  const statusLabel = clr.status === 'active' ? (language === 'es' ? 'Activo' : 'Active') : clr.status === 'expired' ? (language === 'es' ? 'Vencido' : 'Expired') : (language === 'es' ? 'Revocado' : 'Revoked')

  const isTecIssuer = /Tec|Profesional|Posgrado|Tecnológico/i.test(clr.issuer?.name || '')

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
      const isValid = clr.status === 'active'
      const isRevoked = clr.status === 'revoked'
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
    if (status === 'valid') return language === 'es' ? 'Válido' : 'Valid'
    if (status === 'revoked') return language === 'es' ? 'Revocado' : 'Revoked'
    return language === 'es' ? 'Inválido' : 'Invalid'
  }

  return (
    <div className="dp-page">
      {/* Header */}
      <div className="dp-header">
        <img src={getImagePath('logo_tec.png')} alt="Tec" className="dp-header__logo" />
      </div>

      <div className="dp-body">
        {/* CLR Name as heading */}
        <h1 className="dp-hero-name">{name}</h1>

        {/* Credentials Contained */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Credenciales incluidas' : 'Credentials Included'}</h2>
          {containedCredentials.length > 0 ? (
            <div className="dp-cred-grid">
              {containedCredentials.map(cred => {
                const credTitle = language === 'en' && cred.title_en ? cred.title_en : cred.title
                const route = cred.type === 'degree' ? `/public/title/${cred.id}` : `/public/credential/${cred.id}`
                return (
                  <div key={cred.id} className="dp-cred-preview" onClick={() => navigate(route)} style={{ cursor: 'pointer' }}>
                    <img src={getImagePath(cred.thumbnail)} alt={credTitle} className="dp-cred-preview__img" />
                    <div className="dp-cred-preview__info">
                      <h4 className="dp-cred-preview__name">{credTitle}</h4>
                      <p className="dp-cred-preview__issuer">{cred.issuer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="dp-card__desc">{language === 'es' ? 'No hay credenciales asociadas' : 'No associated credentials'}</p>
          )}
        </div>

        {/* CLR Info Card */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Informacion del CLR' : 'CLR Information'}</h2>
          {description && <p className="dp-card__desc">{description}</p>}
          <div className="dp-field">
            <span className="dp-field__label">{language === 'es' ? 'Estado' : 'Status'}</span>
            <span className={`dp-status dp-status--${statusModifier}`}>{statusLabel}</span>
          </div>
          <Field label={t.issueDate || 'Issue Date'} value={formatDate(clr.issue_date)} />
          <Field label={language === 'es' ? 'Fecha de vencimiento' : 'Expiration Date'} value={formatDate(clr.expiration_date)} />
          <Field label={language === 'es' ? 'Fecha de otorgamiento' : 'Award Date'} value={formatDate(clr.award_date)} />
          <Field
            label={language === 'es' ? 'Completitud' : 'Completeness'}
            value={clr.partial === false ? (language === 'es' ? 'Completo' : 'Complete') : (language === 'es' ? 'Parcial' : 'Partial')}
          />
          {clr.evidences && clr.evidences.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{language === 'es' ? 'Evidencias' : 'Evidences'}</span>
              <ul className="dp-evidences">
                {clr.evidences.map((ev, i) => (
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
        {clr.receiver && (
          <div className="dp-card">
            <h2 className="dp-card__title">{language === 'es' ? 'Receptor' : 'Receiver'}</h2>
            <Field label={language === 'es' ? 'Nombre' : 'Name'} value={clr.receiver.name} />
            <Field label={language === 'es' ? 'Fecha de inicio' : 'Start Date'} value={formatDate(clr.receiver.start_date)} />
            <Field label={language === 'es' ? 'Fecha de fin' : 'End Date'} value={formatDate(clr.receiver.end_date)} />
            <Field label={language === 'es' ? 'Creditos obtenidos' : 'Credits Earned'} value={clr.receiver.credits_earned} />
            <Field label={language === 'es' ? 'Periodo academico' : 'Academic Period'} value={clr.receiver.academic_period} />
            <Field label={language === 'es' ? 'Rol' : 'Role'} value={clr.receiver.role} />
          </div>
        )}

        {/* Issuer Card */}
        {clr.issuer && (
          <div className="dp-card">
            <h2 className="dp-card__title">{language === 'es' ? 'Emisor' : 'Issuer'}</h2>
            <div className="dp-issuer-header">
              {clr.issuer.logo && (
                <img src={getImagePath(clr.issuer.logo)} alt={clr.issuer.name} className="dp-issuer-header__logo" />
              )}
              <span className="dp-issuer-header__name">{clr.issuer.name}</span>
              {isTecIssuer ? (
                <span className="dp-issuer-verified">{language === 'es' ? 'Verificado' : 'Verified'}</span>
              ) : (
                <span className="dp-issuer-unverified">{language === 'es' ? 'No verificado - Externo' : 'Unverified - External'}</span>
              )}
            </div>
            <Field label={t.description || 'Description'} value={issuerDesc} />
            {clr.issuer.url && (
              <div className="dp-field">
                <span className="dp-field__label">URL</span>
                <a href={clr.issuer.url} target="_blank" rel="noopener noreferrer" className="dp-field__link">{clr.issuer.url}</a>
              </div>
            )}
            <Field label="Email" value={clr.issuer.email} />
            <Field label={language === 'es' ? 'Telefono' : 'Phone'} value={clr.issuer.phone} />
            <Field label={language === 'es' ? 'Direccion' : 'Address'} value={clr.issuer.address} />
          </div>
        )}

        {/* Verification Card */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Verificacion' : 'Verification'}</h2>
          <button className="dp-verify-btn" onClick={handleVerify} disabled={verifying}>
            {verifying ? (language === 'es' ? 'Verificando...' : 'Verifying...') : (language === 'es' ? 'Verificar CLR' : 'Verify CLR')}
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

export default PublicCLR
