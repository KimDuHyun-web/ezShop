import { createContext, useContext, useState, useMemo, useEffect } from "react";

const STORAGE_KEY = 'cartItems';

// 1. store 생성
const CartContext = createContext(null);

// 2. Provider 생성
export function CartProvider({children}){
  const [cartItems, setCartItems] = useState(()=>{
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  //방바구니 상품 추가 함수
  const addItem = (item)=>{
    setCartItems(prev=>{
      const i = prev.findIndex((v)=>v.id === item.id); // 일치 상품의 index 번호
      if(i === -1) return [...prev,{...item,qty: 1 }] // 새상품 추가
      const next = [...prev];
      next[i] = {...next[i], qty:next[i].qty + 1}
      return next;
    })
  }
  // 잡바구니 개수
  const count = useMemo(
    ()=>cartItems.reduce((sum,n)=>sum + n.qty,0), [cartItems]
  ); // 장바구니 상품 목록 변경되면, 수량 다시 계산

  // 장바구니 페이지 상품 개수 증가
  const inQty = (id)=>{
    setCartItems(prev=>
      prev.map(p=>p.id === id ? {...p, qty:p.qty + 1} :p)
    )
  }
  // 장바구니 페이지 상품 개수 차감
  const decQty = (id)=>{
    setCartItems(prev=>
      prev.map(p=>p.id === id ? {...p, qty:p.qty - 1} :p).filter(p=>p.qty>0)
    )
  }
  // 개별 상품 삭제
  const removeItems = (id)=>{
    setCartItems(prev=>
      prev.filter(p=>p.id !== id)
    )
  }
  // 전체 비우기
  const clearCart = ()=>{
    setCartItems([]);
  }
  // 총 합계
  // 대상.reduce((acc, item)=>할일, 0)
  const totalPrice = useMemo(()=>{
    return cartItems.reduce((acc, item)=>{
      const price = Number(item.price ?? 0);
      return acc + item.qty*price;
    }, 0)
  }, cartItems)

  
  // 장바구니 항목 변경 시 로컬스토리지에 저장
  useEffect(()=>{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);


  // const value = useMemo(()=>{return {cartItems, addItem, count}}, [cartItems, count]);
  const value = useMemo(()=>({cartItems, addItem, count, inQty, decQty, removeItems, clearCart, totalPrice}), [cartItems, count, totalPrice]);
  
  return (
  <CartContext.Provider value={value}>
    {children}
  </CartContext.Provider>
  )
}

export function useCart(){
  const ctx = useContext(CartContext)
  if(!ctx) throw new Error('useCart는 cartProvider 외부에서는 사용 불가')
  return ctx;
}