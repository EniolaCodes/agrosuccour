"use client";

import { createContext, useState, useContext } from "react";

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [isError, setIsError] = useState(false);

  const setError = (value) => {
    setIsError(value);
  };

  return (
    <ErrorContext.Provider value={{ isError, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
