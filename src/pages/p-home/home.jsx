import Header from '../../components/header/header.jsx'
import ScrollItens from '../../components/scrow-itens/scrowItens.jsx'
import style from './home.module.css'

export default function Home() {
 
  //esperando a API para popular os itens
  
  return (
    <>
    <Header />

    <div className={style.mainHome} > 
        <h3>MAIS POPULARES</h3>
        <ScrollItens tipo="filmes" />
    </div>
    </>
  )
}
