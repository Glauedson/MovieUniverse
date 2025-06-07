import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import tmdbAPI from '../../api/tmdb'
import { setTitlePage } from '../../utils/setTitlePage'
import Header from '../../components/header/header.jsx'
import styles from './details.module.css'
import Star from '../../components/stars/Star.jsx'
import ScrollItens from '../../components/scrow-itens/scrowItens.jsx'
import Footer from '../../components/footer/footer.jsx'

export default function Details() {
  const { id, category } = useParams()
  
  // Estados para armazenar os dados
  const [movieData, setMovieData] = useState(null)
  const [trailerData, setTrailer] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Normalizar a categoria - aceitar tanto movie/movies quanto tv/series  
        const isMovie = category === 'movie' || category === 'movies'
        const isTVShow = category === 'tv' || category === 'series'
        
        if (isMovie) {
          // Buscar trailer do filme
          const trailer = await tmdbAPI.getMovieTrailers(id)
        setTrailer(trailer)

          // Buscar detalhes do filme
          const movieDetails = await tmdbAPI.getMovieDetails(id)
          setMovieData(movieDetails)
          setTitlePage(movieDetails.title || 'Detalhes do Filme')
          
          // Buscar elenco do filme
          const movieCast = await tmdbAPI.getMovieActors(id)
          setCast(movieCast)
          
        } else if (isTVShow) {
          // Buscar detalhes da série
          const tvDetails = await tmdbAPI.getTVShowDetails(id)
          setMovieData(tvDetails)
          setTitlePage(tvDetails.name || 'Detalhes da Série')
          
          // Buscar elenco da série
          const tvCast = await tmdbAPI.getTVShowActors(id)
          setCast(tvCast)
        } else {
          throw new Error(`Categoria inválida: ${category}. Use 'movie', 'movies', 'tv' ou 'series'.`)
        }
        
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (id && category) {
      fetchData()
    }
  }, [id, category])

  // Função para formatar gêneros
  const formatGenres = (genres) => {
    if (!genres || genres.length === 0) return []
    return genres.map(genre => genre.name.toUpperCase())
  }

  // Função para formatar nota (de 0-10 para 0-10 com 1 casa decimal)
  const formatRating = (rating) => {
    return rating ? parseFloat(rating.toFixed(1)) : 0
  }

  // Se estiver carregando
  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Carregando...</p>
          </div>
        </main>
      </>
    )
  }

  // Se houver erro
  if (error) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Erro ao carregar dados: {error}</p>
          </div>
        </main>
      </>
    )
  }

  console.log('Dados do filme/série:', movieData)

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.Banner}
          style={{ 
            backgroundImage: movieData.backdrop_path 
              ? `url(${tmdbAPI.getImageUrl(movieData.backdrop_path, 'original')})` 
              : 'url(/placeholder-banner.jpg)',
          }}
        >
          
          <div className={styles.infosMovie}>
            <img 
              src={movieData.poster_path 
                ? tmdbAPI.getImageUrl(movieData.poster_path, 'w600_and_h900_bestv2') 
                : '/placeholder-movie.jpg'
              } 
              alt={`${movieData.title || movieData.name} Cover`} 
              className={styles.movieCover} 
            />
            <div className={styles.movieInfos}>
              <h1 className={styles.movieTitle}>
                {movieData.title || movieData.name}
              </h1>
              
              <div className={styles.genres}>
                {formatGenres(movieData.genres).map((genre, index) => (
                  <span key={index} className={styles.genre}>{genre}</span>
                ))}
              </div>
              
              <Star rating={formatRating(movieData.vote_average)} />

              <h3 className={styles.overview}>SINOPSE</h3>
              <p className={styles.movieDescription}>
                {movieData.overview || 'Sinopse não disponível.'}
              </p>
              
              {/* Informações adicionais */}
              <div className={styles.additionalInfo}>
                {movieData.release_date && (
                  <p><strong>Data de Lançamento:</strong> {new Date(movieData.release_date).toLocaleDateString('pt-BR')}</p>
                )}
                {movieData.first_air_date && (
                  <p><strong>Primeira Exibição:</strong> {new Date(movieData.first_air_date).toLocaleDateString('pt-BR')}</p>
                )}
                {movieData.runtime && (
                  <p><strong>Duração:</strong> {movieData.runtime} minutos</p>
                )}
                {movieData.number_of_seasons && (
                  <p><strong>Temporadas:</strong> {movieData.number_of_seasons}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}> 
          <h2>ELENCO PRINCIPAL</h2>
          <ScrollItens 
            dados={cast}
            tipo="atores"
          />
        </div>
        
        <h2 className={styles.subTitle}>TRAILER</h2>
        <div className={styles.trailerContent}>
          {trailerData && trailerData.length > 0 ? (
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${trailerData[0].key}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.trailerVideo}
            ></iframe>
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgxClYeVFnRrAFgbpLPNEwsyfn0qKutdLz9w&s"
              alt="Trailer não disponível"
              className={styles.trailerVideo}
            />
          )}

          <div className={styles.moreInfos}>
            <p className={styles.titleMoreInfos}>Título Original</p>
            <p className={styles.BoxInfo}>{movieData.original_title || movieData.name}</p>

            <p className={styles.titleMoreInfos}>Idioma Original</p>
            <p className={styles.BoxInfo}>{movieData.original_language.toUpperCase()}</p>

            <p className={styles.titleMoreInfos}>Status</p> 
            <p className={styles.BoxInfo}>{movieData.status}</p>

            <p className={styles.titleMoreInfos}>Orçamento</p> 
            <p className={styles.BoxInfo}>{movieData.budget ? `$${movieData.budget.toLocaleString()}` : 'Não disponível'}</p>
          </div>
        </div>
        
      </main>
      <Footer />
    </>
  )
}