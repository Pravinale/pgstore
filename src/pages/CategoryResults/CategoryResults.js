import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Product from '../../Products/Product';
import './CategoryResults.css';

const CategoryResults = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 300000]); // [minPrice, maxPrice]
  const { category } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    // Fetch categories from the backend
    axios.get(`${BASE_URL}/categories`)
      .then(response => {
        // Assuming response.data is an array of objects, e.g., [{_id: '1', name: 'Laptop'}, {...}]
        const categoryNames = response.data.map(cat => cat.name);
        setCategories(['All', ...categoryNames]); // Add 'All' option to the categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Fetch products from the backend
    axios.get(`${BASE_URL}/products`)
      .then(response => {
        if (response.data) {
          setProducts(response.data);
          // Set the selected category and filter products
          setSelectedCategory(category || 'All');
          filterProducts(response.data, category || 'All', priceRange);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
        setFilteredProducts([]);
      });
  }, [category]);

  useEffect(() => {
    // Filter products whenever the category or price range changes
    filterProducts(products, selectedCategory, priceRange);
  }, [selectedCategory, priceRange, products]);

  const filterProducts = (productsList, category, priceRange) => {
    const [minPrice, maxPrice] = priceRange;
    const filtered = productsList
      .filter(product =>
        (category === 'All' || product.category === category) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    setFilteredProducts(filtered);
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    filterProducts(products, newCategory, priceRange); // Filter products immediately
  };

  const handlePriceRangeChange = (e) => {
    const newMaxPrice = parseInt(e.target.value);
    setPriceRange([priceRange[0], newMaxPrice]); // Update the max price in the range
    filterProducts(products, selectedCategory, [priceRange[0], newMaxPrice]); // Filter products immediately
  };

  return (
    <div className='category-container'>
      <div className='category-right-content'>
        <div className='category-filter'>
          <h1>Categories</h1>
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className='category-price-filter'>
          <h1>Price Range</h1>
          <input
            type='range'
            min='0'
            max='300000' // Adjust max value as needed
            value={priceRange[1]} // Bind to the max price in the range
            onChange={handlePriceRangeChange}
          />
          <h2>Max Price: Rs.{priceRange[1]}</h2> {/* Display selected max price */}
        </div>
      </div>

      <div className="category-page">
        <div className="category-products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Product key={product._id} propsData={product} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryResults;
