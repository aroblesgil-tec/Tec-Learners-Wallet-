import { useState, useEffect } from 'react'
import './App.css'
import Login from './Login'
import { translations } from './translations'
import CREDENTIALS_DATA from './data/credentials.json'

// Helper function to get correct image path for GitHub Pages
const getImagePath = (path) => {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('http') ? path : `${base}${path}`
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [language, setLanguage] = useState('es')
  const [credentials, setCredentials] = useState([])
  const [allCredentials, setAllCredentials] = useState([])
  const [selectedCredential, setSelectedCredential] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [imageFullscreen, setImageFullscreen] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIssuer, setSelectedIssuer] = useState('Todos')
  const [selectedYear, setSelectedYear] = useState('Todos')
  const [sortBy, setSortBy] = useState('Más reciente')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedCredentials, setSelectedCredentials] = useState([])
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [generatedLink, setGeneratedLink] = useState('')

  const t = translations[language]

  const categories = {
    es: ['Todas', 'Títulos', 'Curriculares', 'Alternativas', 'Educación continua', 'Otras', 'Vencidas'],
    en: ['All', 'Degrees', 'Curricular', 'Alternative', 'Continuing Education', 'Other', 'Expired']
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es'
    setLanguage(newLang)

    // Update category and sort options when language changes
    const categoryMap = {
      'Todas': 'All', 'All': 'Todas',
      'Títulos': 'Degrees', 'Degrees': 'Títulos',
      'Curriculares': 'Curricular', 'Curricular': 'Curriculares',
      'Alternativas': 'Alternative', 'Alternative': 'Alternativas',
      'Educación continua': 'Continuing Education', 'Continuing Education': 'Educación continua',
      'Otras': 'Other', 'Other': 'Otras',
      'Vencidas': 'Expired', 'Expired': 'Vencidas'
    }

    const sortMap = {
      'Más reciente': 'Most Recent', 'Most Recent': 'Más reciente',
      'Más antiguo': 'Oldest', 'Oldest': 'Más antiguo',
      'A-Z': 'A-Z', 'Z-A': 'Z-A'
    }

    setSelectedCategory(categoryMap[selectedCategory] || (newLang === 'es' ? 'Todas' : 'All'))
    setSortBy(sortMap[sortBy] || (newLang === 'es' ? 'Más reciente' : 'Most Recent'))
    setSelectedIssuer(newLang === 'es' ? 'Todos' : 'All')
    setSelectedYear(newLang === 'es' ? 'Todos' : 'All')
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchCredentials()
      fetchStats()
    }
  }, [isLoggedIn])

  const fetchCredentials = async () => {
    // Load credentials directly from imported data
    setAllCredentials(CREDENTIALS_DATA)
    setCredentials(CREDENTIALS_DATA)
    setLoading(false)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    applyFilters(category, searchTerm, selectedIssuer, selectedYear, sortBy)
  }

  const applyFilters = (category, search, issuer, year, sort) => {
    let filtered = [...allCredentials]

    // Filtrar por categoría
    if (category !== 'Todas') {
      filtered = filtered.filter(cred => cred.category === category)
    }

    // Filtrar por búsqueda
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

    // Filtrar por emisor
    if (issuer !== 'Todos') {
      filtered = filtered.filter(cred => cred.issuer === issuer)
    }

    // Filtrar por año
    if (year !== 'Todos') {
      filtered = filtered.filter(cred =>
        new Date(cred.issue_date).getFullYear().toString() === year
      )
    }

    // Ordenar
    if (sort === 'Más reciente') {
      filtered.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date))
    } else if (sort === 'Más antiguo') {
      filtered.sort((a, b) => new Date(a.issue_date) - new Date(b.issue_date))
    } else if (sort === 'A-Z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'Z-A') {
      filtered.sort((a, b) => b.title.localeCompare(a.title))
    }

    setCredentials(filtered)
  }

  const handleSearchChange = (value) => {
    setSearchTerm(value)
    applyFilters(selectedCategory, value, selectedIssuer, selectedYear, sortBy)
  }

  const handleIssuerChange = (value) => {
    setSelectedIssuer(value)
    applyFilters(selectedCategory, searchTerm, value, selectedYear, sortBy)
  }

  const handleYearChange = (value) => {
    setSelectedYear(value)
    applyFilters(selectedCategory, searchTerm, selectedIssuer, value, sortBy)
  }

  const handleSortChange = (value) => {
    setSortBy(value)
    applyFilters(selectedCategory, searchTerm, selectedIssuer, selectedYear, value)
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
    if (selectedIssuer !== 'Todos') count++
    if (selectedYear !== 'Todos') count++
    if (sortBy !== 'Más reciente') count++
    return count
  }

  const clearAllFilters = () => {
    setSelectedIssuer('Todos')
    setSelectedYear('Todos')
    setSortBy('Más reciente')
    applyFilters(selectedCategory, searchTerm, 'Todos', 'Todos', 'Más reciente')
  }

  const toggleSelectionMode = () => {
    const newMode = !selectionMode
    setSelectionMode(newMode)

    if (newMode) {
      // Al activar modo selección, ir a "Todas" y mostrar todas las credenciales
      setSelectedCategory('Todas')
      setCredentials(allCredentials)
    } else {
      // Al desactivar, limpiar selección
      setSelectedCredentials([])
    }

    // Cerrar menú de usuario
    setUserMenuOpen(false)
  }

  const toggleCredentialSelection = (credential) => {
    setSelectedCredentials(prev => {
      const isSelected = prev.some(c => c.id === credential.id)
      if (isSelected) {
        return prev.filter(c => c.id !== credential.id)
      } else {
        return [...prev, credential]
      }
    })
  }

  const generateShareLink = () => {
    const credIds = selectedCredentials.map(c => c.id).join(',')
    const randomId = Math.random().toString(36).substring(2, 15)
    const link = `${window.location.origin}/shared/${randomId}?credentials=${credIds}`
    setGeneratedLink(link)
    setShareModalOpen(true)
  }

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
    alert(t.linkCopied)
  }

  const fetchStats = async () => {
    // Calculate stats directly from imported data
    const total_credentials = CREDENTIALS_DATA.length
    const microcredentials = CREDENTIALS_DATA.filter(c => c.type === "microcredential").length
    const degrees = CREDENTIALS_DATA.filter(c => c.type === "degree").length
    const total_hours = CREDENTIALS_DATA.reduce((sum, c) => sum + (c.hours || 0), 0)

    setStats({
      total_credentials,
      microcredentials,
      degrees,
      total_hours
    })
  }

  const openCredentialDetail = (credential) => {
    setSelectedCredential(credential)
  }

  const closeCredentialDetail = () => {
    setSelectedCredential(null)
    setImageFullscreen(false)
    setShareMenuOpen(false)
    setIsVerifying(false)
    setVerificationStatus(null)
  }

  const toggleImageFullscreen = (e) => {
    e.stopPropagation()
    setImageFullscreen(!imageFullscreen)
  }

  const handleDownload = () => {
    if (!selectedCredential) return

    const link = document.createElement('a')
    link.href = selectedCredential.thumbnail
    link.download = `${selectedCredential.title}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = (platform) => {
    if (!selectedCredential) return

    const text = `¡Obtuve la credencial "${selectedCredential.title}" del Tecnológico de Monterrey!`
    const url = window.location.href

    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'linkedin-profile') {
      window.open('https://www.linkedin.com/in/me/', '_blank')
    } else if (platform === 'download') {
      handleDownload()
    }

    setShareMenuOpen(false)
  }

  const handleVerify = async () => {
    if (!selectedCredential) return

    setIsVerifying(true)
    setVerificationStatus(null)

    // Simulación del proceso de verificación
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Verificando firma digital
    setVerificationStatus('Verificando firma digital...')
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Verificando emisor
    setVerificationStatus('Verificando emisor...')
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Verificando integridad
    setVerificationStatus('Verificando integridad del badge...')
    await new Promise(resolve => setTimeout(resolve, 1200))

    // Completado
    setVerificationStatus('✓ Verificación completada')
    setIsVerifying(false)
  }

  const groupCredentialsByCategory = () => {
    // En modo selección, no agrupar - mostrar todas juntas
    if (selectionMode) {
      return { [t.myCredentials]: credentials }
    }

    if (selectedCategory === 'Todas' || selectedCategory === 'All') {
      // Agrupar por categoría principal
      const groups = {}
      credentials.forEach(cred => {
        if (!groups[cred.category]) {
          groups[cred.category] = []
        }
        groups[cred.category].push(cred)
      })

      // Ordenar grupos para que "Títulos" aparezca primero
      const orderedGroups = {}
      const categoryOrder = ['Títulos', 'Curriculares', 'Alternativas', 'Educación continua', 'Otras', 'Vencidas']

      categoryOrder.forEach(cat => {
        if (groups[cat]) {
          orderedGroups[cat] = groups[cat]
        }
      })

      // Agregar cualquier categoría que no esté en el orden predefinido
      Object.keys(groups).forEach(cat => {
        if (!orderedGroups[cat]) {
          orderedGroups[cat] = groups[cat]
        }
      })

      return orderedGroups
    } else {
      // Una sola agrupación con el nombre de la categoría
      return { [selectedCategory]: credentials }
    }
  }

  const groupCredentialsByIssuer = (categoryCredentials, categoryName) => {
    // En modo selección, no agrupar por emisor
    if (selectionMode) {
      return { 'all': categoryCredentials }
    }

    // Agrupar por emisor
    const issuerGroups = {}

    categoryCredentials.forEach(cred => {
      if (!issuerGroups[cred.issuer]) {
        issuerGroups[cred.issuer] = []
      }
      issuerGroups[cred.issuer].push(cred)
    })

    // Para categorías específicas, usar orden predefinido
    const isOrderedCategory = categoryName !== 'Otras' && categoryName !== 'Other' &&
                               categoryName !== 'Vencidas' && categoryName !== 'Expired'

    if (isOrderedCategory) {
      const issuerOrder = ['Posgrado', 'Profesional', 'PrepaTEC', 'Educación Continua']
      const orderedIssuerGroups = {}

      issuerOrder.forEach(issuer => {
        if (issuerGroups[issuer]) {
          orderedIssuerGroups[issuer] = issuerGroups[issuer]
        }
      })

      // Agregar cualquier emisor que no esté en el orden predefinido
      Object.keys(issuerGroups).forEach(issuer => {
        if (!orderedIssuerGroups[issuer]) {
          orderedIssuerGroups[issuer] = issuerGroups[issuer]
        }
      })

      return orderedIssuerGroups
    }

    // Para "Otras" y "Vencidas", devolver grupos sin orden específico
    return issuerGroups
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
          <img src={getImagePath("logo_tec.png")} alt="Tecnológico de Monterrey" className="header-logo" />
          <h1>Tec Learners Wallet</h1>
          <div className="user-menu-container">
            <button
              className="user-avatar"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <span className="avatar-initials">JD</span>
            </button>
            {userMenuOpen && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-name">Juan Díaz</div>
                  <div className="user-email">juan.diaz@tec.mx</div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">
                  {t.myProfile}
                </button>
                <button className="dropdown-item">
                  {t.settings}
                </button>
                <button className="dropdown-item">
                  {t.downloadCredentials}
                </button>
                <button className="dropdown-item">
                  {t.notifications}
                </button>
                <div className="dropdown-divider"></div>
                <div className="language-selector">
                  <div className="language-label">{t.language}</div>
                  <div className="language-options">
                    <button
                      className={`language-option ${language === 'es' ? 'active' : ''}`}
                      onClick={() => language !== 'es' && toggleLanguage()}
                    >
                      <span className="flag">🇪🇸</span>
                      <span className="lang-name">Español</span>
                    </button>
                    <button
                      className={`language-option ${language === 'en' ? 'active' : ''}`}
                      onClick={() => language !== 'en' && toggleLanguage()}
                    >
                      <span className="flag">🇺🇸</span>
                      <span className="lang-name">English</span>
                    </button>
                  </div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={toggleSelectionMode}>
                  {t.shareWithEmployer}
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout">
                  {t.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {!selectionMode && (
        <div className="search-filter-container">
        <div className="search-bar-wrapper">
          <div className="search-bar">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button
            className="filters-toggle-btn"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <span className="filter-icon">⚙️</span>
            {t.filters}
            {getActiveFiltersCount() > 0 && (
              <span className="filter-badge">{getActiveFiltersCount()}</span>
            )}
          </button>
        </div>

        {filtersOpen && (
          <div className="filters-panel">
            <div className="filters-header">
              <h3>{t.filters}</h3>
              {getActiveFiltersCount() > 0 && (
                <button className="clear-filters-btn" onClick={clearAllFilters}>
                  {t.clearFilters}
                </button>
              )}
            </div>

            <div className="filters-bar">
              <div className="filter-group">
                <label>{t.issuer}</label>
                <select
                  value={selectedIssuer}
                  onChange={(e) => handleIssuerChange(e.target.value)}
                  className="filter-select"
                >
                  {getUniqueIssuers().map(issuer => (
                    <option key={issuer} value={issuer}>{issuer}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>{t.year}</label>
                <select
                  value={selectedYear}
                  onChange={(e) => handleYearChange(e.target.value)}
                  className="filter-select"
                >
                  {getUniqueYears().map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>{t.sortBy}</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="filter-select"
                >
                  <option value={language === 'es' ? 'Más reciente' : 'Most Recent'}>{t.mostRecent}</option>
                  <option value={language === 'es' ? 'Más antiguo' : 'Oldest'}>{t.oldest}</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
            </div>

            <button className="apply-filters-btn" onClick={() => setFiltersOpen(false)}>
              {t.applyFilters}
            </button>
          </div>
        )}

        {!filtersOpen && getActiveFiltersCount() > 0 && (
          <div className="active-filters-summary">
            {selectedIssuer !== t.all && selectedIssuer !== 'Todos' && selectedIssuer !== 'All' && (
              <span className="filter-tag">
                {t.issuer}: {selectedIssuer}
                <button onClick={() => handleIssuerChange(language === 'es' ? 'Todos' : 'All')}>×</button>
              </span>
            )}
            {selectedYear !== t.all && selectedYear !== 'Todos' && selectedYear !== 'All' && (
              <span className="filter-tag">
                {t.year}: {selectedYear}
                <button onClick={() => handleYearChange(language === 'es' ? 'Todos' : 'All')}>×</button>
              </span>
            )}
            {sortBy !== t.mostRecent && sortBy !== 'Más reciente' && sortBy !== 'Most Recent' && (
              <span className="filter-tag">
                {t.order}: {sortBy}
                <button onClick={() => handleSortChange(language === 'es' ? 'Más reciente' : 'Most Recent')}>×</button>
              </span>
            )}
          </div>
        )}
        </div>
      )}

      {!selectionMode && (
        <div className="categories-container">
        <div className="categories-scroll">
          {categories[language].map((category) => (
            <button
              key={category}
              className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        </div>
      )}

      {!selectionMode && stats && (selectedCategory === 'Todas' || selectedCategory === 'All') && (
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{stats.total_credentials}</div>
            <div className="stat-label">{t.credentials}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.microcredentials}</div>
            <div className="stat-label">{t.microcredentials}</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.degrees}</div>
            <div className="stat-label">{t.titles}</div>
          </div>
        </div>
      )}

      {selectionMode && (
        <div className="selection-mode-banner">
          <div className="selection-mode-content">
            <span className="selection-count">
              {selectedCredentials.length} {t.credentialsSelected}{selectedCredentials.length !== 1 ? t.credentialsSelectedPlural : ''}
            </span>
            <div className="selection-actions">
              <button className="btn-cancel-selection" onClick={toggleSelectionMode}>
                {t.cancel}
              </button>
              <button
                className="btn-generate-link"
                onClick={generateShareLink}
                disabled={selectedCredentials.length === 0}
              >
                {t.generateLink}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="main-content">
        {credentials.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#2d3748', padding: '3rem' }}>
            <h2>{t.noCredentials}</h2>
          </div>
        ) : (
          <div className="shelves-container">
            {Object.entries(groupCredentialsByCategory()).map(([categoryName, categoryCredentials]) => (
              <div key={categoryName} className="shelf-section">
                <h2 className="shelf-title">{categoryName}</h2>
                <div className="shelf">
                  <div className="shelf-items">
                    {Object.entries(groupCredentialsByIssuer(categoryCredentials, categoryName)).map(([issuerName, issuerCredentials], issuerIndex, array) => (
                      <>
                        <div key={issuerName} className="issuer-group">
                          {issuerName !== 'all' && (
                            <div className="issuer-label">{issuerName}</div>
                          )}
                          <div className="issuer-credentials">
                            {issuerCredentials.map((credential) => {
                              const isSelected = selectedCredentials.some(c => c.id === credential.id)
                              return (
                                <div
                                  key={credential.id}
                                  className={`credential-trophy ${credential.category === 'Vencidas' ? 'expired' : ''} ${selectionMode ? 'selection-mode-active' : ''} ${isSelected ? 'selected' : ''}`}
                                  onClick={() => selectionMode ? toggleCredentialSelection(credential) : openCredentialDetail(credential)}
                                >
                                  {selectionMode && (
                                    <div className="selection-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => toggleCredentialSelection(credential)}
                                        onClick={(e) => e.stopPropagation()}
                                      />
                                    </div>
                                  )}
                                  <div className="trophy-stand">
                                    <div className="trophy-image">
                                      <img src={getImagePath(credential.thumbnail)} alt={language === 'en' && credential.title_en ? credential.title_en : credential.title} />
                                    </div>
                                  </div>
                                  <div className="trophy-plaque">
                                    <h3>{language === 'en' && credential.title_en ? credential.title_en : credential.title}</h3>
                                    <div className="credential-year">
                                      {new Date(credential.issue_date).getFullYear()}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                        {issuerIndex < array.length - 1 && issuerName !== 'all' && (
                          <div key={`divider-${issuerName}`} className="issuer-divider"></div>
                        )}
                      </>
                    ))}
                  </div>
                  <div className="shelf-board"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedCredential && (
        <div className="modal-overlay" onClick={closeCredentialDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeCredentialDetail}>×</button>

            <div className="modal-layout">
              <div className="modal-left">
                <div className="modal-image-container" onClick={toggleImageFullscreen}>
                  <img
                    src={getImagePath(selectedCredential.thumbnail)}
                    alt={selectedCredential.title}
                    className="modal-credential-image"
                  />
                  <div className="image-hint">{t.clickToEnlarge}</div>
                </div>
              </div>

              <div className="modal-right">
                <div className="modal-title-section">
                  <h2>{language === 'en' && selectedCredential.title_en ? selectedCredential.title_en : selectedCredential.title}</h2>
                  <div className="modal-issuer">
                    <img src={getImagePath(selectedCredential.issuer_logo)} alt={selectedCredential.issuer} />
                    <span>{selectedCredential.issuer}</span>
                  </div>
                </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>{t.description}</h3>
                <p>{language === 'en' && selectedCredential.description_en ? selectedCredential.description_en : selectedCredential.description}</p>
              </div>

              <div className="detail-section">
                <h3>{t.skills}</h3>
                <div className="skills-tags">
                  {(language === 'en' && selectedCredential.skills_en ? selectedCredential.skills_en : selectedCredential.skills).map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <strong>{t.issueDate}</strong>
                  <span>{new Date(selectedCredential.issue_date).toLocaleDateString(language === 'es' ? 'es-MX' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="detail-item">
                  <strong>{t.duration}</strong>
                  <span>{selectedCredential.hours} {t.hours}</span>
                </div>
                {selectedCredential.grade && (
                  <div className="detail-item">
                    <strong>{t.grade}</strong>
                    <span>{selectedCredential.grade}</span>
                  </div>
                )}
                <div className="detail-item">
                  <strong>{t.type}</strong>
                  <span>{selectedCredential.type === 'degree' ? t.degree : t.microcredential}</span>
                </div>
              </div>

              {selectedCredential.degree_versions && (
                <div className="degree-versions-section">
                  <h3>{t.degreeVersions}</h3>
                  <div className="degree-versions-grid">
                    {/* Versión Blockchain */}
                    <div className="degree-version-card">
                      <div className="version-header">
                        <h4>{language === 'en' ? selectedCredential.degree_versions.blockchain.name_en : selectedCredential.degree_versions.blockchain.name}</h4>
                        <span className="version-badge blockchain">Blockchain</span>
                      </div>
                      <p className="version-description">
                        {language === 'en' ? selectedCredential.degree_versions.blockchain.description_en : selectedCredential.degree_versions.blockchain.description}
                      </p>
                      <div className="version-recommendation">
                        <span className="recommendation-icon">💼</span>
                        <span>{t.recommendedFor}: <strong>{t.employers}</strong></span>
                      </div>
                      <button
                        className="btn-download-version"
                        onClick={() => {
                          // Descargar ambos archivos
                          const link1 = document.createElement('a');
                          link1.href = selectedCredential.degree_versions.blockchain.files.pdf;
                          link1.download = 'titulo_blockchain.pdf';
                          link1.click();

                          setTimeout(() => {
                            const link2 = document.createElement('a');
                            link2.href = selectedCredential.degree_versions.blockchain.files.json;
                            link2.download = 'titulo_blockchain.json';
                            link2.click();
                          }, 500);
                        }}
                      >
                        <span className="file-icon">📥</span>
                        {t.downloadFiles}
                      </button>
                      <button
                        className="btn-verify-blockchain"
                        onClick={handleVerify}
                        disabled={isVerifying}
                      >
                        {isVerifying ? (
                          <>
                            <span className="verify-spinner"></span>
                            {t.verifying}
                          </>
                        ) : verificationStatus && verificationStatus.includes('✓') ? (
                          <>
                            <span className="verify-check">✓</span>
                            {t.verified}
                          </>
                        ) : (
                          <>
                            <span className="verify-icon">🔒</span>
                            {t.verifyBadge}
                          </>
                        )}
                      </button>
                      <button
                        className="btn-share-blockchain"
                        onClick={() => setShareMenuOpen(!shareMenuOpen)}
                      >
                        <span className="share-icon">📤</span>
                        {t.share}
                      </button>
                      {shareMenuOpen && (
                        <div className="share-dropdown-blockchain">
                          <button
                            className="share-option"
                            onClick={() => handleShare('linkedin')}
                          >
                            <span className="share-icon">💼</span>
                            LinkedIn
                          </button>
                          <button
                            className="share-option"
                            onClick={() => handleShare('linkedin-profile')}
                          >
                            <span className="share-icon">👤</span>
                            LinkedIn Profile
                          </button>
                        </div>
                      )}
                      <div className="version-validity">
                        <small>{language === 'en' ? selectedCredential.degree_versions.blockchain.validity_en : selectedCredential.degree_versions.blockchain.validity}</small>
                      </div>
                    </div>

                    {/* Versión SEP */}
                    <div className="degree-version-card">
                      <div className="version-header">
                        <h4>{language === 'en' ? selectedCredential.degree_versions.sep.name_en : selectedCredential.degree_versions.sep.name}</h4>
                        <span className="version-badge sep">SEP</span>
                      </div>
                      <p className="version-description">
                        {language === 'en' ? selectedCredential.degree_versions.sep.description_en : selectedCredential.degree_versions.sep.description}
                      </p>
                      <div className="version-recommendation">
                        <span className="recommendation-icon">📋</span>
                        <span>{t.recommendedFor}: <strong>{t.officialProcedures}</strong></span>
                      </div>
                      <button
                        className="btn-download-version"
                        onClick={() => {
                          // Descargar ambos archivos
                          const link1 = document.createElement('a');
                          link1.href = selectedCredential.degree_versions.sep.files.pdf;
                          link1.download = 'titulo_sep.pdf';
                          link1.click();

                          setTimeout(() => {
                            const link2 = document.createElement('a');
                            link2.href = selectedCredential.degree_versions.sep.files.xml;
                            link2.download = 'titulo_sep.xml';
                            link2.click();
                          }, 500);
                        }}
                      >
                        <span className="file-icon">📥</span>
                        {t.downloadFiles}
                      </button>
                      <div className="version-validity official">
                        <small>{language === 'en' ? selectedCredential.degree_versions.sep.validity_en : selectedCredential.degree_versions.sep.validity}</small>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {verificationStatus && (
                <div className="verification-status">
                  {verificationStatus}
                </div>
              )}
            </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {imageFullscreen && selectedCredential && (
        <div className="fullscreen-overlay" onClick={toggleImageFullscreen}>
          <button className="fullscreen-close" onClick={toggleImageFullscreen}>×</button>
          <img
            src={getImagePath(selectedCredential.thumbnail)}
            alt={selectedCredential.title}
            className="fullscreen-image"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

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
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="link-input"
                  />
                  <button className="btn-copy-link" onClick={copyLinkToClipboard}>
                    📋 {t.copy}
                  </button>
                </div>
              </div>

              <div className="share-link-info">
                <p>{t.linkInfo}</p>
              </div>

              <div className="share-link-actions">
                <button className="btn-secondary" onClick={() => setShareModalOpen(false)}>
                  {t.close}
                </button>
                <button className="btn-primary" onClick={() => {
                  setShareModalOpen(false)
                  setSelectionMode(false)
                  setSelectedCredentials([])
                }}>
                  {t.done}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
