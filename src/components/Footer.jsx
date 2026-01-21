import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer>
      <div className={styles.container}>
        <p className={styles.copyright}>&copy; 2024 ShopMall. All rights reserved.</p>
        <ul className={styles.cardList}>
          <li><a href=""><img src="images/footer_card_visa.svg" alt="visa card"/></a></li>
          <li><a href=""><img src="images/footer_card_master.svg" alt="master card"/></a></li>
          <li><a href=""><img src="images/footer_card_paypal.svg" alt="paypal"/></a></li>
        </ul>
      </div>
    </footer>
  )
}