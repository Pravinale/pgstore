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
import SignUp from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { UserProvider } from './contexts/userContext';
import AdminPanel from './components/AdminPanel/AdminPanel'
import SingleProductDetails from './pages/SingleProductDetails/SingleProductDetails';


const App = () => {
  return (
    <UserProvider>
    <CartItemContextProvider>
    <CartProvider>
      <SearchProvider>
        <Router basename='/Ecommerce'>
          <SearchConsumer>
            {({ handleSearch }) => (
              <Navbar onSearch={handleSearch}/>
            )}
          </SearchConsumer>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home/:userid' element={<Home />} />
            <Route path='/search-results' element={<SearchResults />} />
            <Route path="/category/:category" element={<CategoryResults/>} />
            <Route path="/product/:id" element={<SingleProductDetails />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/admin' element={<AdminPanel />} />
            
          </Routes>
        </Router>
      </SearchProvider>
    </CartProvider>
    </CartItemContextProvider>
    </UserProvider>
  );
};

const SearchConsumer = SearchContext.Consumer;

export default App;
