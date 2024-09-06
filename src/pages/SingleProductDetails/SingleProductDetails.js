import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './SingleProductDetails.css';
import { CartContext } from '../../contexts/CartContext'; // Import CartContext

const SingleProductDetails = ({ id }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext); // Access addToCart function from CartContext

  useEffect(() => {
    // Fetch product details by ID
    axios.get(`${BASE_URL}/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      quantity: 1, // Default quantity when adding to the cart
    };
    addToCart(productToAdd); // Use addToCart from CartContext
  };

  return (
    <div className='single-product-details'>
      <div className='left'>
  
        <img src={`${BASE_URL}/${product.image}`} alt={product.title} />
      </div>
      <div className='right'>
        <h1>{product.title}</h1>
        <div className='desc'>
          <p>{product.description}</p>
        </div>

        <p className='price'>Price: <span>Rs.{product.price}</span></p>

        <div className='btn'>
          {product.stock > 0 ? (
            <button className='addToCartBtn' onClick={handleAddToCart}>
              Add To Cart
            </button>
          ) : (
            <button className='add-to-cart-btn' disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductDetails;


