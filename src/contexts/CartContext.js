import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const localStorageCartItem = JSON.parse(localStorage.getItem('cartitem')) || [];
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [cart, setCart] = useState(Array.isArray(localStorageCartItem) ? localStorageCartItem : []);

  // Store changes in a separate state for stock updates
  const [stockChanges, setStockChanges] = useState([]);

  useEffect(() => {
    localStorage.setItem('cartitem', JSON.stringify(cart));
  }, [cart]);

  const updateProductStock = async (productId, quantityChange) => {
    try {
      await axios.put(`${BASE_URL}/products/${productId}/stock`, { quantityChange });
    } catch (error) {
      console.error('Error updating product stock:', error);
    }
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);

      if (existingProduct) {
        if (existingProduct.quantity >= product.stock) {
          alert('Cannot add more items. Out of stock.');
          return prevCart;
        }
        // Update local stock change
        setStockChanges((prevChanges) => [...prevChanges, { productId: product._id, quantityChange: -1 }]);
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        if (product.stock <= 0) {
          alert('Product out of stock.');
          return prevCart;
        }
        // Update local stock change
        setStockChanges((prevChanges) => [...prevChanges, { productId: product._id, quantityChange: -1 }]);
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const product = prevCart.find((item) => item._id === id);
      if (product) {
        // Update local stock change
        setStockChanges((prevChanges) => [...prevChanges, { productId: id, quantityChange: product.quantity }]);
      }
      return prevCart.filter((item) => item._id !== id);
    });
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id) {
          if (item.quantity >= item.stock) {
            alert('Cannot increase quantity. Out of stock.');
            return item;
          }
          // Update local stock change
          setStockChanges((prevChanges) => [...prevChanges, { productId: id, quantityChange: -1 }]);
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === id && item.quantity > 1) {
          // Update local stock change
          setStockChanges((prevChanges) => [...prevChanges, { productId: id, quantityChange: 1 }]);
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkout = async () => {
    // Update stock changes in the database
    for (const change of stockChanges) {
      await updateProductStock(change.productId, change.quantityChange);
    }
    // Clear stock changes after checkout
    setStockChanges([]);
    // Additional checkout logic can be added here
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

