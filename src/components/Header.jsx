import { useState } from 'react';
import styles from './Header.module.css';
import { useCart } from '../cart/CartContext';

export default function Header({onSearch}) {
  const [keyword, setKeyword] = useState('');
  const {cartItems, count} = useCart();
  // console.log(cartItems);

  const handleChange = (e)=>{
    setKeyword(e.target.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    onSearch(keyword);
  }
  return (
    <header>
      <div className={styles.topbar}>
        <div className="container">
          <button className={styles.menuToggle}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className={styles.left}>
            <h1>
              <a href="index.html">
                <img src="images/logo.svg" alt="logo" />
                <span className="hidden">EST-shop logo</span>
              </a>
            </h1>
            <form action="" onSubmit={handleSubmit}>
              <img src="images/icon_search.svg" alt="" />
              <input type="search" onChange={handleChange} placeholder="상품을 검색해보세요" />
            </form>
          </div>
          <div className={styles.right}>
            <ul>
              <li><a href="">로그인</a></li>
              <li><a href="">회원가입</a></li>
              <li><a href="" data-cart={count} className={styles.cart}><img src="images/icon_cart.svg" alt="" /></a></li>
            </ul>
          </div>
        </div>
      </div>
      <nav>
        <ul className="container">
          <li><a href="">전체상품</a></li>
          <li><a href="">패션의류</a></li>
          <li><a href="">디지털</a></li>
          <li><a href="">홈&amp;리빙</a></li>
          <li><a href="">뷰티</a></li>
          <li><a href="">스포츠</a></li>
          <li><a href="">도서</a></li>
        </ul>
        <ul className={styles.mobileLogin}>
          <li><a href="">로그인</a></li>
          <li><a href="">회원가입</a></li>
        </ul>
      </nav>
    </header>
  )
}