import React, { useState, useEffect } from 'react'
import ItensCard from '../Itens-Card/ItensCard.jsx'
import styles from './scrollItens.module.css'

const ScrollItens = ({ 
  dados, 
  tipo = 'filmes', 
}) => {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const carregarDados = async () => {
      // Se os dados já foram passados como prop, usa eles diretamente
      if (dados && Array.isArray(dados)) {
        setItens(dados)
        return
      }

      // Se dados é uma função (promise), executa ela
      if (typeof dados === 'function') {
        try {
          setLoading(true)
          setError(null)
          
          const resultado = await dados()
          setItens(resultado || [])
        } catch (err) {
          setError(err.message)
          console.error('Erro ao carregar dados:', err)
        } finally {
          setLoading(false)
        }
      }
    }

    carregarDados()
  }, [dados])

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          Carregando {tipo === 'filmes' ? 'filmes' : 'atores'}...
        </div>
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
      <div className={styles.shadow}></div>
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