import { createContext, useContext, useState, useMemo, useEffect } from "react";

// 1. store 생성
const CartContext = createContext(null);

// 2. Provider 생성
export function CartProvider({children}){
  const [cartItems, setCartItems] = useState(()=>{
    const ezShopStorage = localStorage.getItem('cart');
    return ezShopStorage ? JSON.parse(ezShopStorage) : [];
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

  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);


  // const value = useMemo(()=>{return {cartItems, addItem, count}}, [cartItems, count]);
  const value = useMemo(()=>({cartItems, addItem, count}), [cartItems, count]);
  
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