import React, { useState, useEffect } from 'react'
import ItensCard from '../Itens-Card/ItensCard.jsx'
import styles from './scrollItens.module.css'

const ScrollItens = ({ tipo = 'filmes' }) => {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_KEY = import.meta.env.VITE_API_KEY
  const BASE_URL = 'https://api.themoviedb.org/3'

  useEffect(() => {
    const fetchItens = async () => {
      try {
        setLoading(true)
        setError(null)

        // Determina o endpoint baseado no tipo
        const endpoint = tipo === 'filmes' 
          ? `${BASE_URL}/movie/popular` 
          : `${BASE_URL}/tv/popular`

        const response = await fetch(`${endpoint}?api_key=${API_KEY}&language=pt-BR&page=1`)
        
        if (!response.ok) {
          throw new Error('Erro ao buscar dados da API')
        }

        const data = await response.json()
        setItens(data.results || [])
      } catch (err) {
        setError(err.message)
        console.error('Erro ao buscar itens:', err)
      } finally {
        setLoading(false)
      }
    };

    if (API_KEY) {
      fetchItens()
    } else {
      setError('API Key não encontrada')
      setLoading(false)
    }
  }, [tipo, API_KEY])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Carregando {tipo}...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>Erro: {error}</div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
  
      <div className={styles.scrollContainer}>
        <div className={styles.scrollItens}>
          {itens.map((item) => (
            <ItensCard 
              key={item.id} 
              item={item} 
              tipo={tipo}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrollItens