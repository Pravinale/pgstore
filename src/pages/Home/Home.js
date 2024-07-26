import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
import './Home.css';
import Product from '../../Products/Product';
import Cart from '../Cart/Cart';
import { CartContext } from '../../contexts/showCartContext';
import { SearchContext } from '../../contexts/searchContext';
import Slider from '../../components/Slider/Slider';
import Footer from '../Footer/Footer';

const Home = () => {
  const { showCart } = useContext(CartContext);
  const { filteredProducts, resetProducts } = useContext(SearchContext);
  const [category, setCategory] = useState('All');
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    resetProducts();
  }, [resetProducts]);

  const handleCategory = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory !== 'All') {
      navigate(`/category/${selectedCategory}`); // Use navigate function
    }
  };

  // const clearFilter = () => {
  //   setCategory('All');
  //   resetProducts();
  //   window.location.reload();
  // };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filteredProductsDisplay = () => {
    let displayedProducts = filteredProducts;

    if (category !== 'All') {
      displayedProducts = displayedProducts.filter(product => product.category === category);
    }

    displayedProducts = shuffleArray(displayedProducts.slice(0, 8));

    return displayedProducts.map(product => (
      <Product key={product.id} propsData={product} />
    ));
  };

  const topSellProductsDisplay = () => {
    const shuffledProducts = shuffleArray([...filteredProducts]);
    const topSellProducts = shuffledProducts.slice(0, 6);

    return topSellProducts.map(product => (
      <Product key={product.id} propsData={product} />
    ));
  };

  const popularProductsDisplay = () => {
    const shuffledProducts = shuffleArray([...filteredProducts]);
    const popularProducts = shuffledProducts.slice(0, 4);

    return popularProducts.map(product => (
      <Product key={product.id} propsData={product} />
    ));
  };

  return (
    <>
      <div className='home'>
        <Slider />
        <div className='home-content'>
          <div className='right-content'>
            <h3>Filters</h3>

            <div className='category'>
              <h1>Category</h1>
              <select value={category} onChange={handleCategory}>
                <option value='All'>All</option>
                <option value='Laptop'>Laptop</option>
                <option value='Phone'>Phone</option>
                <option value='ipad'>ipad</option>
                <option value='Airpods'>Airpods</option>
                <option value='Earphone'>Earphone</option>
                <option value='Headphone'>Headphone</option>
              </select>
            </div>

            {/* <button className='reset-btn' onClick={clearFilter}>Reset All Filters</button> */}
          </div>

          <div className='left-content'>
            <div className='our-product'>
              <h1>Our Products</h1>
            </div>
            <div className='top-sell-section'>
              <h1>Top Sell Products</h1>
              <div className='top-sell-products'>
                {topSellProductsDisplay()}
              </div>
            </div>

            <div className='popular-product-section'>
              <h1>Popular Products</h1>
              <div className='popular-product'>
                {popularProductsDisplay()}
              </div>
            </div>

            <div className='all-product-section'>
              <h1>All Products</h1>
              <div className='all-products'>
                {filteredProducts.length > 0 ? (
                  filteredProductsDisplay()
                ) : (
                  <div>There are no products matching your criteria.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`cartPage ${showCart ? 'visible' : 'hidden'}`}>
          <Cart />
        </div>
    
      </div>
      <Footer />
    </>
  );
};

export default Home;
