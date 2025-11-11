import { useState, useEffect } from 'react'
import './App.css'

function App() {
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

  const categories = ['Todas', 'Títulos', 'Curriculares', 'Alternativas', 'Educación continua', 'Otras', 'Vencidas']

  useEffect(() => {
    fetchCredentials()
    fetchStats()
  }, [])

  const fetchCredentials = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/credentials')
      const data = await response.json()
      setAllCredentials(data.credentials)
      setCredentials(data.credentials)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching credentials:', error)
      setLoading(false)
    }
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
        cred.description.toLowerCase().includes(search.toLowerCase()) ||
        cred.skills.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
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
    return ['Todos', ...issuers]
  }

  const getUniqueYears = () => {
    const years = [...new Set(allCredentials.map(cred =>
      new Date(cred.issue_date).getFullYear().toString()
    ))].sort((a, b) => b - a)
    return ['Todos', ...years]
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
    alert('¡Link copiado al portapapeles!')
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
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
      return { 'Mis Credenciales': credentials }
    }

    if (selectedCategory === 'Todas') {
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

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando credenciales...</p>
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <img src="/logo_tec.png" alt="Tecnológico de Monterrey" className="header-logo" />
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
                  Mi perfil
                </button>
                <button className="dropdown-item">
                  Configuración
                </button>
                <button className="dropdown-item">
                  Descargar credenciales
                </button>
                <button className="dropdown-item">
                  Notificaciones
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={toggleSelectionMode}>
                  Compartir con empleador
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout">
                  Cerrar sesión
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
              placeholder="Buscar credenciales, habilidades, descripción..."
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
            Filtros
            {getActiveFiltersCount() > 0 && (
              <span className="filter-badge">{getActiveFiltersCount()}</span>
            )}
          </button>
        </div>

        {filtersOpen && (
          <div className="filters-panel">
            <div className="filters-header">
              <h3>Filtros</h3>
              {getActiveFiltersCount() > 0 && (
                <button className="clear-filters-btn" onClick={clearAllFilters}>
                  Limpiar filtros
                </button>
              )}
            </div>

            <div className="filters-bar">
              <div className="filter-group">
                <label>Emisor</label>
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
                <label>Año</label>
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
                <label>Ordenar por</label>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="filter-select"
                >
                  <option value="Más reciente">Más reciente</option>
                  <option value="Más antiguo">Más antiguo</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
              </div>
            </div>

            <button className="apply-filters-btn" onClick={() => setFiltersOpen(false)}>
              Aplicar filtros
            </button>
          </div>
        )}

        {!filtersOpen && getActiveFiltersCount() > 0 && (
          <div className="active-filters-summary">
            {selectedIssuer !== 'Todos' && (
              <span className="filter-tag">
                Emisor: {selectedIssuer}
                <button onClick={() => handleIssuerChange('Todos')}>×</button>
              </span>
            )}
            {selectedYear !== 'Todos' && (
              <span className="filter-tag">
                Año: {selectedYear}
                <button onClick={() => handleYearChange('Todos')}>×</button>
              </span>
            )}
            {sortBy !== 'Más reciente' && (
              <span className="filter-tag">
                Orden: {sortBy}
                <button onClick={() => handleSortChange('Más reciente')}>×</button>
              </span>
            )}
          </div>
        )}
        </div>
      )}

      {!selectionMode && (
        <div className="categories-container">
        <div className="categories-scroll">
          {categories.map((category) => (
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

      {!selectionMode && stats && selectedCategory === 'Todas' && (
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{stats.total_credentials}</div>
            <div className="stat-label">credenciales</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.microcredentials}</div>
            <div className="stat-label">microcredenciales</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.degrees}</div>
            <div className="stat-label">títulos</div>
          </div>
        </div>
      )}

      {selectionMode && (
        <div className="selection-mode-banner">
          <div className="selection-mode-content">
            <span className="selection-count">
              {selectedCredentials.length} credencial{selectedCredentials.length !== 1 ? 'es' : ''} seleccionada{selectedCredentials.length !== 1 ? 's' : ''}
            </span>
            <div className="selection-actions">
              <button className="btn-cancel-selection" onClick={toggleSelectionMode}>
                Cancelar
              </button>
              <button
                className="btn-generate-link"
                onClick={generateShareLink}
                disabled={selectedCredentials.length === 0}
              >
                Generar link para compartir
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="main-content">
        {credentials.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#2d3748', padding: '3rem' }}>
            <h2>No hay credenciales en esta categoría</h2>
            <p>Asegúrate de que el backend esté corriendo en http://localhost:8000</p>
          </div>
        ) : (
          <div className="shelves-container">
            {Object.entries(groupCredentialsByCategory()).map(([categoryName, categoryCredentials]) => (
              <div key={categoryName} className="shelf-section">
                <h2 className="shelf-title">{categoryName}</h2>
                <div className="shelf">
                  <div className="shelf-items">
                    {categoryCredentials.map((credential) => {
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
                              <img src={credential.thumbnail} alt={credential.title} />
                            </div>
                          </div>
                          <div className="trophy-plaque">
                            <h3>{credential.title}</h3>
                            <div className="credential-year">
                              {new Date(credential.issue_date).getFullYear()}
                            </div>
                          </div>
                        </div>
                      )
                    })}
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
                    src={selectedCredential.thumbnail}
                    alt={selectedCredential.title}
                    className="modal-credential-image"
                  />
                  <div className="image-hint">Click para ampliar</div>
                </div>
              </div>

              <div className="modal-right">
                <div className="modal-title-section">
                  <h2>{selectedCredential.title}</h2>
                  <div className="modal-issuer">
                    <img src={selectedCredential.issuer_logo} alt={selectedCredential.issuer} />
                    <span>{selectedCredential.issuer}</span>
                  </div>
                </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Descripción</h3>
                <p>{selectedCredential.description}</p>
              </div>

              <div className="detail-section">
                <h3>Habilidades</h3>
                <div className="skills-tags">
                  {selectedCredential.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Fecha de emisión</strong>
                  <span>{new Date(selectedCredential.issue_date).toLocaleDateString('es-MX', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="detail-item">
                  <strong>Duración</strong>
                  <span>{selectedCredential.hours} horas</span>
                </div>
                {selectedCredential.grade && (
                  <div className="detail-item">
                    <strong>Calificación</strong>
                    <span>{selectedCredential.grade}</span>
                  </div>
                )}
                <div className="detail-item">
                  <strong>Tipo</strong>
                  <span>{selectedCredential.type === 'degree' ? 'Título' : 'Microcredencial'}</span>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-primary btn-verify"
                  onClick={handleVerify}
                  disabled={isVerifying}
                >
                  {isVerifying ? (
                    <>
                      <span className="verify-spinner"></span>
                      Verificando...
                    </>
                  ) : verificationStatus && verificationStatus.includes('✓') ? (
                    <>
                      <span className="verify-check">✓</span>
                      Verificado
                    </>
                  ) : (
                    <>
                      <span className="verify-icon">🔒</span>
                      Verificar Open Badge
                    </>
                  )}
                </button>
                <div className="share-button-container">
                  <button
                    className="btn-secondary"
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  >
                    Compartir
                  </button>
                  {shareMenuOpen && (
                    <div className="share-dropdown">
                      <button
                        className="share-option"
                        onClick={() => handleShare('download')}
                      >
                        <span className="share-icon">📥</span>
                        Descargar
                      </button>
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
                </div>
              </div>

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
            src={selectedCredential.thumbnail}
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
                <h2>🎉 ¡Link generado exitosamente!</h2>
                <p>Comparte este link con empleadores para mostrar tus credenciales seleccionadas</p>
              </div>

              <div className="selected-credentials-preview">
                <h3>Credenciales incluidas ({selectedCredentials.length})</h3>
                <div className="preview-grid">
                  {selectedCredentials.map(cred => (
                    <div key={cred.id} className="preview-card">
                      <img src={cred.thumbnail} alt={cred.title} />
                      <span>{cred.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="link-box">
                <label>Link para compartir:</label>
                <div className="link-input-group">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="link-input"
                  />
                  <button className="btn-copy-link" onClick={copyLinkToClipboard}>
                    📋 Copiar
                  </button>
                </div>
              </div>

              <div className="share-link-info">
                <p>ℹ️ Este link permitirá al empleador ver solo las credenciales seleccionadas y verificar su autenticidad.</p>
              </div>

              <div className="share-link-actions">
                <button className="btn-secondary" onClick={() => setShareModalOpen(false)}>
                  Cerrar
                </button>
                <button className="btn-primary" onClick={() => {
                  setShareModalOpen(false)
                  setSelectionMode(false)
                  setSelectedCredentials([])
                }}>
                  Listo
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
