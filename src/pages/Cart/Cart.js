import React, { useContext } from 'react';
import './Cart.css';
import CartSingleProduct from '../../Products/CartSingleProduct';
import { CartContext } from '../../contexts/CartContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({onClose}) => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, checkout } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const grandTotal = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      alert('Login First');
      navigate('/login');
    } else if (cart.length === 0) {
      alert('Add any product');
    } else {
      // await checkout(); // Call checkout to update stock
      // clearCart(); // Clear the cart after checkout
      if (onClose) {
        onClose(); // Close the cart
      }
      navigate('/checkout', { state: { cartItems: cart, grandTotal } });
    }
  };

  return (
    <div className='cart-container'>
      <div className='cart-head'>
        <h1>Cart</h1>
      </div>

      <div className='cart-body'>
        {cart.map((product) => (
          <CartSingleProduct
            key={product._id}
            product={product}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />
        ))}
      </div>

      <div className='cart-footer'>
        <div className='grand-total'>
          <h1>Grand Total:</h1>
          <h3>Rs.{grandTotal}</h3>
        </div>
        <div className='checkout'>
          <button className='checkout-btn' onClick={handleCheckout}>
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
