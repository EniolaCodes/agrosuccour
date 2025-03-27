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
        const recalculatedTotal = calculateTotalAmount(savedCart.items);
        setCart({
          ...savedCart,
          total_amount: parseFloat(recalculatedTotal.toFixed(2)),
        });
      }
    }

    initializeCart();
  }, []);

  const calculateTotalAmount = (items) => {
    console.log("Items in calculateTotalAmount:", items);
    return items.reduce((total, item) => {
      // Initialize price and quantity for safety
      let price = 0;
      let quantity = 0;

      // Validate price
      if (item && item.price !== undefined && item.price !== null) {
        price =
          typeof item.price === "number" ? item.price : parseFloat(item.price);
        if (isNaN(price)) {
          console.warn(`Item ${item.product_id} has an invalid price`);
          return total; // Skip this item
        }
      } else {
        console.warn(`Item ${item.product_id} is missing price`);
        return total; // Skip this item
      }

      // Validate quantity
      if (item && item.quantity !== undefined && item.quantity !== null) {
        quantity =
          typeof item.quantity === "number"
            ? item.quantity
            : parseInt(item.quantity, 10);
        if (isNaN(quantity) || quantity < 0) {
          console.warn(`Item ${item.product_id} has an invalid quantity`);
          return total;
        }
      } else {
        console.warn(`Item ${item.product_id} is missing quantity`);
        return total;
      }

      const itemTotal = parseFloat((price * quantity).toFixed(2));
      return total + itemTotal;
    }, 0);
  };
  useEffect(() => {
    if (typeof window !== "undefined" && cart.cart_group_id) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

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

      const updatedTotal = calculateTotalAmount(updatedItems);

      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total_amount: parseFloat(updatedTotal.toFixed(2)),
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.product_id !== productId
      );
      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total_amount: parseFloat(calculateTotalAmount(updatedItems).toFixed(2)),
      };

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const incrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total_amount: parseFloat(calculateTotalAmount(updatedItems).toFixed(2)),
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decrementQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.product_id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      const updatedCart = {
        ...prevCart,
        items: updatedItems,
        total_amount: parseFloat(calculateTotalAmount(updatedItems).toFixed(2)),
      };
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
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
