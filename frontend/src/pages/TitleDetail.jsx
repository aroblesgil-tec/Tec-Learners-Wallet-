import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { translations } from '../translations'
import CREDENTIALS_DATA from '../data/credentials.json'

const getImagePath = (path) => {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('http') ? path : `${base}${path}`
}

function TitleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [language] = useState(() => localStorage.getItem('wallet-lang') || 'es')
  const t = translations[language] || translations.es
  const [imageFullscreen, setImageFullscreen] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verificationStep, setVerificationStep] = useState(0)
  const [verificationDone, setVerificationDone] = useState(false)

  const credential = CREDENTIALS_DATA.find(c => c.id === id)

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!shareMenuOpen && !downloadMenuOpen) return
    const close = () => { setShareMenuOpen(false); setDownloadMenuOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [shareMenuOpen, downloadMenuOpen])

  if (!credential) {
    return (
      <div className="dp-page">
        <div className="dp-header">
          <img src={getImagePath("logo_tec.png")} alt="Tec" className="dp-header__logo" />
        </div>
        <div className="dp-subheader">
          <button className="dp-subheader__back" onClick={() => navigate('/')}>&#8592; {t.back}</button>
        </div>
        <div className="dp-not-found">
          <h2>{language === 'es' ? 'Titulo no encontrado' : 'Title not found'}</h2>
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

  const statusKey = credential.status
  const statusLabel = statusKey === 'active' ? t.active : statusKey === 'expired' ? t.expiredStatus : t.revoked

  const steps = [t.verifyingSignature, t.verifyingIssuer, t.verifyingIntegrity]

  const handleVerify = () => {
    setVerifying(true)
    setVerificationStep(0)
    setVerificationDone(false)
    setTimeout(() => setVerificationStep(1), 1300)
    setTimeout(() => setVerificationStep(2), 2600)
    setTimeout(() => {
      setVerifying(false)
      setVerificationDone(true)
    }, 4000)
  }

  const handleDownload = (type) => {
    setDownloadMenuOpen(false)
    if (type === 'json') alert(language === 'es' ? 'Descargando JSON Blockcerts...' : 'Downloading JSON Blockcerts...')
    else if (type === 'xml') alert(language === 'es' ? 'Descargando XML SEP...' : 'Downloading XML SEP...')
    else if (type === 'pdf') alert(language === 'es' ? 'Descargando PDF...' : 'Downloading PDF...')
  }

  const handleShare = (action) => {
    setShareMenuOpen(false)
    if (action === 'copy') {
      const link = `${window.location.origin}${import.meta.env.BASE_URL}#/public/title/${id}`
      navigator.clipboard.writeText(link)
      alert(t.linkCopied)
    } else if (action === 'linkedin') {
      window.open('https://www.linkedin.com/sharing/share-offsite/', '_blank')
    }
  }

  const Field = ({ label, value }) => {
    if (value === null || value === undefined || value === '') return null
    return (
      <div className="dp-field">
        <span className="dp-field__label">{label}</span>
        <span className="dp-field__value">{value}</span>
      </div>
    )
  }

  return (
    <div className="dp-page">
      {/* Header with logo */}
      <div className="dp-header">
        <img src={getImagePath("logo_tec.png")} alt="Tec" className="dp-header__logo" />
      </div>
      {/* Subheader: back left, actions right */}
      <div className="dp-subheader">
        <button className="dp-subheader__back" onClick={() => navigate('/')}>&#8592; {t.back}</button>
        <div className="dp-subheader__spacer"></div>
        <div className="dp-subheader__right">
          <button className="dp-subheader__btn" onClick={(e) => { e.stopPropagation(); setShareMenuOpen(!shareMenuOpen) }}>
            {t.share} &#9662;
          </button>
          {shareMenuOpen && (
            <div className="dp-subheader__dropdown">
              <button onClick={() => handleShare('copy')}>🔗 {t.copyLink}</button>
              <button onClick={() => handleShare('linkedin')}>💼 {t.shareOnLinkedIn}</button>
              <div className="dp-dropdown-divider"></div>
              <button onClick={() => handleDownload('json')}>📄 {t.downloadJSONBlockcerts}</button>
              <button onClick={() => handleDownload('xml')}>📋 {t.downloadXMLSEP}</button>
              <button onClick={() => handleDownload('pdf')}>📥 {t.downloadPDF}</button>
            </div>
          )}
        </div>
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
          <p className="dp-hero__hint">{t.clickToEnlarge}</p>
        </div>

        {/* Title Info Section */}
        <div className="dp-card">
          <h2 className="dp-card__title">{t.titleSection}</h2>
          {description && <p className="dp-card__desc">{description}</p>}
          <Field label={t.criteria} value={criteria} />
          <Field label={t.issueDate} value={formatDate(credential.issue_date)} />
          <Field label={t.expirationDate} value={formatDate(credential.expiration_date)} />
          <div className="dp-field">
            <span className="dp-field__label">{t.status}</span>
            <span className={`dp-status dp-status--${statusKey}`}>{statusLabel}</span>
          </div>

          {skills && skills.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{t.skills}</span>
              <div className="dp-tags">
                {skills.map((skill, i) => (
                  <span key={i} className="dp-tag">{skill}</span>
                ))}
              </div>
            </div>
          )}

          {credential.alignments && credential.alignments.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{t.alignments}</span>
              <div className="dp-alignments">
                {credential.alignments.map((a, i) => (
                  <div key={i} className="dp-alignment">
                    <a href={a.url} target="_blank" rel="noopener noreferrer">{a.name}</a>
                    {a.description && <p>{a.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Receiver Section */}
        {credential.receiver && credential.receiver.name && (
          <div className="dp-card">
            <h2 className="dp-card__title">{t.receiver}</h2>
            <p className="dp-receiver-name">{credential.receiver.name}</p>
          </div>
        )}

        {/* Issuer + Signatures Section */}
        <div className="dp-card">
          <h2 className="dp-card__title">{t.issuerSection}</h2>
          <div className="dp-issuer-header">
            {credential.issuer_logo && (
              <img src={getImagePath(credential.issuer_logo)} alt={credential.issuer} className="dp-issuer-header__logo" />
            )}
            <span className="dp-issuer-header__name">{credential.issuer}</span>
          </div>
          {credential.issuer_url && (
            <div className="dp-field">
              <span className="dp-field__label">{t.website}</span>
              <a href={credential.issuer_url} target="_blank" rel="noopener noreferrer" className="dp-field__value dp-field__link">
                {credential.issuer_url}
              </a>
            </div>
          )}
          <Field label={t.issuerDescription || (language === 'es' ? 'Descripción' : 'Description')} value={language === 'en' && credential.issuer_description_en ? credential.issuer_description_en : credential.issuer_description} />
          <Field label={t.email} value={credential.issuer_email} />
          <Field label={t.phone} value={credential.issuer_phone} />
          <Field label={t.address} value={credential.issuer_address} />

          {credential.signatures && credential.signatures.length > 0 && (
            <div className="dp-signatures">
              <h3 className="dp-signatures__title">{t.signatures}</h3>
              <div className="dp-signatures__grid">
                {credential.signatures.map((sig, i) => (
                  <div key={i} className="dp-signature">
                    <div className="dp-signature__line" />
                    <p className="dp-signature__name">{sig.name}</p>
                    {sig.title && <p className="dp-signature__role">{sig.title}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Registro en Blockchain */}
        {credential.blockchain && (
          <div className="dp-card">
            <h2 className="dp-card__title">{language === 'es' ? 'Registro en Blockchain' : 'Blockchain Record'}</h2>
            <Field label={language === 'es' ? 'Red' : 'Network'} value={credential.blockchain.blockchain_type} />
            {credential.blockchain.transaction_id && (
              <div className="dp-field">
                <span className="dp-field__label">{language === 'es' ? 'ID de transacción' : 'Transaction ID'}</span>
                <span className="dp-field__value dp-field__mono">{credential.blockchain.transaction_id}</span>
              </div>
            )}
            {credential.blockchain.certificate_hash && (
              <div className="dp-field">
                <span className="dp-field__label">{language === 'es' ? 'Hash del certificado' : 'Certificate Hash'}</span>
                <span className="dp-field__value dp-field__mono">{credential.blockchain.certificate_hash}</span>
              </div>
            )}
            {credential.blockchain.issuer_public_key && (
              <div className="dp-field">
                <span className="dp-field__label">{language === 'es' ? 'Llave pública del emisor' : 'Issuer Public Key'}</span>
                <span className="dp-field__value dp-field__mono">{credential.blockchain.issuer_public_key}</span>
              </div>
            )}
            <Field label={language === 'es' ? 'Fecha de registro' : 'Record Date'} value={formatDate(credential.blockchain.proof_date)} />
            {credential.blockchain.explorer_url && (
              <div className="dp-field">
                <span className="dp-field__label">{language === 'es' ? 'Ver en explorador' : 'View on Explorer'}</span>
                <a href={credential.blockchain.explorer_url} target="_blank" rel="noopener noreferrer" className="dp-field__value dp-field__link">
                  {credential.blockchain.explorer_url}
                </a>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Fullscreen Overlay */}
      {imageFullscreen && (
        <div className="dp-fullscreen" onClick={() => setImageFullscreen(false)}>
          <button className="dp-fullscreen__close" onClick={() => setImageFullscreen(false)}>&#10005;</button>
          <img
            src={getImagePath(credential.thumbnail)}
            alt={titleName}
            className="dp-fullscreen__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default TitleDetail
