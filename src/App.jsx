import { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductList from './components/ProductList'
import { CartProvider } from './cart/CartContext'

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
        <ProductList keyword={keyword}/>
      </main>
      <Footer />
    </CartProvider>
  )
}

export default App
