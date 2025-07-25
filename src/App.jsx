import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext'; // ✅ ← AJOUTER CECI

// Pages
import Home from './pages/Home';
import Product from './pages/Product';
import Search from './pages/Search';
import ProductDetail from './pages/ProductDetail';
import LocationForm from './pages/LocationForm.jsx';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorite from './pages/Favorite';
import Authentification from './pages/Authentification';
import Filter from './pages/Filter';
import Best from './pages/Best';
import ProductCard from './pages/ProductCard'; // assure-toi que le chemin est bon
import CategoryCard from './components/CategoryCard'; // ajuste le chemin si nécessaire
import Grocery from './pages/Grocery'; // ou le bon chemin
import Exclusive from './pages/Exclusive';



// Composants
import Navbar from './components/Navbar';
import Loader from './components/Loader';



// function AppWrapper() {
//   const [loading, setLoading] = useState(true);



// function AppWrapper() {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000); // Simule le chargement initial (splash screen par exemple)
  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) return <Loader />;
  // return <App />;




function App() {
  const location = useLocation();
  const noNavbarRoutes = ['/', '/signup', '/login', '/authentification'];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/locationform" element={<LocationForm />} />
        <Route path="/" element={<Signup />} />
        <Route path="/categorycard" element={<CategoryCard />} />
        <Route path="/productcard/:id" element={<ProductCard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/authentification" element={<Authentification />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/best" element={<Best />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/grocery" element={<Grocery />} />

        <Route path="/exclusive" element={<Exclusive />} />

      </Routes>
    </>
  );
}

export default function RootApp() {
  return (
    <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
  );
}