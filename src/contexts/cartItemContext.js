import React, { createContext, useState } from 'react';

export const CartItemContext = createContext(null);

export const CartItemContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === item.id 
        ? { ...cartItem, quantity: cartItem.quantity + 1 } 
        : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== id));
    } else {
      setCartItems(cartItems.map(cartItem => 
        cartItem.id === id 
        ? { ...cartItem, quantity: newQuantity } 
        : cartItem
      ));
    }
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };


  return (
    <CartItemContext.Provider value={{ cartItems, addToCart, updateQuantity, getTotalQuantity }}>
      {props.children}
    </CartItemContext.Provider>
  );
};
