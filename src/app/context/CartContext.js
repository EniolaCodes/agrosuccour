import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const toggleCartItem = (productId) => {
    setCartItems((prevCartItems) => {
      if (prevCartItems.includes(productId)) {
        return prevCartItems.filter((id) => id !== productId); // Remove the item
      }
      return [...prevCartItems, productId]; // Add the item
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, toggleCartItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
