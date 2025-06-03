import styles from './ItensCard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const ItensCard = ({ item, tipo }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
  
  // Função para formatar a data
  const formatarData = (data) => {
    if (!data) return 'Data não disponível'
    
    const dataObj = new Date(data)
    return dataObj.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).toUpperCase();
  };

  // Pega o título correto baseado no tipo
  const getTitulo = () => {
    if (tipo === 'filmes') {
      return item.title || item.original_title || 'Título não disponível'
    } else {
      return item.name || item.original_name || 'Título não disponível'
    }
  }

  // Pega a data correta baseada no tipo
  const getData = () => {
    if (tipo === 'filmes') {
      return item.release_date
    } else {
      return item.first_air_date
    }
  };

  // URL da imagem com fallback
  const imagemUrl = item.poster_path 
    ? `${IMAGE_BASE_URL}${item.poster_path}`
    : '/placeholder-movie.jpg'

  return (
    <Link 
      to={`/details/${item.id}`} 
      className={styles.card}
    >
  

      <div className={styles.imageContainer}
      style={{
            backgroundImage: `url(${imagemUrl})`,
          }}
      >
        <div className={styles.starsContainer} title='Avaliação'>
          <div className={styles.rating}>
            <FontAwesomeIcon
            icon={faStar}
            className={styles.iconStar}
            />

            <p className={styles.nota}>
              {item.vote_average.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.titulo} title={getTitulo()}>
          {getTitulo()}
        </h3>
        
        <p className={styles.data} title={formatarData(getData())}>
          {formatarData(getData())}
        </p>
      </div>
    </Link>
  )
}

export default ItensCard