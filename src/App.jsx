import { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductList from './components/ProductList'
import { CartProvider } from './cart/CartContext'
import { Routes, Route } from "react-router";
import Cart from './components/Cart'

function App() {
  const [keyword, setKeyword] = useState('');
  // const [cartCount, setCartCount] = useState(0);

  const handleSearch = (value)=>{
    setKeyword(value);
  }
  // const handleAddToCart = ()=>{
  //   setCartCount(prev=>prev+1);
  // }
  return (
    <CartProvider>
      {/* <Header onSearch={handleSearch} cartCount={cartCount}/> */}
      <Header onSearch={handleSearch}/>
      <Banner />
      <main>
        {/* <ProductList keyword={keyword} onAddToCart={handleAddToCart}/> */}
        <Routes>
          <Route path="/" element={<ProductList keyword={keyword}/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  )
}

export default App
