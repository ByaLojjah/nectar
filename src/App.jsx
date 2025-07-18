import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Import de toutes les pages
import Home from './pages/Home'
import Search from './pages/Search'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderHistory from './pages/OrderHistory'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Favorite from './pages/Favorite'
import Authentification from './pages/Authentification'
import Filter from './pages/Filter'

import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
