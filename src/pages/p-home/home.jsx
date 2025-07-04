import Header from '../../components/header/header.jsx'
import Footer from '../../components/footer/footer.jsx'
import ScrollItens from '../../components/scrow-itens/scrowItens.jsx'
import tmdbAPI from '../../api/tmdb.js'
import style from './home.module.css'

export default function Home() {

  return (
    <>
    <Header />

    <div className={style.mainHome} >
      <div className={style.mainContent}>
        <h3>MAIS POPULARES</h3>
        <ScrollItens 
          dados={tmdbAPI.getPopularMovies}
          tipo="movies"
        />

        <h3>SERIES POPULARES</h3>
        <ScrollItens 
            dados={tmdbAPI.getPopularTVShows}
            tipo="series"
        />

        <h3>FILMES MAIS BEM AVALIADOS</h3>
        <ScrollItens 
            dados={tmdbAPI.getTopRatedMovies}
            tipo="movies"
          />
      </div>   
    </div>
    <Footer />
    </>
  )
}
