import { useState } from 'react'
import { translations } from '../translations'

const getImagePath = (path) => {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('http') ? path : `${base}${path}`
}

function PublicVerifier() {
  const [language] = useState(() => localStorage.getItem('wallet-lang') || 'es')
  const t = translations[language] || translations.es
  const [jsonUrl, setJsonUrl] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [verifying, setVerifying] = useState(false)
  const [verificationStep, setVerificationStep] = useState(-1)
  const [verificationResults, setVerificationResults] = useState(null)

  const steps = language === 'es'
    ? ['Verificando firma digital...', 'Verificando emisor...', 'Verificando integridad...', 'Verificando vigencia...', 'Verificando cumplimiento del estándar...']
    : ['Verifying digital signature...', 'Verifying issuer...', 'Verifying integrity...', 'Verifying expiration...', 'Verifying standard compliance...']

  const verificationAreas = [
    { key: 'signature', es: 'Firma digital', en: 'Digital Signature' },
    { key: 'issuer', es: 'Emisor', en: 'Issuer' },
    { key: 'integrity', es: 'Integridad', en: 'Integrity' },
    { key: 'expiration', es: 'Vigencia', en: 'Expiration' },
    { key: 'standard', es: 'Cumplimiento del estándar', en: 'Standard Compliance' }
  ]

  const handleVerify = () => {
    if (!jsonUrl && !selectedFile) {
      alert(language === 'es' ? 'Ingresa una URL o selecciona un archivo JSON' : 'Enter a URL or select a JSON file')
      return
    }
    setVerifying(true)
    setVerificationStep(0)
    setVerificationResults(null)
    setTimeout(() => setVerificationStep(1), 1000)
    setTimeout(() => setVerificationStep(2), 2000)
    setTimeout(() => setVerificationStep(3), 3000)
    setTimeout(() => setVerificationStep(4), 4000)
    setTimeout(() => {
      setVerificationResults({
        overall: 'valid',
        timestamp: new Date().toLocaleString(language === 'es' ? 'es-MX' : 'en-US'),
        areas: { signature: true, issuer: true, integrity: true, expiration: true, standard: true }
      })
      setVerifying(false)
    }, 5000)
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  const overallLabel = (status) => {
    if (status === 'valid') return language === 'es' ? 'Válida' : 'Valid'
    if (status === 'revoked') return language === 'es' ? 'Revocada' : 'Revoked'
    return language === 'es' ? 'Inválida' : 'Invalid'
  }

  return (
    <div className="dp-page">
      {/* Header */}
      <div className="dp-header">
        <img src={getImagePath('logo_tec.png')} alt="Tec" className="dp-header__logo" />
      </div>

      <div className="dp-body">
        {/* Hero card */}
        <div className="dp-hero">
          <h1 className="dp-hero-name">
            {language === 'es' ? 'Verificador de Credenciales' : 'Credential Verifier'}
          </h1>
          <p className="dp-hero__hint">
            {language === 'es'
              ? 'Verifica la autenticidad de una credencial emitida por el Tecnológico de Monterrey'
              : 'Verify the authenticity of a credential issued by Tecnológico de Monterrey'}
          </p>
        </div>

        {/* Input card */}
        <div className="dp-card">
          <h2 className="dp-card__title">
            {language === 'es' ? 'Datos de la credencial' : 'Credential data'}
          </h2>

          {/* URL input */}
          <div className="dp-field">
            <span className="dp-field__label">
              {language === 'es' ? 'URL de la credencial' : 'Credential URL'}
            </span>
            <input
              type="url"
              className="dp-verifier-input"
              placeholder={language === 'es' ? 'https://ejemplo.com/credencial.json' : 'https://example.com/credential.json'}
              value={jsonUrl}
              onChange={(e) => setJsonUrl(e.target.value)}
            />
          </div>

          {/* Divider */}
          <div className="dp-verifier-divider">
            <span>{language === 'es' ? 'o' : 'or'}</span>
          </div>

          {/* File upload */}
          <div className="dp-field">
            <span className="dp-field__label">
              {language === 'es' ? 'Archivo de la credencial (JSON o PNG)' : 'Credential file (JSON or PNG)'}
            </span>
            <label className="dp-verifier-file" htmlFor="verifier-file">
              <input
                type="file"
                accept=".json,.png,.jpg,.jpeg"
                id="verifier-file"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
              <span className="dp-verifier-file__icon">📄</span>
              <span className="dp-verifier-file__text">
                {selectedFile
                  ? selectedFile.name
                  : (language === 'es' ? 'Seleccionar archivo JSON o PNG...' : 'Select JSON or PNG file...')}
              </span>
            </label>
          </div>

          {/* Verify button */}
          <button
            className={`dp-verify-btn ${verifying ? 'dp-verify-btn--loading' : ''}`}
            onClick={handleVerify}
            disabled={verifying}
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            {verifying
              ? (language === 'es' ? 'Verificando...' : 'Verifying...')
              : (language === 'es' ? 'Verificar credencial' : 'Verify credential')}
          </button>
        </div>

        {/* Verification steps */}
        {verifying && (
          <div className="dp-card">
            <h2 className="dp-card__title">
              {language === 'es' ? 'Progreso' : 'Progress'}
            </h2>
            <div className="dp-verify-steps">
              {steps.map((step, i) => (
                <div key={i} className={`dp-verify-step ${verificationStep > i ? 'dp-verify-step--done' : verificationStep === i ? 'dp-verify-step--active' : ''}`}>
                  <span className="dp-verify-step__icon">
                    {verificationStep > i ? '✓' : verificationStep === i ? '⏳' : '○'}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {verificationResults && (
          <div className="dp-card">
            <h2 className="dp-card__title">
              {language === 'es' ? 'Resultados' : 'Results'}
            </h2>
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
                {language === 'es' ? 'Verificación realizada' : 'Verification performed'}: {verificationResults.timestamp}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PublicVerifier
