import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import './App.css';
import React, { useState, useEffect } from 'react';

// Pages
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

// Composants
import Navbar from './components/Navbar'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 secondes
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<RedirectToSignup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </BrowserRouter>
  );
}


function RedirectToSignup() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/signup');
  }, [navigate]);

  return null;
}

export default App;
