import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const toggleCartItem = (productId) => {
    setCartItems((prev) => {
      console.log('Our previous array: ', prev);
      const exists = prev.includes(productId);
      return exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, toggleCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};