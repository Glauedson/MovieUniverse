import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/p-home/home.jsx';

export default function RoutesPages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

// Esse arquivo Routes é uma boa prática para organizar as rotas da aplicação.
// Mesmo que a aplicação tenha poucas rotas, é interessante manter essa estrutura.