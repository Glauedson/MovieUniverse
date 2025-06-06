import { useState, useEffect } from 'react'
import style from './header.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons"
import logo from '../../assets/icons/logo_Screen.png' 
import tmdbAPI from '../../api/tmdb.js'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Fechar busca se estiver aberta
    if (!isMenuOpen && isSearchOpen) {
      setIsSearchOpen(false)
      setSearchQuery('')
      setSearchResults([])
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen && isMenuOpen) {
      setIsMenuOpen(false)
    }
    if (isSearchOpen) {
      setSearchQuery('')
      setSearchResults([])
    }
  }

  // Função para buscar filmes e séries
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const [movies, tvShows] = await Promise.all([
        tmdbAPI.searchMovies(query),
        tmdbAPI.searchTVShows(query)
      ])

      const combinedResults = [
        ...movies.slice(0, 5).map(item => ({ ...item, type: 'movie' })),
        ...tvShows.slice(0, 5).map(item => ({ ...item, type: 'tv' }))
      ]
      combinedResults.sort((a, b) => b.popularity - a.popularity)
      
      setSearchResults(combinedResults.slice(0, 8))
    } catch (error) {
      console.error('Erro na busca:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearch(searchQuery)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  return (
    <div className={style.header}>
        <div className={style.headerContent}>

            {/* menu hamburguer */}
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              style={{ color: "#fcfcfc" }}
              className={style.menuIcon}
              onClick={toggleMenu}
            />

            <div className={style.headerCategory}>
              <Link to="/"><img src={logo} className={style.logo}></img></Link>
              <div className={style.headerCategoryLinks}>
                <Link to="/">Em Alta</Link>
                <Link to="/">Filmes</Link>
                <Link to="/">Series</Link>
              </div>
            </div>


            <div className={style.headerSearch}>
            {/* Lupa */}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#fcfcfc" }}
              className={style.menuIconSearch}
              onClick={toggleSearch}
            />
            <img 
              src="https://pbs.twimg.com/profile_images/1374017044266557440/aggBOWBw_400x400.jpg" 
              alt="perfil da pessoa"
              className={style.profileImage}
            />
            </div>
        </div>
        
        {/* Mobile Navigation */}
        <nav className={`${style.mobileNav} ${isMenuOpen ? style.mobileNavOpen : ''}`}>
          <div className={style.mobileNavContent}>
            <Link to="/" onClick={toggleMenu}>HOME</Link>
            <Link to="/" onClick={toggleMenu}>EM ALTA</Link>
            <Link to="/" onClick={toggleMenu}>FILMES</Link>
            <Link to="/" onClick={toggleMenu}>SERIES</Link>
          </div>
        </nav>

        {/* Search Bar */}
        <div className={`${style.searchBar} ${isSearchOpen ? style.searchBarOpen : ''}`}>
          <div className={style.searchContent}>
            <div className={style.searchInputContainer}>
              <input
                type="text"
                placeholder="Buscar filmes e séries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={style.searchInput}
                autoFocus
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={style.closeSearchIcon}
                onClick={toggleSearch}
              />
            </div>

            {/* Search Results */}
            <div className={style.searchResults}>
              {isLoading && (
                <div className={style.loadingMessage}>Buscando...</div>
              )}
              
              {!isLoading && searchQuery && searchResults.length === 0 && (
                <div className={style.noResults}>
                  Nenhum resultado encontrado para "{searchQuery}"
                </div>
              )}

              {!isLoading && searchResults.length > 0 && (
                <div className={style.resultsList}>
                  {searchResults.map((item) => (
                    <Link 
                      key={`${item.type}-${item.id}`} 
                      to={`/details/${item.type}/${item.id}`}
                      className={style.resultLink}
                      onClick={toggleSearch}
                    >
                      <div className={style.resultItem}>
                        <div className={style.resultImage}>
                          {item.poster_path ? (
                            <img
                              src={tmdbAPI.getImageUrl(item.poster_path, 'w92')}
                              alt={item.title || item.name}
                            />
                          ) : (
                            <div className={style.noImage}>
                              <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                          )}
                        </div>
                        <div className={style.resultInfo}>
                          <h4>{item.title || item.name}</h4>
                          <p className={style.resultType}>
                            {item.type === 'movie' ? 'Filme' : 'Série'} • {
                              item.release_date?.substring(0, 4) || 
                              item.first_air_date?.substring(0, 4) || 
                              'N/A'
                            }
                          </p>
                          {item.overview && (
                            <p className={style.resultOverview}>
                              {item.overview.length > 100 
                                ? `${item.overview.substring(0, 100)}...`
                                : item.overview
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
    </div>
  )
}