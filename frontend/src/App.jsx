import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './App.css'
import Login from './Login'
import { translations } from './translations'
import CREDENTIALS_DATA from './data/credentials.json'
import CLRS_DATA from './data/clrs.json'
import CLRList from './pages/CLRList.jsx'

const getImagePath = (path) => {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('http') ? path : `${base}${path}`
}

function App({ initialTab }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('wallet-logged-in') === 'true')
  const [language, setLanguage] = useState(() => localStorage.getItem('wallet-lang') || 'es')
  const [credentials, setCredentials] = useState([])
  const [allCredentials, setAllCredentials] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIssuer, setSelectedIssuer] = useState('Todos')
  const [selectedYear, setSelectedYear] = useState('Todos')
  const [groupBy, setGroupBy] = useState('type')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedCredentials, setSelectedCredentials] = useState([])
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadMethod, setUploadMethod] = useState('file')
  const [uploadUrl, setUploadUrl] = useState('')

  // Determine active tab from route
  const activeTab = initialTab === 'clr' || location.pathname === '/clr' ? 'clr' : 'credentials'

  const t = translations[language]

  const categories = {
    es: ['Todas', 'Títulos', 'Curriculares', 'Alternativas', 'Educación continua', 'Otras', 'Vencidas'],
    en: ['All', 'Degrees', 'Curricular', 'Alternative', 'Continuing Education', 'Other', 'Expired']
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem('wallet-logged-in', 'true')
  }

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es'
    setLanguage(newLang)
    localStorage.setItem('wallet-lang', newLang)

    const categoryMap = {
      'Todas': 'All', 'All': 'Todas',
      'Títulos': 'Degrees', 'Degrees': 'Títulos',
      'Curriculares': 'Curricular', 'Curricular': 'Curriculares',
      'Alternativas': 'Alternative', 'Alternative': 'Alternativas',
      'Educación continua': 'Continuing Education', 'Continuing Education': 'Educación continua',
      'Otras': 'Other', 'Other': 'Otras',
      'Vencidas': 'Expired', 'Expired': 'Vencidas'
    }

    setSelectedCategory(categoryMap[selectedCategory] || (newLang === 'es' ? 'Todas' : 'All'))
    setSelectedIssuer(newLang === 'es' ? 'Todos' : 'All')
    setSelectedYear(newLang === 'es' ? 'Todos' : 'All')
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchCredentials()
      fetchStats()
    }
  }, [isLoggedIn])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuOpen && !event.target.closest('.user-menu-container')) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [userMenuOpen])

  // Reset filters and arrangement to default each time the user enters the credentials view
  useEffect(() => {
    if (activeTab !== 'credentials') return
    const allCatLabel = language === 'es' ? 'Todas' : 'All'
    const allLabel = language === 'es' ? 'Todos' : 'All'
    setSelectedCategory(allCatLabel)
    setSelectedIssuer(allLabel)
    setSelectedYear(allLabel)
    setSearchTerm('')
    setGroupBy('type')
    setFiltersOpen(false)
  }, [activeTab, language])

  // Reset shelf scroll to start when shelf goes off screen
  const shelvesRef = useRef(null)
  useEffect(() => {
    if (!shelvesRef.current) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          const shelfItems = entry.target.querySelector('.shelf-items')
          if (shelfItems) shelfItems.scrollLeft = 0
        }
      })
    }, { threshold: 0 })

    const sections = shelvesRef.current.querySelectorAll('.shelf-section')
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  })

  const fetchCredentials = () => {
    setAllCredentials(CREDENTIALS_DATA)
    setCredentials(CREDENTIALS_DATA)
    setLoading(false)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    applyFilters(category, searchTerm, selectedIssuer, selectedYear)
  }

  const applyFilters = (category, search, issuer, year) => {
    let filtered = [...allCredentials]

    if (category !== 'Todas' && category !== 'All') {
      filtered = filtered.filter(cred => cred.category === category)
    }

    if (search.trim() !== '') {
      filtered = filtered.filter(cred =>
        cred.title.toLowerCase().includes(search.toLowerCase()) ||
        (cred.title_en && cred.title_en.toLowerCase().includes(search.toLowerCase())) ||
        cred.description.toLowerCase().includes(search.toLowerCase()) ||
        (cred.description_en && cred.description_en.toLowerCase().includes(search.toLowerCase())) ||
        cred.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase())) ||
        (cred.skills_en && cred.skills_en.some(skill => skill.toLowerCase().includes(search.toLowerCase())))
      )
    }

    if (issuer !== 'Todos' && issuer !== 'All') {
      filtered = filtered.filter(cred => cred.issuer === issuer)
    }

    if (year !== 'Todos' && year !== 'All') {
      filtered = filtered.filter(cred =>
        new Date(cred.issue_date).getFullYear().toString() === year
      )
    }

    filtered.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date))

    setCredentials(filtered)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    applyFilters(selectedCategory, value, selectedIssuer, selectedYear)
  }

  const handleIssuerChange = (value) => {
    setSelectedIssuer(value)
    applyFilters(selectedCategory, searchTerm, value, selectedYear)
  }

  const handleYearChange = (value) => {
    setSelectedYear(value)
    applyFilters(selectedCategory, searchTerm, selectedIssuer, value)
  }

  const getUniqueIssuers = () => {
    const issuers = [...new Set(allCredentials.map(cred => cred.issuer))]
    return [language === 'es' ? 'Todos' : 'All', ...issuers]
  }

  const getUniqueYears = () => {
    const years = [...new Set(allCredentials.map(cred =>
      new Date(cred.issue_date).getFullYear().toString()
    ))].sort((a, b) => b - a)
    return [language === 'es' ? 'Todos' : 'All', ...years]
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedCategory !== 'Todas' && selectedCategory !== 'All') count++
    if (selectedIssuer !== 'Todos' && selectedIssuer !== 'All') count++
    if (selectedYear !== 'Todos' && selectedYear !== 'All') count++
    return count
  }

  const clearAllFilters = () => {
    const allLabel = language === 'es' ? 'Todos' : 'All'
    const allCatLabel = language === 'es' ? 'Todas' : 'All'
    setSelectedCategory(allCatLabel)
    setSelectedIssuer(allLabel)
    setSelectedYear(allLabel)
    applyFilters(allCatLabel, searchTerm, allLabel, allLabel)
  }

  const toggleSelectionMode = () => {
    const newMode = !selectionMode
    setSelectionMode(newMode)
    if (newMode) {
      setSelectedCategory(language === 'es' ? 'Todas' : 'All')
      setCredentials(allCredentials)
    } else {
      setSelectedCredentials([])
    }
    setUserMenuOpen(false)
  }

  const toggleCredentialSelection = (credential) => {
    setSelectedCredentials(prev => {
      const isSelected = prev.some(c => c.id === credential.id)
      if (isSelected) return prev.filter(c => c.id !== credential.id)
      return [...prev, credential]
    })
  }

  const generateShareLink = () => {
    const credIds = selectedCredentials.map(c => c.id).join(',')
    const randomId = Math.random().toString(36).substring(2, 15)
    const link = `${window.location.origin}${window.location.pathname}#/public/credential/${credIds}`
    setGeneratedLink(link)
    setShareModalOpen(true)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
    alert(t.linkCopied)
  }

  const downloadCLR = () => {
    if (selectedCredentials.length === 0) return
    const clr = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://purl.imsglobal.org/spec/clr/v2p0/context.json"
      ],
      "type": ["VerifiableCredential", "ClrCredential"],
      "id": `urn:uuid:${crypto.randomUUID()}`,
      "issuer": {
        "id": "https://www.tec.mx",
        "type": "Profile",
        "name": "Tecnológico de Monterrey"
      },
      "issuanceDate": new Date().toISOString(),
      "credentialSubject": {
        "id": "urn:uuid:student-" + Math.random().toString(36).substring(2, 15),
        "type": "ClrSubject",
        "verifiableCredential": selectedCredentials.map(cred => ({
          "@context": "https://www.w3.org/2018/credentials/v1",
          "id": `urn:uuid:${cred.id}`,
          "type": ["VerifiableCredential", "OpenBadgeCredential"],
          "name": cred.title,
          "description": cred.description,
          "image": cred.thumbnail,
          "issuer": { "id": "https://www.tec.mx", "type": "Profile", "name": cred.issuer },
          "issuanceDate": cred.issue_date,
          "credentialSubject": {
            "type": "AchievementSubject",
            "achievement": { "type": "Achievement", "name": cred.title, "description": cred.description, "criteria": { "narrative": cred.description } }
          }
        }))
      }
    }
    const dataStr = JSON.stringify(clr, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `CLR-TecLearners-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    setSelectionMode(false)
    setSelectedCredentials([])
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/json" || file.name.endsWith('.json') || file.type.startsWith('image/')) {
        setSelectedFile(file)
      }
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUploadCredential = () => {
    if (uploadMethod === 'url' && uploadUrl.trim()) {
      alert(language === 'es'
        ? `URL "${uploadUrl}" recibida. Importación simulada exitosa.`
        : `URL "${uploadUrl}" received. Simulated import successful.`)
      setUploadModalOpen(false)
      setUploadUrl('')
    } else if (selectedFile) {
      alert(language === 'es'
        ? `Archivo "${selectedFile.name}" recibido. Importación simulada exitosa.`
        : `File "${selectedFile.name}" received. Simulated import successful.`)
      setUploadModalOpen(false)
      setSelectedFile(null)
    }
  }

  const fetchStats = () => {
    const total_credentials = CREDENTIALS_DATA.length
    const microcredentials = CREDENTIALS_DATA.filter(c => c.type === "microcredential").length
    const degrees = CREDENTIALS_DATA.filter(c => c.type === "degree").length
    setStats({ total_credentials, microcredentials, degrees })
  }

  const openCredentialDetail = (credential) => {
    if (credential.type === 'degree') {
      navigate(`/title/${credential.id}`)
    } else {
      navigate(`/credential/${credential.id}`)
    }
  }

  const getStatusLabel = (status) => {
    if (language === 'es') {
      if (status === 'active') return 'Activa'
      if (status === 'expired') return 'Vencida'
      if (status === 'revoked') return 'Revocada'
    } else {
      if (status === 'active') return 'Active'
      if (status === 'expired') return 'Expired'
      if (status === 'revoked') return 'Revoked'
    }
    return status
  }

  const getTypeLabel = (type) => {
    if (language === 'es') {
      if (type === 'degree') return 'Título'
      if (type === 'microcredential') return 'Microcredencial'
      if (type === 'certification') return 'Certificación'
      if (type === 'credential') return 'Credencial'
    } else {
      if (type === 'degree') return 'Degree'
      if (type === 'microcredential') return 'Microcredential'
      if (type === 'certification') return 'Certification'
      if (type === 'credential') return 'Credential'
    }
    return type
  }

  const groupCredentials = () => {
    if (selectionMode) return { [t.myCredentials]: credentials }

    if (groupBy === 'issuer') {
      const groups = {}
      credentials.forEach(cred => {
        if (!groups[cred.issuer]) groups[cred.issuer] = []
        groups[cred.issuer].push(cred)
      })
      const tecOrder = ['Posgrado', 'Profesional', 'PrepaTEC', 'Educación Continua']
      const ordered = {}
      tecOrder.forEach(iss => { if (groups[iss]) ordered[iss] = groups[iss] })
      Object.keys(groups)
        .filter(iss => !tecOrder.includes(iss))
        .sort((a, b) => a.localeCompare(b))
        .forEach(iss => { ordered[iss] = groups[iss] })
      return ordered
    }

    if (groupBy === 'year') {
      const groups = {}
      credentials.forEach(cred => {
        const y = new Date(cred.issue_date).getFullYear().toString()
        if (!groups[y]) groups[y] = []
        groups[y].push(cred)
      })
      const ordered = {}
      Object.keys(groups).sort((a, b) => Number(b) - Number(a)).forEach(k => { ordered[k] = groups[k] })
      return ordered
    }

    // Default: groupBy === 'type' → agrupa por category
    if (selectedCategory === 'Todas' || selectedCategory === 'All') {
      const groups = {}
      credentials.forEach(cred => {
        if (!groups[cred.category]) groups[cred.category] = []
        groups[cred.category].push(cred)
      })
      const orderedGroups = {}
      const categoryOrder = ['Títulos', 'Curriculares', 'Alternativas', 'Educación continua', 'Otras', 'Vencidas']
      categoryOrder.forEach(cat => { if (groups[cat]) orderedGroups[cat] = groups[cat] })
      Object.keys(groups).forEach(cat => { if (!orderedGroups[cat]) orderedGroups[cat] = groups[cat] })
      return orderedGroups
    }
    return { [selectedCategory]: credentials }
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>{t.loading}</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div></div>
          <img src={getImagePath("logo_tec.png")} alt="Tecnológico de Monterrey" className="header-logo" />
          <div className="user-menu-container">
            <button className="user-avatar" onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <span className="avatar-initials">JD</span>
            </button>
            {userMenuOpen && (
              <div className="user-dropdown">
                <button className="dropdown-item" onClick={() => { navigate('/verify'); setUserMenuOpen(false) }}>
                  {language === 'es' ? 'Verificador' : 'Verifier'}
                </button>
                <div className="dropdown-divider"></div>
                <div className="language-selector">
                  <div className="language-label">{t.language}</div>
                  <div className="language-options">
                    <button className={`language-option ${language === 'es' ? 'active' : ''}`}
                      onClick={() => language !== 'es' && toggleLanguage()}>
                      <span className="lang-name">Español</span>
                    </button>
                    <button className={`language-option ${language === 'en' ? 'active' : ''}`}
                      onClick={() => language !== 'en' && toggleLanguage()}>
                      <span className="lang-name">Inglés</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Tabs: Credenciales / CLRs */}
      <div className="wallet-tabs">
        <button
          className={`wallet-tab ${activeTab === 'credentials' ? 'active' : ''}`}
          onClick={() => navigate('/')}
        >
          {language === 'es' ? 'Credenciales' : 'Credentials'}
        </button>
        <button
          className={`wallet-tab ${activeTab === 'clr' ? 'active' : ''}`}
          onClick={() => navigate('/clr')}
        >
          CLRs
        </button>
      </div>

      {/* CLR Tab Content */}
      {activeTab === 'clr' && (
        <CLRList language={language} embedded={true} />
      )}

      {/* Credentials Tab Content */}
      {activeTab === 'credentials' && (
        <>
          {!selectionMode && (
            <div className="wallet-toolbar">
              {/* Row 1: Search full width */}
              <div className="wallet-toolbar__search">
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="wallet-toolbar__input"
                />
                <span className="wallet-toolbar__search-icon">🔍</span>
              </div>

              {/* Row 2: Filters button (left) + Arrange dropdown (right) */}
              <div className="wallet-toolbar__actions">
                <button className="wallet-toolbar__filters-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
                  <span>⚙️</span> {t.filters}
                  {getActiveFiltersCount() > 0 && <span className="wallet-toolbar__badge">{getActiveFiltersCount()}</span>}
                </button>
                <select
                  value={groupBy}
                  onChange={(e) => setGroupBy(e.target.value)}
                  className="wallet-toolbar__group-select"
                  aria-label={t.arrangeBy}
                >
                  <option value="type">{t.arrangeBy}: {t.arrangeByType}</option>
                  <option value="issuer">{t.arrangeBy}: {t.arrangeByIssuer}</option>
                  <option value="year">{t.arrangeBy}: {t.arrangeByYear}</option>
                </select>
              </div>

              {/* Row 3: Import button full width */}
              <div className="wallet-toolbar__import-row">
                <button className="wallet-toolbar__import-btn" onClick={() => setUploadModalOpen(true)}>
                  + {language === 'es' ? 'Importar' : 'Import'}
                </button>
              </div>

              {/* Expandable filters panel */}
              {filtersOpen && (
                <div className="wallet-toolbar__filters-panel">
                  <div className="wallet-toolbar__filters">
                    <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="wallet-toolbar__select">
                      {categories[language].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select value={selectedIssuer} onChange={(e) => handleIssuerChange(e.target.value)} className="wallet-toolbar__select">
                      {getUniqueIssuers().map(issuer => <option key={issuer} value={issuer}>{issuer === 'Todos' || issuer === 'All' ? (language === 'es' ? 'Todos los emisores' : 'All issuers') : issuer}</option>)}
                    </select>
                    <select value={selectedYear} onChange={(e) => handleYearChange(e.target.value)} className="wallet-toolbar__select">
                      {getUniqueYears().map(year => <option key={year} value={year}>{year === 'Todos' || year === 'All' ? (language === 'es' ? 'Todos los años' : 'All years') : year}</option>)}
                    </select>
                  </div>
                  {getActiveFiltersCount() > 0 && (
                    <button className="wallet-toolbar__clear" onClick={clearAllFilters}>{t.clearFilters}</button>
                  )}
                </div>
              )}
            </div>
          )}



          <main className={`main-content ${selectionMode ? 'with-bottom-bar' : ''}`}>
            {credentials.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <h2>{t.noCredentials}</h2>
                <p>{language === 'es'
                  ? 'Tu cartera digital está esperando tus logros. Importa tus primeras credenciales para empezar.'
                  : 'Your digital wallet is waiting for your achievements. Import your first credentials to get started.'}</p>
                <button className="empty-state-btn" onClick={() => setUploadModalOpen(true)}>
                  {t.uploadCredential}
                </button>
              </div>
            ) : (
              <div className="shelves-container" ref={shelvesRef}>
                {Object.entries(groupCredentials()).map(([groupName, groupCredentialsList]) => (
                  <div key={groupName} className="shelf-section">
                    <h2 className="shelf-title">{groupName}</h2>
                    <div className="shelf">
                      <div className="shelf-items">
                        <div className="issuer-credentials">
                          {groupCredentialsList.map((credential) => {
                            const isSelected = selectedCredentials.some(c => c.id === credential.id)
                            const status = credential.status || (credential.category === 'Vencidas' ? 'expired' : 'active')
                            const title = language === 'en' && credential.title_en ? credential.title_en : credential.title
                            const skills = language === 'en' && credential.skills_en ? credential.skills_en : credential.skills
                            return (
                              <div
                                key={credential.id}
                                className={`cred-card cred-card--${status} ${selectionMode ? 'cred-card--selectable' : ''} ${isSelected ? 'cred-card--selected' : ''}`}
                                onClick={() => selectionMode ? toggleCredentialSelection(credential) : openCredentialDetail(credential)}
                              >
                                {selectionMode && (
                                  <div className="cred-card__checkbox">
                                    <input type="checkbox" checked={isSelected}
                                      onChange={() => toggleCredentialSelection(credential)}
                                      onClick={(e) => e.stopPropagation()} />
                                  </div>
                                )}

                                {/* Image area */}
                                <div className="cred-card__image-area">
                                  <img src={getImagePath(credential.thumbnail)} alt={title} className="cred-card__img" />
                                </div>

                                {/* Info */}
                                <div className="cred-card__info">
                                  <h3 className="cred-card__name">{title}</h3>
                                  <p className="cred-card__issuer">{credential.issuer}</p>

                                  <div className="cred-card__meta">
                                    <span className="cred-card__year">{new Date(credential.issue_date).getFullYear()}</span>
                                    <span className="cred-card__divider-dot"></span>
                                    <span className="cred-card__type">{getTypeLabel(credential.type)}</span>
                                    {credential.hours > 0 && (
                                      <>
                                        <span className="cred-card__divider-dot"></span>
                                        <span className="cred-card__hours">{credential.hours}h</span>
                                      </>
                                    )}
                                  </div>

                                  <div className={`cred-card__status cred-card__status--${status}`}>
                                    {getStatusLabel(status)}
                                  </div>

                                  {skills && skills.length > 0 && (
                                    <div className="cred-card__tags">
                                      {skills.slice(0, 3).map((skill, i) => (
                                        <span key={i} className="cred-card__tag">{skill}</span>
                                      ))}
                                      {skills.length > 3 && (
                                        <span className="cred-card__tag cred-card__tag--more">+{skills.length - 3}</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <div className="shelf-board"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {/* Share Link Modal */}
      {shareModalOpen && (
        <div className="modal-overlay" onClick={() => setShareModalOpen(false)}>
          <div className="modal-content share-link-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShareModalOpen(false)}>×</button>
            <div className="share-link-content">
              <div className="share-link-header">
                <h2>🎉 {t.linkGenerated}</h2>
                <p>{t.shareDescription}</p>
              </div>
              <div className="selected-credentials-preview">
                <h3>{t.credentialsIncluded} ({selectedCredentials.length})</h3>
                <div className="preview-grid">
                  {selectedCredentials.map(cred => (
                    <div key={cred.id} className="preview-card">
                      <img src={getImagePath(cred.thumbnail)} alt={language === 'en' && cred.title_en ? cred.title_en : cred.title} />
                      <span>{language === 'en' && cred.title_en ? cred.title_en : cred.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="link-box">
                <label>{t.linkToShare}</label>
                <div className="link-input-group">
                  <input type="text" value={generatedLink} readOnly className="link-input" />
                  <button className="btn-copy-link" onClick={copyLinkToClipboard}>📋 {t.copy}</button>
                </div>
              </div>
              <div className="share-link-info"><p>{t.linkInfo}</p></div>
              <div className="share-link-actions">
                <button className="btn-secondary" onClick={() => setShareModalOpen(false)}>{t.close}</button>
                <button className="btn-primary" onClick={() => { setShareModalOpen(false); setSelectionMode(false); setSelectedCredentials([]) }}>{t.done}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Credential Modal - Enhanced with 3 methods */}
      {uploadModalOpen && (
        <div className="modal-overlay" onClick={() => { setUploadModalOpen(false); setSelectedFile(null); setDragActive(false); setUploadUrl('') }}>
          <div className="modal-content upload-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t.uploadCredentialTitle}</h2>
              <button className="close-modal" onClick={() => { setUploadModalOpen(false); setSelectedFile(null); setDragActive(false); setUploadUrl('') }}>✕</button>
            </div>
            <div className="modal-body">
              <p className="upload-description">{t.uploadDescription}</p>

              {/* Upload method tabs */}
              <div className="upload-method-tabs">
                <button className={`upload-method-tab ${uploadMethod === 'file' ? 'active' : ''}`}
                  onClick={() => setUploadMethod('file')}>
                  📄 {language === 'es' ? 'Archivo JSON' : 'JSON File'}
                </button>
                <button className={`upload-method-tab ${uploadMethod === 'image' ? 'active' : ''}`}
                  onClick={() => setUploadMethod('image')}>
                  🖼️ {language === 'es' ? 'Imagen' : 'Image'}
                </button>
                <button className={`upload-method-tab ${uploadMethod === 'url' ? 'active' : ''}`}
                  onClick={() => setUploadMethod('url')}>
                  🔗 URL
                </button>
              </div>

              {uploadMethod === 'url' ? (
                <div className="upload-url-section">
                  <label>{language === 'es' ? 'URL de la credencial:' : 'Credential URL:'}</label>
                  <input
                    type="url"
                    placeholder={language === 'es' ? 'https://ejemplo.com/credencial.json' : 'https://example.com/credential.json'}
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    className="upload-url-input"
                  />
                </div>
              ) : (
                <div
                  className={`upload-dropzone ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
                  onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload-input').click()}
                >
                  <input type="file" id="file-upload-input"
                    accept={uploadMethod === 'image' ? 'image/*' : '.json,application/json'}
                    onChange={handleFileSelect} style={{ display: 'none' }} />
                  {!selectedFile ? (
                    <>
                      <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p className="upload-text">{t.dragDropText}</p>
                      <button className="btn-select-file" type="button">{t.selectFile}</button>
                    </>
                  ) : (
                    <>
                      <svg className="file-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                        <path d="M14 2v6h6" />
                      </svg>
                      <p className="file-name">{selectedFile.name}</p>
                      <p className="file-size">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                      <button className="btn-change-file" type="button" onClick={(e) => { e.stopPropagation(); setSelectedFile(null) }}>
                        {t.cancel}
                      </button>
                    </>
                  )}
                </div>
              )}

              <div className="upload-info">
                <p className="info-text">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" stroke="white" strokeWidth="2" />
                    <circle cx="12" cy="8" r="1" fill="white" />
                  </svg>
                  {t.openBadgesInfo}
                </p>
                <p className="supported-formats">
                  {language === 'es'
                    ? 'Formatos soportados: JSON (.json), Imagen con metadata (PNG, JPG), URL'
                    : 'Supported formats: JSON (.json), Image with metadata (PNG, JPG), URL'}
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => { setUploadModalOpen(false); setSelectedFile(null); setDragActive(false); setUploadUrl('') }}>
                {t.cancel}
              </button>
              <button className="btn-primary" onClick={handleUploadCredential}
                disabled={uploadMethod === 'url' ? !uploadUrl.trim() : !selectedFile}>
                {t.uploadButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selection Mode Banner */}
      {selectionMode && (
        <div className="selection-mode-banner">
          <div className="selection-mode-content">
            <span className="selection-count">
              {selectedCredentials.length} {t.credentialsSelected}{selectedCredentials.length !== 1 ? t.credentialsSelectedPlural : ''}
            </span>
            <div className="selection-actions">
              <button className="btn-cancel-selection" onClick={toggleSelectionMode}>{t.cancel}</button>
              <button className="btn-download-clr" onClick={downloadCLR} disabled={selectedCredentials.length === 0}>{t.downloadCLR}</button>
              <button className="btn-generate-link" onClick={generateShareLink} disabled={selectedCredentials.length === 0}>{t.shareWithLink}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
