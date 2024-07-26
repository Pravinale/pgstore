import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false);

    const toggleCart = () => {
        setShowCart(!showCart)
    };

    return (
    <CartContext.Provider value={{toggleCart, showCart}}>
        {children}
    </CartContext.Provider>
    )
}

