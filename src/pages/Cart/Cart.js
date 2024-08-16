import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import { FaRectangleXmark } from 'react-icons/fa6';
import CartSingleProduct from '../../Products/CartSingleProduct';
import { CartItemContext } from '../../contexts/cartItemContext';
import { CartContext } from '../../contexts/showCartContext';
import { UserContext } from '../../contexts/userContext';

const Cart = () => {
  const { cartItems } = useContext(CartItemContext);
  const { toggleCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // Use the user object from UserContext
  const navigate = useNavigate();

  // Calculate Grand Total Price
  const getTotalPrice = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const GrandTotal = getTotalPrice();

  const handleCheckout = () => {
    if (!user) {
      // If user is not logged in, navigate to the login page
      navigate('/login');
      alert('Login first')
    } else {
      // Handle checkout logic here, e.g., navigate to a checkout page
      console.log('Proceeding to checkout...');
      alert('Checkout Successfully!');
      navigate(`/home/${user.id}`); // Navigate to user's home page or checkout page
    }
  };

  return (
    <>
      <div className='cart-container'>
        <div className='cart-head'>
          <h1>Cart</h1>
          <div className='cart-close' onClick={toggleCart}>
            <i><FaRectangleXmark/></i>
          </div>
        </div>

        <div className='cart-body'>
          {cartItems.map(item => (
            <CartSingleProduct key={item.id} item={item}/>
          ))}
        </div>
        
        <div className='cart-footer'>
          <div className='grand-total'>
            <h1>Grand Total:</h1>
            <h3>Rs.{GrandTotal}</h3>
          </div>
          <div className='checkout'>
            <button className='checkout-btn' onClick={handleCheckout}>Checkout Now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
