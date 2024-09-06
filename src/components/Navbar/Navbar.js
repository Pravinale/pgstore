import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FaCartShopping, FaBars } from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import Logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/AuthContext';
import { useSearch } from '../../contexts/Search';
import { CartContext } from '../../contexts/CartContext'; // Import CartContext
import Cart from '../../pages/Cart/Cart';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const { setSearchTerm } = useSearch();
    const { cart } = useContext(CartContext); // Access the cart from CartContext

    const totalItems = cart.reduce((total, product) => total + product.quantity, 0); // Calculate total number of items

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleCartToggle = () => {
        setCartOpen(!cartOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/home');
    };

    const handleSearch = () => {
        if (localSearchTerm.trim()) { // Only execute search if term is not empty
            setSearchTerm(localSearchTerm); // Update search term in context
            navigate('/search', { state: { searchTerm: localSearchTerm } });
        }
        setLocalSearchTerm(''); // Clear the search input field
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(); // Trigger search when Enter key is pressed
        }
    };

    const navigateToHome = () => {
        setSearchTerm(''); // Clear search term in context
        navigate('/home');
    };

    return (
        <>
            <div className='navbar'>
                <Link to='/home' className='logo' onClick={navigateToHome}><img src={Logo} alt='logo' /></Link>

                <div className='search'>
                    <input
                        className='search-field'
                        type='text'
                        placeholder='Search items'
                        value={localSearchTerm}
                        onChange={(e) => setLocalSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown} // Add keydown event handler
                    />
                    <button className='search-btn' onClick={handleSearch}>
                        Search
                    </button>
                </div>

                <div className='right-nav'>
                    <div className={`navlinks ${menuOpen ? 'show' : ''}`}>

                            <div className='homw-about'>
                                <li><Link to='/home' onClick={navigateToHome}>Home</Link></li>
                                <li><Link to='/about'>About Us</Link></li>
                            </div>

                        {isAuthenticated ? (
                            <div className='user-section'>
                                {user.role === 'admin' && (
                                        <li><Link to='/admin' >Admin</Link></li>
                                )}
                                <li><Link to='/dashboard'>Dashboard</Link></li>
                                <div className='logout'>
                                    <FaUserCircle className='user-icon' />
                                    <button onClick={handleLogout}>Logout</button>

                                </div>
                            </div>
                        ) : (
                            <div className='signup-login'>
                                <li><Link to='/signup'>Sign Up</Link></li>
                                <li><Link to='/login'>Login</Link></li>
                            </div>
                        )}

                    </div>

                    <div className='mobile-menu-icon' onClick={handleMenuToggle}>
                        <FaBars />
                    </div>

                    <div className='cart-icon'>
                        <button className='cart' onClick={handleCartToggle}>
                            <i><FaCartShopping /></i>
                            {totalItems > 0 && (
                                <span className='cart-count'>{totalItems}</span> // Display total items as a badge
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {menuOpen && (
                <div className='mobile-nav'>
                    <li><Link to='/home' onClick={navigateToHome}>Home</Link></li>
                    <li><Link to='/about' onClick={handleMenuToggle}>About Us</Link></li>
                    {isAuthenticated ? (
                        <div className='user-section'>
                            {user.role === 'admin' && (
                                <li><Link to='/admin' onClick={handleMenuToggle}>Admin</Link></li>
                            )}
                            <li><Link to='/dashboard'>Dashboard</Link></li>
                                <div className='logout'>
                                    <FaUserCircle className='user-icon' />
                                    <button onClick={handleLogout}>Logout</button>
                                </div>
                        </div>
                    ) : (
                        <div className='signup-login'>
                            <li><Link to='/signup' onClick={handleMenuToggle}>Sign Up</Link></li>
                            <li><Link to='/login' onClick={handleMenuToggle}>Login</Link></li>
                        </div>
                    )}
                </div>
            )}

            {cartOpen && <Cart />}
        </>
    );
};

export default Navbar;
