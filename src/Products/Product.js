import React, { useContext, useState } from 'react';
import './Product.css';
import Wrapper from '../components/Wrapper/Wrapper';
import { CartContext } from '../contexts/CartContext'

const Product = ({ propsData }) => {
    const { _id, title, price, image, stock } = propsData || {};
    const [showDetails, setShowDetails] = useState(false);
    const { addToCart } = useContext(CartContext);
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const handleProductClick = () => {
        setShowDetails(true);
    };

    const closeDetails = () => {
        console.log('Close button clicked');
        setShowDetails(false);
    };

    if (!propsData) {
        return <p>No product data available</p>;
    }

    const handleAddToCart = () => {
        addToCart(propsData);
    };

    return (
        <>
            <div className='product-card'>
                <div className='product-img' onClick={handleProductClick}>
                    <img src={`${BASE_URL}/${image}`} alt={title} /> {/* Display the image */}
                </div>
                <div className='product-content'>
                    <div className='product-title'>{title}</div>
                    <div className='product-price'>Rs.{price}</div>
                </div>
                {stock > 0 ? (
                    <div className='add-to-cart-btn'>
                        <button className='addToCartBtn' onClick={handleAddToCart}>
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
                <Wrapper productId={_id} onClose={closeDetails} />
            )}
        </>
    );
};

export default Product;
