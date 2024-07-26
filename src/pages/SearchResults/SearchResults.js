import React, { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../contexts/searchContext';
import Product from '../../Products/Product';
import './SearchResults.css';
import { CartContext } from '../../contexts/showCartContext';
import Cart from '../Cart/Cart';


const SearchResults = () => {
  const { filteredProducts } = useContext(SearchContext);
  const [priceRange, setPriceRange] = useState(0);
  const [filteredByPrice, setFilteredByPrice] = useState([]);
  const { showCart } = useContext(CartContext);

  // Initialize filteredByPrice with all products initially
  useEffect(() => {
    setFilteredByPrice(filteredProducts);
  }, [filteredProducts]);

  const handlePriceChange = (e) => {
    const newPriceRange = parseInt(e.target.value);
    setPriceRange(newPriceRange);

    // Filter products based on the new price range
    if (newPriceRange === 0) {
      setFilteredByPrice(filteredProducts); // Display all products
    } else {
      const filteredPrice = filteredProducts.filter((product) => product.price <= newPriceRange);
      setFilteredByPrice(filteredPrice);
    }
  };

  return (
    <div className='search-result-container'>
      <div className='price-filter'>
        <h1>Price Range</h1>
        <input
          type='range'
          value={priceRange}
          onChange={handlePriceChange}
          min='0'
          max='300000'
        />
        <h2>Rs.{priceRange}</h2>
      </div>
      <div className='search-results'>
        {filteredByPrice.length > 0 ? (
          filteredByPrice.map((product) => (
            <Product key={product.id} propsData={product} />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>

      <div className={`cartPage ${showCart ? 'visible' : 'hidden'}`}>
          <Cart />
    </div>
    </div>
  );
};

export default SearchResults;


