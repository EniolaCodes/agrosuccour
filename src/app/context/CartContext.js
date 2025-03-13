import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

const fetchUserIP = async () => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP:", error);
    return "unknown_ip";
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.createdAt) {
      return savedCart;
    }
    return { cart_group_id: null, items: [], createdAt: null };
  });

  const isCartExpired = (cart) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Date.now() - cart.createdAt > oneDay;
  };

  useEffect(() => {
    async function initializeCart() {
      let savedCart = JSON.parse(localStorage.getItem("cart"));

      if (savedCart && isCartExpired(savedCart)) {
        localStorage.removeItem("cart");
        savedCart = null;
      }

      if (!savedCart) {
        const ip = await fetchUserIP();
        const timestamp = Date.now();
        const newCart = {
          cart_group_id: `${ip}_${timestamp}`,
          createdAt: timestamp,
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
      const updatedItems = existingItem
        ? prevCart.items.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevCart.items, { product_id: productId, quantity }];

      const updatedCart = { ...prevCart, items: updatedItems };
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Sync immediately
      return updatedCart;
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        items: prevCart.items.filter((item) => item.product_id !== productId),
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
