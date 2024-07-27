import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { CartContext } from '../../contexts/showCartContext';
import { CartItemContext } from '../../contexts/cartItemContext';
import { SearchContext } from '../../contexts/searchContext';
import { FaCartShopping, FaBars  } from 'react-icons/fa6';
import Logo from '../../assets/logo.png'

const Navbar = () => {
  const { toggleCart } = useContext(CartContext);
  const { getTotalQuantity } = useContext(CartItemContext);
  const [searchInput, setSearchInput] = useState('');
  const { handleSearch } = useContext(SearchContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchInput.trim() !== '') {
      handleSearch(searchInput);
      setSearchInput('');
      navigate('/search-results');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className='navbar'>
        <Link to='./' className='logo'><img src={Logo} alt='logo'/></Link>

        <div className='search'>
          <input
            className='search-input'
            type='text'
            placeholder='Search items'
            value={searchInput}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
          />
          <button className='search-btn' onClick={handleSearchClick}>Search</button>
        </div>

        <div className='right-nav'>
          <div className={`navlinks ${menuOpen ? 'show' : ''}`}>
            <li><Link to='./'>Home</Link></li>
            <li><Link to='./about'>About Us</Link></li>
          </div>

          <div className='mobile-menu-icon' onClick={handleMenuToggle}>
            <FaBars />
          </div>

          <div className='cart-icon'>
            <button className='cart' onClick={toggleCart}>
              <i><FaCartShopping /></i>
              <span className='total-quantity'>{getTotalQuantity()}</span>
            </button>
            
          </div>

        </div>
      </div>
      {menuOpen && (
        <div className='mobile-nav'>
          <li><Link to='./' onClick={handleMenuToggle}>Home</Link></li>
          <li><Link to='./about' onClick={handleMenuToggle}>About Us</Link></li>
        </div>
      )}
    </>
  );
};

export default Navbar;
