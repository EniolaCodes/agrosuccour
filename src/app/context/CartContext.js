import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const fetchUserIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip; // User's public IP
  } catch (error) {
    console.error("Failed to fetch IP:", error);
    return "unknown_ip"; // Fallback in case of failure
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    cart_group_id: null,
    items: [],
  });

  useEffect(() => {
    async function initializeCart() {
      let savedCart = JSON.parse(localStorage.getItem("cart"));
      if (!savedCart) {
        const ip = await fetchUserIP();
        const timestamp = new Date().getTime();
        const newCart = {
          cart_group_id: `${ip}_${timestamp}`,
          items: [],
        };
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        setCart(savedCart);
      }
    }
    initializeCart();
  }, []);

  useEffect(() => {
    if (cart.cart_group_id) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addItemToCart = (productId, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product_id === productId
      );
      if (existingItem) {
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return {
        ...prevCart,
        items: [...prevCart.items, { product_id: productId, quantity }],
      };
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      items: prevCart.items.filter((item) => item.product_id !== productId),
    }));
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
