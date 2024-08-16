import React, { useContext } from 'react';
import './SingleProductDetails.css';
import PRODUCTDATA from '../../PRODUCTSDATA'; // Import your products data
import { CartItemContext } from '../../contexts/cartItemContext'; // Import your Cart Context

const SingleProductDetails = ({ id }) => {
  const product = PRODUCTDATA.find((p) => p.id === parseInt(id));

  const { addToCart } = useContext(CartItemContext);

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      });
    }
  };

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className='single-product-details'>
      <div className='left'>
        <img src={product.image} alt={product.title} />
      </div>
      <div className='right'>
        <h1>{product.title}</h1>
        <div className='desc'>
            <p>{product.desc}</p>
        </div>

        <p className='price'>Price: <span>Rs.{product.price}</span></p>
        <div className='btn'>
            {product.stock > 0 ? (
              <button className='add-to-cart-btn' onClick={handleAddToCart}>
                Add to Cart
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
