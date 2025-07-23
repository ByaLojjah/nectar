import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CategoryCard from './components/CategoryCard'
import ProductCard from './components/ProductCard'
function App() {
 

  return (
    <>
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
      
        <Route path="/category-card" element={<CategoryCard />} />
        <Route path="/ProductCard/:id" element={<ProductCard />} />
   
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
