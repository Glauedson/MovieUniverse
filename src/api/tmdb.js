const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'

const fetchFromAPI = async (endpoint) => {
  try {
    const separator = endpoint.includes('?') ? '&' : '?'
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=pt-BR`
    
    console.log('URL da requisição:', url)
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error)
    throw error
  }
}

const tmdbAPI = {

  // Filmes populares
  getPopularMovies: async (page = 1) => {
    const data = await fetchFromAPI(`/movie/popular?page=${page}`)
    return data.results || []
  },

  // Filmes mais bem avaliados
  getTopRatedMovies: async (page = 1) => {
    const data = await fetchFromAPI(`/movie/top_rated?page=${page}`)
    return data.results || []
  },

  // Detalhes de um filme específico
  getMovieDetails: async (movieId) => {
    const data = await fetchFromAPI(`/movie/${movieId}`)
    return data
  },

  // Créditos do filme (elenco e equipe)
  getMovieCredits: async (movieId) => {
    const data = await fetchFromAPI(`/movie/${movieId}/credits`)
    return {
      cast: data.cast || [],
      crew: data.crew || []
    }
  },

  // Atores de um filme específico
  getMovieActors: async (movieId) => {
    const data = await fetchFromAPI(`/movie/${movieId}/credits`)
    const cast = data.cast || []
    return cast.map(actor => ({
      id: actor.id,
      name: actor.name,
      character: actor.character,
      profile_path: actor.profile_path,
      imageUrl: actor.profile_path 
        ? `${IMAGE_BASE_URL}${actor.profile_path}` 
        : null
    }))
  },

  // Séries populares
  getPopularTVShows: async (page = 1) => {
    const data = await fetchFromAPI(`/tv/popular?page=${page}`)
    return data.results || []
  },

  // Buscar filmes
  searchMovies: async (query, page = 1) => {
    const data = await fetchFromAPI(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
    return data.results || []
  },

  // Buscar séries
  searchTVShows: async (query, page = 1) => {
    const data = await fetchFromAPI(`/search/tv?query=${encodeURIComponent(query)}&page=${page}`)
    return data.results || []
  },

  // Utilitário para URL de imagens
  getImageUrl: (path, size = 'w500') => {
    if (!path) return null
    return `https://image.tmdb.org/t/p/${size}${path}`
  }
}

export default tmdbAPI