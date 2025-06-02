// Header =  cabeçalho do site
// Talvez eu coloque mais informações aqui no futuro, mas por enquanto é só um cabeçalho simples
// sem links ou botões
import { useState } from 'react'
import style from './header.module.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

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
              <h3 className={style.logo}>MOVIE UNIVERSE</h3>
              <div className={style.headerCategoryLinks}>
                <Link to="/">Em Alta</Link>
                <Link to="/">Filmes</Link>
                <Link to="/">Series</Link>
              </div>
            </div>

            {/* Lupa */}
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#fcfcfc" }}
              className={style.menuIcon}
            />
            <img 
              src="https://pbs.twimg.com/profile_images/1374017044266557440/aggBOWBw_400x400.jpg" 
              alt="perfil da pessoa"
              className={style.profileImage}
            />

        </div>
        
        {/* Mobile Navigation */}
        <nav className={`${style.mobileNav} ${isMenuOpen ? style.mobileNavOpen : ''}`}>
          <div className={style.mobileNavContent}>
            <Link to="/" onClick={toggleMenu}>EM ALTA</Link>
            <Link to="/" onClick={toggleMenu}>FILMES</Link>
            <Link to="/" onClick={toggleMenu}>SERIES</Link>
          </div>
        </nav>
        
    </div>
  )
}