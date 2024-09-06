import React from 'react';
import './Wrapper.css'; // Custom CSS for the wrapper
import SingleProductDetails from '../../pages/SingleProductDetails/SingleProductDetails';

const Wrapper = ({ productId, onClose }) => {
  return (
    <div className="single-product-wrapper">
      <div className="single-product-content">
        <SingleProductDetails id={productId} />     
      </div>
      <div className='close-btn'>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Wrapper;
