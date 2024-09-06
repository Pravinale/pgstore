import React, { useEffect, useState } from 'react';
import './Home.css';
import Slider from '../../components/Slider/Slider';
import Footer from '../Footer/Footer';
import Product from '../../Products/Product';
import axios from 'axios';
import { useSearch } from '../../contexts/Search';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('All');
  const { searchTerm } = useSearch();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Fetch products data from the backend
    axios.get(`${BASE_URL}/products`)
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    // Filter products based on selected category and search term
    const filtered = products
      .filter(product => category === 'All' || product.category === category)
      .filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    setFilteredProducts(filtered);
  }, [category, products, searchTerm]);

  const handleCategoryButtonClick = () => {
    // Navigate to CategoryResults page
    navigate(`/category-results`);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className='home'>
        <Slider />
        <div className='home-content'>
          <div className='right-content'>
            <div className='category'>
              <button onClick={handleCategoryButtonClick}>Category Section</button>
            </div>
          </div>
          <div className='left-content'>
            <div className='all-product-section'>
              <h1>All Products</h1>
              <div className='all-products'>
                {filteredProducts.map(product => (
                  <Product key={product._id} propsData={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;

