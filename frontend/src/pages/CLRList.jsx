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
  const [groupBy, setGroupBy] = useState('origin')
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

    results.sort((a, b) => new Date(b.issue_date) - new Date(a.issue_date))

    return results
  }, [searchTerm, filterOrigin, language])

  const groupedCLRs = useMemo(() => {
    if (groupBy === 'issuer') {
      const groups = {}
      const isTecIssuer = {}
      filteredCLRs.forEach(clr => {
        const key = clr.issuer?.name || (language === 'es' ? 'Sin emisor' : 'No issuer')
        if (!groups[key]) {
          groups[key] = []
          isTecIssuer[key] = false
        }
        groups[key].push(clr)
        if (clr.origin === 'Tec') isTecIssuer[key] = true
      })
      const tecKeys = Object.keys(groups).filter(k => isTecIssuer[k]).sort((a, b) => a.localeCompare(b))
      const externalKeys = Object.keys(groups).filter(k => !isTecIssuer[k]).sort((a, b) => a.localeCompare(b))
      const ordered = {}
      tecKeys.forEach(k => { ordered[k] = groups[k] })
      externalKeys.forEach(k => { ordered[k] = groups[k] })
      return ordered
    }
    if (groupBy === 'year') {
      const groups = {}
      filteredCLRs.forEach(clr => {
        const y = clr.issue_date ? new Date(clr.issue_date).getFullYear().toString() : (language === 'es' ? 'Sin fecha' : 'No date')
        if (!groups[y]) groups[y] = []
        groups[y].push(clr)
      })
      const ordered = {}
      Object.keys(groups).sort((a, b) => Number(b) - Number(a)).forEach(k => { ordered[k] = groups[k] })
      return ordered
    }
    // Default: origin (Tec primero, Externo después)
    const ordered = {}
    const tec = filteredCLRs.filter(c => c.origin === 'Tec')
    const ext = filteredCLRs.filter(c => c.origin === 'Externo')
    if (tec.length > 0) ordered['Tec'] = tec
    if (ext.length > 0) ordered[language === 'es' ? 'Externo' : 'External'] = ext
    return ordered
  }, [filteredCLRs, groupBy, language])

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

        {/* Row 2: Filters button (left) + Arrange dropdown (right) */}
        <div className="wallet-toolbar__actions">
          <button className="wallet-toolbar__filters-btn" onClick={() => setFiltersOpen(!filtersOpen)}>
            <span>⚙️</span> {t.filters || (language === 'es' ? 'Filtros' : 'Filters')}
          </button>
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="wallet-toolbar__group-select"
            aria-label={t.arrangeBy}
          >
            <option value="origin">{t.arrangeBy}: {t.arrangeByOrigin}</option>
            <option value="issuer">{t.arrangeBy}: {t.arrangeByIssuer}</option>
            <option value="year">{t.arrangeBy}: {t.arrangeByYear}</option>
          </select>
        </div>

        {/* Row 3: Import button full width */}
        <div className="wallet-toolbar__import-row">
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
            {Object.entries(groupedCLRs).map(([groupName, clrs]) => renderSection(groupName, clrs))}
          </div>
        )}
      </main>
    </div>
  )
}

export default CLRList
