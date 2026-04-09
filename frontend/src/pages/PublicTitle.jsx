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

function PublicTitle() {
  const [language] = useState(() => localStorage.getItem('wallet-lang') || 'es')
  const { id } = useParams()
  const t = translations[language] || translations.es
  const [imageFullscreen, setImageFullscreen] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verificationStep, setVerificationStep] = useState(0)
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
          <p>{language === 'es' ? 'Este titulo no existe o el enlace ha expirado.' : 'This title does not exist or the link has expired.'}</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return null
    return new Date(dateStr).toLocaleDateString(language === 'es' ? 'es-MX' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const titleName = language === 'en' && credential.title_en ? credential.title_en : credential.title
  const description = language === 'en' && credential.description_en ? credential.description_en : credential.description
  const criteria = language === 'en' && credential.criteria_en ? credential.criteria_en : credential.criteria
  const skills = language === 'en' && credential.skills_en ? credential.skills_en : credential.skills

  const statusModifier = credential.status === 'active' ? 'active' : credential.status === 'expired' ? 'expired' : 'revoked'
  const statusLabel = credential.status === 'active' ? (language === 'es' ? 'Activo' : 'Active') : credential.status === 'expired' ? (language === 'es' ? 'Vencido' : 'Expired') : (language === 'es' ? 'Revocado' : 'Revoked')

  const isTecIssuer = /Tec|Profesional|Posgrado|Tecnológico/i.test(credential.issuer || '')

  const verificationAreas = [
    { key: 'signature', es: 'Firma digital', en: 'Digital Signature' },
    { key: 'issuer', es: 'Emisor', en: 'Issuer' },
    { key: 'integrity', es: 'Integridad', en: 'Integrity' },
    { key: 'expiration', es: 'Vigencia', en: 'Expiration' }
  ]

  const steps = language === 'es'
    ? ['Verificando firma digital...', 'Verificando emisor...', 'Verificando integridad del certificado...']
    : ['Verifying digital signature...', 'Verifying issuer...', 'Verifying certificate integrity...']

  const handleVerify = () => {
    setVerifying(true)
    setVerificationStep(0)
    setVerificationResults(null)
    setTimeout(() => setVerificationStep(1), 1300)
    setTimeout(() => setVerificationStep(2), 2600)
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
    }, 4000)
  }

  const overallLabel = (status) => {
    if (status === 'valid') return language === 'es' ? 'Valido' : 'Valid'
    if (status === 'revoked') return language === 'es' ? 'Revocado' : 'Revoked'
    return language === 'es' ? 'Invalido' : 'Invalid'
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
            alt={titleName}
            className="dp-hero__img"
            onClick={() => setImageFullscreen(true)}
          />
          <h1 className="dp-hero-name">{titleName}</h1>
        </div>

        {imageFullscreen && (
          <div className="dp-fullscreen" onClick={() => setImageFullscreen(false)}>
            <img src={getImagePath(credential.thumbnail)} alt={titleName} className="dp-fullscreen__img" />
          </div>
        )}

        {/* Title Card */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Titulo' : 'Title'}</h2>
          {description && <p className="dp-card__desc">{description}</p>}
          <Field label={language === 'es' ? 'Criterios' : 'Criteria'} value={criteria} />
          <Field label={t.issueDate || 'Issue Date'} value={formatDate(credential.issue_date)} />
          <Field label={language === 'es' ? 'Fecha de vencimiento' : 'Expiration Date'} value={formatDate(credential.expiration_date)} />
          <div className="dp-field">
            <span className="dp-field__label">{language === 'es' ? 'Estado' : 'Status'}</span>
            <span className={`dp-status dp-status--${statusModifier}`}>{statusLabel}</span>
          </div>
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
        </div>

        {/* Receiver Card */}
        {credential.receiver && (
          <div className="dp-card">
            <h2 className="dp-card__title">{language === 'es' ? 'Receptor' : 'Receiver'}</h2>
            <Field label={language === 'es' ? 'Nombre' : 'Name'} value={credential.receiver.name} />
          </div>
        )}

        {/* Issuer Card with Signatures */}
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
          {credential.issuer_url && (
            <div className="dp-field">
              <span className="dp-field__label">URL</span>
              <a href={credential.issuer_url} target="_blank" rel="noopener noreferrer" className="dp-field__link">{credential.issuer_url}</a>
            </div>
          )}
          <Field label="Email" value={credential.issuer_email} />

          {credential.signatures && credential.signatures.length > 0 && (
            <div className="dp-signatures">
              <h3 className="dp-card__title">{language === 'es' ? 'Firmas' : 'Signatures'}</h3>
              <div className="dp-signatures__grid">
                {credential.signatures.map((sig, i) => (
                  <div key={i} className="dp-signature">
                    <div className="dp-signature__line"></div>
                    <p className="dp-signature__name">{sig.name}</p>
                    <p className="dp-signature__role">{sig.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Verification Card */}
        <div className="dp-card">
          <h2 className="dp-card__title">{language === 'es' ? 'Verificacion' : 'Verification'}</h2>
          <button className="dp-verify-btn" onClick={handleVerify} disabled={verifying}>
            {verifying ? (language === 'es' ? 'Verificando...' : 'Verifying...') : (language === 'es' ? 'Verificar titulo' : 'Verify title')}
          </button>

          {verifying && (
            <div className="dp-verify-steps">
              {steps.map((step, i) => (
                <div key={i} className={`dp-verify-step ${verificationStep >= i ? 'step-active' : ''}`}>
                  {verificationStep > i ? '✓' : verificationStep === i ? '...' : '○'} {step}
                </div>
              ))}
            </div>
          )}

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

export default PublicTitle
