import styles from './ItensCard.module.css'

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
    });
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
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={imagemUrl}
          alt={getTitulo()}
          className={styles.poster}
          onError={(e) => {
            e.target.src = '/placeholder-movie.jpg'; // fallback se a imagem não carregar
          }}
        />
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.titulo} title={getTitulo()}>
          {getTitulo()}
        </h3>
        
        <p className={styles.data}>
          {formatarData(getData())}
        </p>
        
        {/* 
        {item.vote_average && (
          <div className={styles.rating}>
            <span className={styles.estrela}>⭐</span>
            <span className={styles.nota}>
              {item.vote_average.toFixed(1)}
            </span>
          </div>
        )}
        */}
      </div>
    </div>
  )
}

export default ItensCard