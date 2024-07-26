import React, { useContext } from 'react';
import './CartSingleProduct.css';
import { CartItemContext } from '../contexts/cartItemContext';

const CartSingleProduct = ({ item }) => {
  const { updateQuantity } = useContext(CartItemContext);

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const totalItemPrice = item.price * item.quantity

  return (
    <div className='cart-item-container'>
      <img src={item.image} alt={item.title} />
      <div className='item-content'>
        <h1 className='item-name'>{item.title}</h1>
        <h2 className='item-price'>Rs.{totalItemPrice}</h2>
      </div>
      <div className='item-quantity'>
        <button className='minus' onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
        <h3 className='qnty'>{item.quantity}</h3>
        <button className='plus' onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
      </div>
    </div>
  );
};

export default CartSingleProduct;
