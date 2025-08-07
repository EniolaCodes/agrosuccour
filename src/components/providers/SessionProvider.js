"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const SessionContext = createContext();

export default function SessionProvider({ children }) {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    let id = Cookies.get("sessionId");
    if (!id) {
      id = `session_${Math.random().toString(36).substring(2)}`;
      Cookies.set("sessionId", id, { expires: 7 }); // Session expires in 7 days
    }
    setSessionId(id);
  }, []);

  return (
    <SessionContext.Provider value={sessionId}>
      {children}
    </SessionContext.Provider>
  );
}

// Custom hook for consuming session context
export const useSession = () => {
  return useContext(SessionContext);
};
