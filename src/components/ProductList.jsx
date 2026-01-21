import { useEffect, useMemo, useState } from 'react'
import styles from './ProductList.module.css'
import ProductCard from './ProductCard';

export default function ProductList({ keyword }) {
  const [all, setAll] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredArr, setFilteredArr] = useState([]);

  const PRICE_RANGES = [
    { key: "all", label: "전체" },
    { key: "under10", label: "10만원 이하" },
    { key: "10to50", label: "10-50만원" },
    { key: "over50", label: "50만원 이상" },
  ];

  const SORT_OPTIONS = [
    { key: "popular", label: "인기순" },          // 데모: id DESC
    { key: "priceAsc", label: "낮은 가격순" },
    { key: "priceDesc", label: "높은 가격순" },
    { key: "new", label: "최신순" },              // 데모: id DESC (= popular와 동일)
  ];


  //카테고리 목록 출력
  const categories = useMemo(()=>[...new Set(all.map(p=>p.category))], [all]);

  //카테고리 목록 출력
  const brands = useMemo(()=>[...new Set(all.map(b=>b.brand).filter(b=>b !== undefined))],[all]);
  // console.log(brands);

  //필터링(filtering)
  //정렬(sorting)

  //페이지네이션
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8; // 페이지당 출력할 상품 개수
  const totalCount = filteredArr.length;
  const pagenationCount = Math.ceil(totalCount / PAGE_SIZE);

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pagedData = filteredArr.slice(start, end); // 추출된 상품

  const [pageGp, setPageGp] = useState(1); // 페이지네이션 그룹 번호
  const PAGEGP_SIZE = 5;
  const pageGpCount = Math.ceil(pagenationCount / PAGEGP_SIZE);
  const groupStart = (pageGp - 1) * PAGEGP_SIZE + 1;
  const groupEnd = Math.min(groupStart + (PAGEGP_SIZE - 1), pagenationCount);

  let pageGroupArr = [];

  for (let i = groupStart; i <= groupEnd; i++) {
    pageGroupArr.push(i);
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true); // 로딩 중 , skeleton UI 출력
        const res = await fetch("/data/product.json");
        if (!res.ok) throw new Error('상품을 조회하지 못했습니다.');
        const data = await res.json();
        // console.log(data.products);
        if (alive) setAll(data.products); // alive 참이면 상품 목록 생성
      } catch (e) {
        setError(e.message);
      } finally {
        if (alive) setLoading(false); // 로딩완료, skeleton UI 미출력
      }
    })()
    return () => {
      alive = false;
    }
  }, []);

  useEffect(() => {
    if (!keyword || keyword.trim() === '') {
      setFilteredArr(all);
      setPage(1);
      setPageGp(1);
      return;
    }
    const kw = keyword.trim().toLowerCase();
    const result = all.filter(p => p.title.toLowerCase().includes(kw))
    setFilteredArr(result);
    setPage(1);
    setPageGp(1);
  }, [keyword, all]); // 상품정보 및 키워드 변경시 실행

  // console.log(all);

  if (error) {
    return <p>{error}</p>
  }

  return (
    <div className={`container ${styles.productWrapper}`}>
      <aside>
        <h2>필터</h2>
        <div className={styles.filterGroup}>
          <div className={styles.filter} id="category">
            <h3>카테고리</h3>
            <div className={styles.fields}>
              <div className={styles.field}>
                <input type="radio" id="category_all" name="category" value="all" />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1Z"
                    stroke="#D1D5DB" strokeWidth="2" />
                </svg>
                <label htmlFor="category_all">전체</label>
              </div>
              {
                categories.map((c)=>
                  <div className={styles.field} key={c}>
                    <input type="radio" id={c} name="category" value={c} />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1Z"
                        stroke="#D1D5DB" strokeWidth="2" />
                    </svg>
                    <label htmlFor={c}>{c}</label>
                  </div>
                )
              }
            </div>

          </div>
          <div className={styles.filter} id="price">
            <h3>가격대</h3>
            <div className={styles.fields}>
              {
                PRICE_RANGES.map((r) =>
                  <div className={styles.field} key={r.key}>
                    <input type="radio" id={`price_${r.key}`} name="price" value={r.label} />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1Z"
                        stroke="#D1D5DB" strokeWidth="2" />
                    </svg>
                    <label htmlFor={`price_${r.key}`}>{r.label}</label>
                  </div>
                )
              }

            </div>
          </div>
          <div className={styles.filter} id="brand">
            <h3>브랜드</h3>
            <div className={styles.fields}>
              <div className={styles.field}>
                <input type="radio" id="brand_all" name="brand" value="all" />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1Z"
                    stroke="#D1D5DB" strokeWidth="2" />
                </svg>
                <label htmlFor="brand_all">전체</label>
              </div>
              {
                brands.map((b)=>
                  <div className={styles.field} key={b}>
                    <input type="radio" id={b} name="brand" value={b} />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1Z"
                        stroke="#D1D5DB" strokeWidth="2" />
                    </svg>
                    <label htmlFor={b}>{b}</label>
                  </div>
                )
              }
            </div>
          </div>
          <button id="resetFilter">필터 초기화</button>
        </div>
      </aside>
      <section className={styles.productListWrapper}>
        <header className={styles.productListHeader}>
          <h2>인기상품</h2>
          <div className={styles.sort}>
            <span>총 <span>{filteredArr.length}</span>개 상품</span>
            <select name="" id="sort">
              <option value="">정렬 옵션을 선택해주세요.</option>
              {
                SORT_OPTIONS.map((o) =><option key={o.key} value={o.key}>{o.label}</option>)
              }
            </select>

          </div>
        </header>

        {loading ?
          <p>로딩중</p>
          :
          <ul className={styles.productList}>
            {
              pagedData.map(p => <ProductCard key={p.id} data={p} />)
            }
          </ul>
        }

        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            id="prevBtn"
            disabled={pageGp === 1}
            onClick={() => {
              setPageGp(prev => prev - 1);
              const nextPage = (pageGp - 2) * 5 + 1;
              setPage(nextPage);
            }}
          >
            <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.87883 4.24L5.1701 7.53333L4.23735 8.48L0 4.24L4.23735 0L5.1701 0.946667L1.87883 4.24Z"
                fill="#6B7280" />
            </svg>
          </button>
          <div id="numbers" className={styles.numbers}>
            {
              pageGroupArr.map((i) =>
                <button key={i} className={`${styles.pageBtn} ${page === i ? styles.active : ''}`} onClick={() => { setPage(i) }}>{i}</button>
              )
            }
          </div>
          <button
            className={styles.pageBtn}
            id="nextBtn"
            disabled={pageGp === pageGpCount}
            onClick={() => {
              setPageGp(prev => prev + 1)
              const nextPage = pageGp * 5 + 1;
              setPage(nextPage);
            }}
          >
            <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.29128 4.24L0 0.946667L0.93275 0L5.1701 4.24L0.93275 8.48L0 7.53333L3.29128 4.24Z"
                fill="#6B7280" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  )
}