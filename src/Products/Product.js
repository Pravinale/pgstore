import React, { useContext } from 'react'
import './Product.css'
import { CartItemContext } from '../contexts/cartItemContext';


const Product = (props) => {

    const {id, title, price, image} = props.propsData
    const { addToCart } = useContext(CartItemContext);

    const handleAddToCart = () => {
        addToCart({ id, title, price, image }); 
      };

  return (
    <>
        <div className='product-card' key={id} >

            <div className='product-img'>
                <img src={image} alt='image'/>
            </div>

            <div className='product-content'>
                <div className='product-title'>{title}</div>
                <div className='product-price'>Rs.{price}</div>
            </div>

            <div className='add-to-cart-btn'>
                <button className='addToCartBtn' onClick={handleAddToCart}>Add To Cart</button></div>
            </div>
    </>
  )
}

export default Product