

import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { SearchContext } from '../../contexts/searchContext';
import Product from '../../Products/Product';
import './CategoryResults.css';
import { CartContext } from '../../contexts/showCartContext';
import Cart from '../Cart/Cart';

const CategoryResults = () => {
  const { category } = useParams();
  const navigate = useNavigate(); // Use navigate hook
  const { filteredProducts, resetProducts } = useContext(SearchContext);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [priceRange, setPriceRange] = useState(0);
  const [filteredByPrice, setFilteredByPrice] = useState([]);
  const { showCart } = useContext(CartContext);

  useEffect(() => {
    resetProducts();
  }, [resetProducts]);

  useEffect(() => {
    // Filter products based on category
    const filtered = filteredProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
    setCategoryProducts(filtered);
    setFilteredByPrice(filtered); // Initialize filteredByPrice
  }, [category, filteredProducts, resetProducts]);

  useEffect(() => {
    // Apply price filter
    if (priceRange === 0) {
      setFilteredByPrice(categoryProducts); // Display all products within category
    } else {
      const filteredPrice = categoryProducts.filter(product => product.price <= priceRange);
      setFilteredByPrice(filteredPrice);
    }
  }, [priceRange, categoryProducts]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === 'All') {
      navigate('/'); // Navigate to home if 'All' is selected
    } else {
      navigate(`/category/${selectedCategory}`); // Navigate to selected category
    }
  };

  const handlePriceChange = (e) => {
    const newPriceRange = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  return (
    <div className='category-container'>
      <div className='right-content'>
        <h3>Filters</h3>
        <div className='category'>
          <h1>Category</h1>
          <select value={category} onChange={handleCategoryChange}>
            {/* <option value='All'>All</option> */}
            <option value='Laptop'>Laptop</option>
            <option value='Phone'>Phone</option>
            <option value='ipad'>ipad</option>
            <option value='Airpods'>Airpods</option>
            <option value='Earphone'>Earphone</option>
            <option value='Headphone'>Headphone</option>
          </select>
        </div>

        <div className='category-price-filter'>
          <h1>Price Range</h1>
          <input
            type='range'
            value={priceRange}
            onChange={handlePriceChange}
            min='0'
            max='300000' // Adjust max value as needed
          />
          <h2>Rs.{priceRange}</h2>
        </div>
      </div>

      <div className="category-page">
        <h1>{category} Products</h1>
        <div className="category-products">
          {filteredByPrice.length > 0 ? (
            filteredByPrice.map(product => (
              <Product key={product.id} propsData={product} />
            ))
          ) : (
            <div>No products found in this category.</div>
          )}
        </div>
      </div>

      <div className={`cartPage ${showCart ? 'visible' : 'hidden'}`}>
          <Cart />
    </div>
    </div>
  );
};

export default CategoryResults;
