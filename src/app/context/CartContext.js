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
  const [cart, setCart] = useState({
    cart_group_id: null,
    items: [],
    createdAt: null,
    total_amount: 0,
  });

  const isCartExpired = (cart) => {
    const oneDay = 24 * 60 * 60 * 1000;
    return Date.now() - cart.createdAt > oneDay;
  };

  const calculateTotalAmount = (items = []) => {
    return items.reduce((total, item) => {
      if (!item?.price || !item?.quantity) return total;

      return (
        total + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0)
      );
    }, 0);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

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
          total_amount: 0,
        };
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        setCart({
          ...savedCart,
          total_amount: parseFloat(
            calculateTotalAmount(savedCart.items).toFixed(2)
          ),
        });
      }
    }

    initializeCart();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && cart.cart_group_id) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    setCart((prevCart) => ({
      ...prevCart,
      total_amount: parseFloat(calculateTotalAmount(prevCart.items).toFixed(2)),
    }));
  }, [cart.items]); // Update total_amount when cart items change

  const addItemToCart = (productId, quantity, price) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product_id === productId
      );

      const updatedItems = existingItem
        ? prevCart.items.map((item) =>
            item.product_id === productId
              ? { ...item, quantity: item.quantity + quantity, price }
              : item
          )
        : [...prevCart.items, { product_id: productId, quantity, price }];

      return { ...prevCart, items: updatedItems };
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.product_id !== productId
      );
      return { ...prevCart, items: updatedItems };
    });
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...prevCart, items: updatedItems };
    });
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items
        .map((item) =>
          item.product_id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity 0

      return { ...prevCart, items: updatedItems };
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        removeItemFromCart,
        incrementQuantity,
        decrementQuantity,
      }}
    >
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
