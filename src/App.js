import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/showCartContext';
import { SearchProvider, SearchContext } from './contexts/searchContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import SearchResults from './pages/SearchResults/SearchResults';
import AboutUs from './pages/AboutUs/AboutUs';
import { CartItemContextProvider } from './contexts/cartItemContext';
import CategoryResults from './pages/CategoryResults/CategoryResults';
import Slider from './components/Slider/Slider';


const App = () => {
  return (
    <CartItemContextProvider>
    <CartProvider>
      <SearchProvider>
        <Router>
          <SearchConsumer>
            {({ handleSearch }) => (
              <Navbar onSearch={handleSearch}/>
            )}
          </SearchConsumer>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search-results' element={<SearchResults />} />
            <Route path="/category/:category" element={<CategoryResults/>} />
            <Route path='/about' element={<AboutUs />} />
          </Routes>
        </Router>
      </SearchProvider>
    </CartProvider>
    </CartItemContextProvider>
  );
};

const SearchConsumer = SearchContext.Consumer;

export default App;
