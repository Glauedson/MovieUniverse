import { useParams } from 'react-router-dom'
import tmdbAPI from '../../api/tmdb'
import { setTitlePage } from '../../utils/setTitlePage'

export default function Details() {
  const { id } = useParams()

  tmdbAPI.getMovieDetails(id).then(details => {
    setTitlePage(details.title)
  });


  return (
    <>
      <h1>oi</h1>
      
    </>
  )
}