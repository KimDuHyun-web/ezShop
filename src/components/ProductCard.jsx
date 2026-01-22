import styles from './ProductCard.module.css';
import { useCart } from '../cart/CartContext';

export default function ProductCard({data}) {
  const {addItem} = useCart();
  const id = data.id;
  const title = data.title;
  const priceKRW =  Math.floor(data.price * 1465).toLocaleString("ko-KR");
  return (
    <li className={styles.item}>
      <img src={data.thumbnail} alt={data.title} />
      <div className={styles.desc}>
        <h3>{data.title}</h3>
        <p>{data.brand}</p>
        <p>평점: {data.rating}</p>
        <div className={styles.footer}>
          <span className="price">{priceKRW}원</span>
          <button className="btn sm" onClick={()=>{addItem({id, title})}}>
            <img src="images/icon_add_to_cart.svg" alt="" />
          </button>
        </div>
      </div>
    </li>
  )
}