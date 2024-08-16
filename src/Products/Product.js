import React, { useState, useContext } from 'react';
import './Product.css';
import { CartItemContext } from '../contexts/cartItemContext';
// import { useNavigate } from 'react-router-dom';
import Wrapper from '../components/Wrapper/Wrapper';

const Product = (props) => {
  const { id, title, price, image, stock } = props.propsData;
  const { addToCart } = useContext(CartItemContext);
  const [showDetails, setShowDetails] = useState(false);
  // const navigate = useNavigate();

  const handleAddToCart = () => {
    if (stock > 0) {
      addToCart({ id, title, price, image });
    }
  };

  // const handleProductClick = () => {
  //   navigate(`/product/${id}`);
  // };

  const handleProductClick = () => {
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      <div className='product-card' key={id} onClick={handleProductClick}>

        <div className='product-img'>
          <img src={image} alt='product' />
        </div>

        <div className='product-content'>
          <div className='product-title'>{title}</div>
          <div className='product-price'>Rs.{price}</div>
        </div>

        {stock > 0 ? (
          <div className='add-to-cart-btn'>
            <button className='addToCartBtn' onClick={(e) => {
              e.stopPropagation(); // Prevent navigation on button click
              handleAddToCart();
            }}>
              Add To Cart
            </button>
          </div>
        ) : (
          <div className='out-of-stock'>
            <span>Out of Stock</span>
          </div>
        )}
      </div>

      {showDetails && (
        <Wrapper productId={id} onClose={closeDetails} />
      )}
    </>
  );
};

export default Product;
