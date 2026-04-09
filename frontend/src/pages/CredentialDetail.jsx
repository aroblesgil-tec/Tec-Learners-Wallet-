import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { translations } from '../translations'
import CREDENTIALS_DATA from '../data/credentials.json'

const getImagePath = (path) => {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('http') ? path : `${base}${path}`
}

function CredentialDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [language] = useState(() => localStorage.getItem('wallet-lang') || 'es')
  const t = translations[language] || translations.es
  const [imageFullscreen, setImageFullscreen] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  const credential = CREDENTIALS_DATA.find(c => c.id === id)

  useEffect(() => {
    if (credential && credential.type === 'degree') {
      navigate(`/title/${id}`, { replace: true })
    }
  }, [credential, id, navigate])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!shareMenuOpen) return
    const close = () => setShareMenuOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [shareMenuOpen])

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
          <h2>{language === 'es' ? 'Credencial no encontrada' : 'Credential not found'}</h2>
        </div>
      </div>
    )
  }

  if (credential.type === 'degree') return null

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
  const revocationReason = language === 'en' && credential.revocation_reason_en ? credential.revocation_reason_en : credential.revocation_reason

  const statusKey = credential.status
  const statusLabel = statusKey === 'active' ? t.active : statusKey === 'expired' ? t.expiredStatus : t.revoked

  const handleShare = (action) => {
    setShareMenuOpen(false)
    if (action === 'copy') {
      const link = `${window.location.origin}${import.meta.env.BASE_URL}#/public/credential/${id}`
      navigator.clipboard.writeText(link)
      alert(t.linkCopied)
    } else if (action === 'linkedin') {
      window.open('https://www.linkedin.com/sharing/share-offsite/', '_blank')
    } else if (action === 'json') {
      alert(language === 'es' ? 'Descargando JSON...' : 'Downloading JSON...')
    } else if (action === 'image') {
      alert(language === 'es' ? 'Descargando imagen...' : 'Downloading image...')
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
      {/* Subheader: back left, share right */}
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
              <button onClick={() => handleShare('json')}>📄 {t.downloadJSON}</button>
              <button onClick={() => handleShare('image')}>🖼️ {t.downloadImage}</button>
            </div>
          )}
        </div>
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
          <p className="dp-hero__hint">{t.clickToEnlarge}</p>
        </div>

        {/* Achievement Section */}
        <div className="dp-card">
          <h2 className="dp-card__title">{t.achievement}</h2>
          {description && <p className="dp-card__desc">{description}</p>}
          <Field label={t.achievementType} value={credential.achievement_type} />
          <Field label={t.criteria} value={criteria} />
          <Field label={t.fieldOfStudy} value={fieldOfStudy} />
          <Field label={t.specialization} value={specialization} />
          <Field label={t.code} value={credential.code} />
          <Field label={t.creditsAvailable} value={credential.credits} />
          <Field label={t.languageField} value={credential.language} />
          <Field label={t.version} value={credential.version} />

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

          {credential.results && credential.results.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{t.results}</span>
              <table className="dp-table">
                <thead>
                  <tr>
                    <th>{t.resultName}</th>
                    <th>{t.resultValue}</th>
                    <th>{t.resultStatus}</th>
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
              <span className="dp-field__label">{t.endorsements}</span>
              <div className="dp-endorsements">
                {credential.endorsements.map((e, i) => (
                  <div key={i} className="dp-endorsement">
                    <strong>{e.issuer}</strong>: {e.claim}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Credential Info Section */}
        <div className="dp-card">
          <h2 className="dp-card__title">{t.credentialInfo}</h2>
          <div className="dp-field">
            <span className="dp-field__label">{t.status}</span>
            <span className={`dp-status dp-status--${statusKey}`}>{statusLabel}</span>
          </div>
          {revocationReason && (
            <Field label={language === 'es' ? 'Motivo de revocación' : 'Revocation Reason'} value={revocationReason} />
          )}
          <Field label={t.issueDate} value={formatDate(credential.issue_date)} />
          <Field label={t.expirationDate} value={formatDate(credential.expiration_date)} />
          <Field label={t.awardDate} value={formatDate(credential.award_date)} />

          {credential.evidences && credential.evidences.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{t.evidences}</span>
              <div className="dp-evidences">
                {credential.evidences.map((ev, i) => (
                  <div key={i} className="dp-evidence">
                    <strong>{ev.name}</strong>
                    {ev.description && <p>{ev.description}</p>}
                    {ev.url && (
                      <a href={ev.url} target="_blank" rel="noopener noreferrer">{t.viewEvidence}</a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {termsOfUse && (
            <p className="dp-terms">{termsOfUse}</p>
          )}
        </div>

        {/* Receiver Section */}
        {credential.receiver && (
          <div className="dp-card">
            <h2 className="dp-card__title">{t.receiver}</h2>
            <Field label={t.receiverName} value={credential.receiver.name} />
            <Field label={t.startDate} value={formatDate(credential.receiver.start_date)} />
            <Field label={t.endDate} value={formatDate(credential.receiver.end_date)} />
            <Field label={t.creditsEarned} value={credential.receiver.credits_earned} />
            <Field label={t.licenseNumber} value={credential.receiver.license_number} />
            <Field label={t.academicPeriod} value={credential.receiver.academic_period} />
            <Field label={t.role} value={credential.receiver.role} />
          </div>
        )}

        {/* Issuer Section */}
        <div className="dp-card">
          <h2 className="dp-card__title">{t.issuerSection}</h2>
          <div className="dp-issuer-header">
            {credential.issuer_logo && (
              <img src={getImagePath(credential.issuer_logo)} alt={credential.issuer} className="dp-issuer-header__logo" />
            )}
            <span className="dp-issuer-header__name">{credential.issuer}</span>
          </div>
          <Field label={t.issuerDescription} value={issuerDesc} />
          {credential.issuer_url && (
            <div className="dp-field">
              <span className="dp-field__label">{t.website}</span>
              <a href={credential.issuer_url} target="_blank" rel="noopener noreferrer" className="dp-field__value dp-field__link">
                {credential.issuer_url}
              </a>
            </div>
          )}
          <Field label={t.email} value={credential.issuer_email} />
          <Field label={t.phone} value={credential.issuer_phone} />
          <Field label={t.address} value={credential.issuer_address} />
        </div>
      </div>

      {/* Actions bar removed - share is in subheader */}

      {/* Fullscreen Overlay */}
      {imageFullscreen && (
        <div className="dp-fullscreen" onClick={() => setImageFullscreen(false)}>
          <button className="dp-fullscreen__close" onClick={() => setImageFullscreen(false)}>&#10005;</button>
          <img
            src={getImagePath(credential.thumbnail)}
            alt={title}
            className="dp-fullscreen__img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}

export default CredentialDetail
