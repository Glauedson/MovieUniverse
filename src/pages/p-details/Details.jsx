import { useParams } from 'react-router-dom'
import tmdbAPI from '../../api/tmdb'
import { setTitlePage } from '../../utils/setTitlePage'
import Header from '../../components/header/header.jsx'

export default function Details() {
  const { id } = useParams()
  const { category } = useParams()

  if ( category === 'movies' ) {
    tmdbAPI.getMovieDetails(id)
      .then((data) => {
        console.log(data)
        setTitlePage(data.title || 'Detalhes do Filme')
      })
  } else {
    tmdbAPI.getTVShowDetails(id)
      .then((data) => {
        console.log(data)
        setTitlePage(data.name || 'Detalhes da Série')
      })
  }

  

  return (
    <>
    <Header />
      <h1>oi</h1>
      
    </>
  )
}