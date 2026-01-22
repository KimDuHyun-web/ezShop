import styles from './Cart.module.css'
import { useCart } from '../cart/CartContext';

export default function Cart() {
  const {cartItems, inQty, decQty, removeItems, clearCart, totalPrice} = useCart();
  return (
    <div className="container">
      <h2>Cart Page</h2>
        {
          cartItems.length === 0 ?
          <p>장바구니에 상품이 없습니다.</p>
          :
          <div className={styles.cartListWrapper}>
            <button onClick={()=>{
              if(confirm('정말 모두 비울까요?')) clearCart()
            }}>전체 비우기</button>
            <ul className={styles.cartList}>
              {cartItems.map(item=>
              <li key={item.id}>
                <img src={item.thumbnail} alt="" />
                <div>
                  {item.title}
                  {item.price}
                </div>
                <div>
                  {item.qty}
                </div>
                <div>
                  <button onClick={()=>{inQty(item.id)}}>+</button>
                  <button onClick={()=>{decQty(item.id)}}>-</button>
                </div>
                <button onClick={()=>{
                  if(confirm('해당 상품을 삭제할까요?')) removeItems(item.id)
                  }}>삭제</button>
              </li>
            )}
            </ul>
            <div className={styles.cart_info}>
              <h3>합계</h3>
              <h4>{totalPrice}</h4>
              <button>주문하기</button>
            </div>
          </div>
        }
    </div>
  )
}