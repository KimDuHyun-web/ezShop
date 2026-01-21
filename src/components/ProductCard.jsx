import styles from './ProductCard.module.css';
import { useCart } from '../cart/CartContext';

export default function ProductCard({data}) {
  const {addItem} = useCart();
  const id = data.id;
  const title = data.title;
  return (
    <li className={styles.item}>
      <img src={data.thumbnail} alt={data.title} />
      <div className={styles.desc}>
        <h3>{data.title}</h3>
        <p>{data.brand}</p>
        <div className={styles.footer}>
          <span className="price">{data.price}</span>
          <button className="btn sm" onClick={()=>{addItem({id, title})}}>
            <img src="images/icon_add_to_cart.svg" alt="" />
          </button>
        </div>
      </div>
    </li>
  )
}