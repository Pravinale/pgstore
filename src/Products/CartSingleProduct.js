import React from 'react';
import './CartSingleProduct.css';

const CartSingleProduct = ({ product, onIncrease, onDecrease, onRemove }) => {
  const { _id, image, title, price, quantity } = product;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  return (
    <div className='cart-item-container'>
       <img src={`${BASE_URL}/${product.image}`} alt={product.title} />
      <div className='item-content'>
        <h1 className='item-name'>{title}</h1>
        <h2 className='item-price'>Rs.{price}</h2>
      </div>
      <div className='item-quantity'>
        <button className='minus' onClick={() => onDecrease(_id)}>-</button>
        <h3 className='qnty'>{quantity}</h3>
        <button className='plus' onClick={() => onIncrease(_id)}>+</button>
      </div>
      <button className='remove-btn' onClick={() => onRemove(_id)}>X</button>
    </div>
  );
};

export default CartSingleProduct;
