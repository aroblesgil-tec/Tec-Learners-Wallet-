import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { translations } from '../translations'
import CREDENTIALS_DATA from '../data/credentials.json'
import CLRS_DATA from '../data/clrs.json'

const getImagePath = (path) => {
  if (!path) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('http') ? path : `${base}${path}`
}

function CLRList({ language }) {
  const navigate = useNavigate()
  const t = translations[language] || translations.es
  const [searchTerm, setSearchTerm] = useState('')
  const [filterOrigin, setFilterOrigin] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const credentialsMap = useMemo(() => {
    const map = {}
    CREDENTIALS_DATA.forEach(c => { map[c.id] = c })
    return map
  }, [])

  const resolveCredentials = (credentialIds) => {
    if (!credentialIds) return []
    return credentialIds.map(cid => credentialsMap[cid]).filter(Boolean)
  }

  const filteredCLRs = useMemo(() => {
    let results = [...CLRS_DATA]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(clr => {
        const name = (language === 'en' && clr.name_en ? clr.name_en : clr.name).toLowerCase()
        const issuerName = clr.issuer?.name?.toLowerCase() || ''
        const desc = (language === 'en' && clr.description_en ? clr.description_en : clr.description || '').toLowerCase()
        const year = clr.issue_date ? new Date(clr.issue_date).getFullYear().toString() : ''
        return name.includes(term) || issuerName.includes(term) || desc.includes(term) || year.includes(term)
      })
    }

    if (filterOrigin !== 'all') {
      results = results.filter(clr => clr.origin === filterOrigin)
    }

    if (sortBy === 'recent') {
      results.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date))
    } else if (sortBy === 'oldest') {
      results.sort((a, b) => new Date(a.issue_date) - new Date(b.issue_date))
    } else if (sortBy === 'az') {
      results.sort((a, b) => {
        const nameA = language === 'en' && a.name_en ? a.name_en : a.name
        const nameB = language === 'en' && b.name_en ? b.name_en : b.name
        return nameA.localeCompare(nameB)
      })
    } else if (sortBy === 'za') {
      results.sort((a, b) => {
        const nameA = language === 'en' && a.name_en ? a.name_en : a.name
        const nameB = language === 'en' && b.name_en ? b.name_en : b.name
        return nameB.localeCompare(nameA)
      })
    }

    return results
  }, [searchTerm, filterOrigin, sortBy, language])

  const tecCLRs = filteredCLRs.filter(c => c.origin === 'Tec')
  const externoCLRs = filteredCLRs.filter(c => c.origin === 'Externo')

  const statusLabel = (status) => {
    if (status === 'active') return language === 'es' ? 'Activo' : 'Active'
    if (status === 'expired') return language === 'es' ? 'Vencido' : 'Expired'
    return language === 'es' ? 'Revocado' : 'Revoked'
  }

  const renderCLRCard = (clr) => {
    const name = language === 'en' && clr.name_en ? clr.name_en : clr.name
    const creds = resolveCredentials(clr.credential_ids)
    const year = clr.issue_date ? new Date(clr.issue_date).getFullYear() : ''
    const status = clr.status || 'active'
    const hasExtra = creds.length > 4
    const mosaicCreds = hasExtra ? creds.slice(0, 3) : creds.slice(0, 4)
    const remaining = creds.length - mosaicCreds.length
    const originLabel = clr.origin === 'Tec' ? 'Tec' : (language === 'es' ? 'Externo' : 'External')

    const slots = []
    mosaicCreds.forEach((cred, i) => {
      slots.push(<img key={i} src={getImagePath(cred.thumbnail)} alt="" className="clr-mosaic__img" />)
    })
    if (remaining > 0) {
      slots.push(<div key="more" className="clr-mosaic__more">+{remaining}</div>)
    }
    while (slots.length < 4) {
      slots.push(<div key={`empty-${slots.length}`} className="clr-mosaic__empty"></div>)
    }

    return (
      <div key={clr.id} className={`cred-card cred-card--${status}`} onClick={() => navigate(`/clr/${clr.id}`)}>
        <div className="cred-card__image-area">
          <div className="clr-mosaic">
            {slots}
          </div>
          <span className={`cred-card__status-dot cred-card__status-dot--${status}`}></span>
        </div>
        <div className="cred-card__info">
          <h3 className="cred-card__name">{name}</h3>
          <p className="cred-card__issuer">{clr.issuer?.name}</p>
          <div className="cred-card__meta">
            <span className="cred-card__year">{year}</span>
            <span className="cred-card__divider-dot"></span>
            <span className="cred-card__type">{creds.length} {language === 'es' ? 'credenciales' : 'credentials'}</span>
          </div>
          <div className="cred-card__status-row">
            <span className={`cred-card__status cred-card__status--${status}`}>
              {statusLabel(status)}
            </span>
            <span className="cred-card__origin">{originLabel}</span>
          </div>
        </div>
      </div>
    )
  }

  const renderSection = (title, clrs) => {
    if (clrs.length === 0) return null
    return (
      <div className="shelf-section">
        <h2 className="shelf-title">{title}</h2>
        <div className="shelf">
          <div className="shelf-items">
            {clrs.map(renderCLRCard)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="wallet-section">
      {/* Toolbar - same style as Credentials */}
      <div className="wallet-toolbar">
        {/* Row 1: Search full width */}
        <div className="wallet-toolbar__search">
          <input
            type="text"
            placeholder={language === 'es' ? 'Buscar CLRs por nombre, emisor, año, descripción...' : 'Search CLRs by name, issuer, year, description...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="wallet-toolbar__input"
          />
          <span className="wallet-toolbar__search-icon">🔍</span>
        </div>

        {/* Row 2: Filters button (50%) + Import button (50%) */}
        <div className="wallet-toolbar__actions">
          <button className="wallet-toolbar__filters-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
            <span>⚙️</span> {t.filters || (language === 'es' ? 'Filtros' : 'Filters')}
          </button>
          <button className="wallet-toolbar__import-btn" onClick={() => alert(language === 'es' ? 'Importación simulada' : 'Simulated import')}>
            + {language === 'es' ? 'Importar' : 'Import'}
          </button>
        </div>

        {/* Expandable filters panel */}
        {filtersOpen && (
          <div className="wallet-toolbar__filters-panel">
            <div className="wallet-toolbar__filters">
              <select className="wallet-toolbar__select" value={filterOrigin} onChange={(e) => setFilterOrigin(e.target.value)}>
                <option value="all">{language === 'es' ? 'Todos los orígenes' : 'All origins'}</option>
                <option value="Tec">Tec</option>
                <option value="Externo">{language === 'es' ? 'Externo' : 'External'}</option>
              </select>
              <select className="wallet-toolbar__select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="recent">{t.mostRecent || 'Most Recent'}</option>
                <option value="oldest">{t.oldest || 'Oldest'}</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* CLR content */}
      <main className="main-content">
        {filteredCLRs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📚</div>
            <h2>{language === 'es' ? 'No tienes CLRs aún' : "You don't have CLRs yet"}</h2>
            <p>{language === 'es'
              ? 'Los Comprehensive Learner Records agrupan tus credenciales en trayectorias de aprendizaje. Importa un CLR o crea uno seleccionando credenciales.'
              : 'Comprehensive Learner Records group your credentials into learning paths. Import a CLR or create one by selecting credentials.'}</p>
            <button className="empty-state-btn" onClick={() => alert(language === 'es' ? 'Importación simulada' : 'Simulated import')}>
              + {language === 'es' ? 'Importar CLR' : 'Import CLR'}
            </button>
          </div>
        ) : (
          <div className="shelves-container">
            {filterOrigin === 'all' ? (
              <>
                {renderSection('Tec', tecCLRs)}
                {renderSection(language === 'es' ? 'Externo' : 'External', externoCLRs)}
              </>
            ) : (
              <div className="shelf-section">
                <div className="shelf">
                  <div className="shelf-items">
                    {filteredCLRs.map(renderCLRCard)}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default CLRList
