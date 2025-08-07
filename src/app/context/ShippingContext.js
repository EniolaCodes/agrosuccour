"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ShippingContext = createContext();

export function ShippingProvider({ children }) {
  const [shippingDetails, setShippingDetailsState] = useState(null);
  const [cartSummary, setCartSummaryState] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedShipping = localStorage.getItem("shippingDetails");
    const storedCartSummary = localStorage.getItem("cartSummary");

    if (storedShipping) {
      setShippingDetailsState(JSON.parse(storedShipping));
    }
    if (storedCartSummary) {
      setCartSummaryState(JSON.parse(storedCartSummary));
    }
  }, []);

  console.log("Final context values:", shippingDetails, cartSummary);

  // Save to localStorage when updated
  const setShippingDetails = (details) => {
    setShippingDetailsState(details);
    localStorage.setItem("shippingDetails", JSON.stringify(details));
  };

  const setCartSummary = (summary) => {
    setCartSummaryState(summary);
    localStorage.setItem("cartSummary", JSON.stringify(summary));
  };

  return (
    <ShippingContext.Provider
      value={{
        shippingDetails,
        setShippingDetails,
        cartSummary,
        setCartSummary,
      }}
    >
      {children}
    </ShippingContext.Provider>
  );
}

export function useShipping() {
  return useContext(ShippingContext);
}
