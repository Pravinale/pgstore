import React, { createContext, useState } from 'react';
import PRODUCTDATA from '../PRODUCTSDATA'

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTDATA);

  const handleSearch = (input) => {
    const searchFiltered = PRODUCTDATA.filter(product => product.title.toLowerCase().includes(input.toLowerCase()));
    setFilteredProducts(searchFiltered);
  };

  const resetProducts = () => {
    setFilteredProducts(PRODUCTDATA);
  };

  return (
    <SearchContext.Provider value={{ searchInput, setSearchInput, filteredProducts, setFilteredProducts, handleSearch, resetProducts  }}>
      {children}
    </SearchContext.Provider>
  );
};



