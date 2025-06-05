import { useParams } from 'react-router-dom'
import tmdbAPI from '../../api/tmdb'
import { setTitlePage } from '../../utils/setTitlePage'
import Header from '../../components/header/header.jsx'

export default function Details() {
  const { id } = useParams()

  tmdbAPI.getMovieDetails(id).then(details => {
    setTitlePage(details.title)
  });


  return (
    <>
    <Header />
      <h1>oi</h1>
      
    </>
  )
}