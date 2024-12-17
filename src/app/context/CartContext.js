import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const toggleCartItem = (productId) => {
    setCartItems((prev) => {
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

export const useCart = () => useContext(CartContext);
