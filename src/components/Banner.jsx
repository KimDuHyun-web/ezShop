import styles from './Banner.module.css'

export default function Banner() {
  return (
    <section className={styles.banner}>
      <div className="container">
        <h2>새로운 시즌 특별한 할인</h2>
        <p>최대 70% 할인된 프리미엄 상품들을 만나보세요</p>
        <a href="" className="btn big">지금 쇼핑하기</a>
      </div>
    </section>
  )
}