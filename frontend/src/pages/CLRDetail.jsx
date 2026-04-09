import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { translations } from '../translations'
import CREDENTIALS_DATA from '../data/credentials.json'
import CLRS_DATA from '../data/clrs.json'

const getImagePath = (path) => {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('http') ? path : `${base}${path}`
}

function CLRDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [language] = useState(() => localStorage.getItem('wallet-lang') || 'es')
  const t = translations[language] || translations.es
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  const clr = CLRS_DATA.find(c => c.id === id)

  const credentialsMap = useMemo(() => {
    const map = {}
    CREDENTIALS_DATA.forEach(c => { map[c.id] = c })
    return map
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!shareMenuOpen) return
    const close = () => setShareMenuOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [shareMenuOpen])

  if (!clr) {
    return (
      <div className="dp-page">
        <div className="dp-header">
          <img src={getImagePath("logo_tec.png")} alt="Tec" className="dp-header__logo" />
        </div>
        <div className="dp-subheader">
          <button className="dp-subheader__back" onClick={() => navigate('/clr')}>&#8592; {t.back}</button>
        </div>
        <div className="dp-not-found">
          <h2>{language === 'es' ? 'CLR no encontrado' : 'CLR not found'}</h2>
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

  const statusKey = clr.status
  const statusLabel = statusKey === 'active' ? t.active : statusKey === 'expired' ? t.expiredStatus : t.revoked

  const isComplete = clr.partial === false
  const completenessLabel = isComplete ? t.completeRecord : t.partialRecord

  const handleShare = (action) => {
    setShareMenuOpen(false)
    if (action === 'copy') {
      const link = `${window.location.origin}${import.meta.env.BASE_URL}#/public/clr/${id}`
      navigator.clipboard.writeText(link)
      alert(t.linkCopied)
    } else if (action === 'linkedin') {
      window.open('https://www.linkedin.com/sharing/share-offsite/', '_blank')
    } else if (action === 'json') {
      alert(language === 'es' ? 'Descargando JSON...' : 'Downloading JSON...')
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
        <button className="dp-subheader__back" onClick={() => navigate('/clr')}>&#8592; {t.back}</button>
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
            </div>
          )}
        </div>
      </div>

      <div className="dp-body">
        {/* Credentials Contained */}
        <div className="dp-card">
          <h2 className="dp-card__title">{t.credentialsContained}</h2>
          {containedCredentials.length > 0 ? (
            <div className="dp-cred-grid">
              {containedCredentials.map(cred => {
                const credTitle = language === 'en' && cred.title_en ? cred.title_en : cred.title
                const route = cred.type === 'degree' ? `/title/${cred.id}` : `/credential/${cred.id}`
                return (
                  <div key={cred.id} className="dp-cred-preview" onClick={() => navigate(route)}>
                    <img src={getImagePath(cred.thumbnail)} alt={credTitle} className="dp-cred-preview__img" />
                    <h4 className="dp-cred-preview__name">{credTitle}</h4>
                    <span className="dp-cred-preview__issuer">{cred.issuer}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="dp-empty-text">{language === 'es' ? 'No hay credenciales asociadas' : 'No associated credentials'}</p>
          )}
        </div>

        {/* CLR Information */}
        <div className="dp-card">
          <h2 className="dp-card__title">{t.clrInfo}</h2>
          <Field label={t.receiverName} value={name} />
          {description && <p className="dp-card__desc">{description}</p>}
          <div className="dp-field">
            <span className="dp-field__label">{t.status}</span>
            <span className={`dp-status dp-status--${statusKey}`}>{statusLabel}</span>
          </div>
          <Field label={t.issueDate} value={formatDate(clr.issue_date)} />
          <Field label={t.expirationDate} value={formatDate(clr.expiration_date)} />
          <Field label={t.awardDate} value={formatDate(clr.award_date)} />
          <div className="dp-field">
            <span className="dp-field__label">{language === 'es' ? 'Completitud' : 'Completeness'}</span>
            <span className={`dp-completeness ${isComplete ? 'dp-completeness--complete' : 'dp-completeness--partial'}`}>
              {completenessLabel}
            </span>
          </div>

          {clr.evidences && clr.evidences.length > 0 && (
            <div className="dp-field">
              <span className="dp-field__label">{t.evidences}</span>
              <div className="dp-evidences">
                {clr.evidences.map((ev, i) => (
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
        {clr.receiver && (
          <div className="dp-card">
            <h2 className="dp-card__title">{t.receiver}</h2>
            <Field label={t.receiverName} value={clr.receiver.name} />
            <Field label={t.startDate} value={formatDate(clr.receiver.start_date)} />
            <Field label={t.endDate} value={formatDate(clr.receiver.end_date)} />
            <Field label={t.creditsEarned} value={clr.receiver.credits_earned} />
            <Field label={t.licenseNumber} value={clr.receiver.license_number} />
            <Field label={t.academicPeriod} value={clr.receiver.academic_period} />
            <Field label={t.role} value={clr.receiver.role} />
          </div>
        )}

        {/* Issuer Section */}
        {clr.issuer && (
          <div className="dp-card">
            <h2 className="dp-card__title">{t.issuerSection}</h2>
            <div className="dp-issuer-header">
              {clr.issuer.logo && (
                <img src={getImagePath(clr.issuer.logo)} alt={clr.issuer.name} className="dp-issuer-header__logo" />
              )}
              <span className="dp-issuer-header__name">{clr.issuer.name}</span>
            </div>
            <Field label={t.issuerDescription} value={issuerDesc} />
            {clr.issuer.url && (
              <div className="dp-field">
                <span className="dp-field__label">{t.website}</span>
                <a href={clr.issuer.url} target="_blank" rel="noopener noreferrer" className="dp-field__value dp-field__link">
                  {clr.issuer.url}
                </a>
              </div>
            )}
            <Field label={t.email} value={clr.issuer.email} />
            <Field label={t.phone} value={clr.issuer.phone} />
            <Field label={t.address} value={clr.issuer.address} />
          </div>
        )}
      </div>

      {/* Actions bar removed - share is in subheader */}
    </div>
  )
}

export default CLRDetail
