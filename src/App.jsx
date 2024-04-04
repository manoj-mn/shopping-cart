import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import Header from './components/Header'
import Home from './components/Home'
import Cart from './components/Cart'

export default function App() {
  return (
    <BrowserRouter basename='/shopping-cart'>
      <Header />
      <div className='d-flex'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
