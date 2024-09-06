import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchResults.css';
import Product from '../../Products/Product';
import axios from 'axios';
import {Link} from 'react-router-dom'

const SearchResults = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const location = useLocation();
  const { searchTerm } = location.state || {}; // Retrieve search term from state
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300000]); // [minPrice, maxPrice]

  useEffect(() => {
    // Fetch product data from the backend
    axios.get(`${BASE_URL}/products`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on search term and price range
    filterProducts(products, searchTerm, priceRange);
  }, [searchTerm, products, priceRange]);

  const filterProducts = (productsList, searchTerm, priceRange) => {
    const [minPrice, maxPrice] = priceRange;
    const filtered = productsList.filter(product =>
      product.title.toLowerCase().includes(searchTerm?.toLowerCase() || '') &&
      product.price >= minPrice &&
      product.price <= maxPrice
    );
    setFilteredProducts(filtered);
  };

  const handlePriceRangeChange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    setPriceRange([priceRange[0], newMaxPrice]); // Update the max price in the range
  };

  return (
    <div className='search-result-container'>
      <div className='price-filter'>
        <div className='category'>
            <button><Link to='/category-results'>Go To Category Section</Link></button>
        </div>
          <h1>Price Range</h1>
          <input
            type='range'
            min='0'
            max='300000'
            value={priceRange[1]}
            onChange={handlePriceRangeChange}
          />
          <h2>Max Price: Rs.{priceRange[1]}</h2>
      </div>
      <div className='search-results'>
        {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Product key={product._id} propsData={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
      </div>
    </div>
  );
};

export default SearchResults;
