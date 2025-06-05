import styles from './ItensCard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const ItensCard = ({ item, tipo }) => {
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
  
  // Renderiza card de filme
  const renderFilmeCard = () => {
    const formatarData = (data) => {
      if (!data) return 'Data não disponível'
      
      const dataObj = new Date(data)
      return dataObj.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).toUpperCase()
    }

    // Pega o título correto baseado no tipo
    const getTitulo = () => {
      return item.title || item.original_title || item.name || item.original_name || 'Título não disponível'
    }

    // Pega a data correta baseada no tipo
    const getData = () => {
      return item.release_date || item.first_air_date
    }

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
                {item.vote_average?.toFixed(1) || 'N/A'}
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

  // Renderiza card de ator 
  const renderAtorCard = () => {
    const dadosAtor = {
      id: item.id,
      nome: item.name || 'Nome não disponível',
      personagem: item.character || 'Personagem não informado',
      fotoUrl: item.profile_path 
        ? `${IMAGE_BASE_URL}${item.profile_path}` 
        : item.imageUrl || '/placeholder-actor.jpg',
      fotoPath: item.profile_path
    }

    return (
      <div className={styles.actorCard}>
        {/* 
          - dadosAtor.nome (string): Nome do ator
          - dadosAtor.personagem (string): Personagem que interpreta
          - dadosAtor.fotoUrl (string): URL completa da foto do ator
          - dadosAtor.id (number): ID do ator no TMDB
        */}
        
        <div className={styles.actorImageContainer}>
          <img 
            src={dadosAtor.fotoUrl} 
            alt={dadosAtor.nome}
            className={styles.actorImage}
          />
        </div>
        
        <div className={styles.actorInfo}>
          <h4 className={styles.actorName}>{dadosAtor.nome}</h4>
          <p className={styles.actorCharacter}>{dadosAtor.personagem}</p>
        </div>

        {/* 
          {dadosAtor.nome} - Nome do ator
          {dadosAtor.personagem} - Personagem
          {dadosAtor.fotoUrl} - URL da foto
          {dadosAtor.id} - ID do ator
        */}
      </div>
    )
  }

  // Decide qual card renderizar baseado no tipo
  if (tipo === 'atores') {
    return renderAtorCard()
  } else {
    return renderFilmeCard()
  }
}

export default ItensCard