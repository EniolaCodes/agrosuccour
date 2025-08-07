"use client";
import { useState, useEffect } from "react";
import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TansStackProvider from "@/components/providers/TansStackProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import { CartProvider, useCart } from "./context/CartContext";
import { ShippingProvider } from "./context/ShippingContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorProvider, useError } from "./context/ErrorContext";
import ErrorPage from "./error/page";

function LayoutContent({ children }) {
  const pathname = usePathname();
  const hiddenFooterPaths = [
    "/checkout",
    "/payment",
    "/review",
    "/ordercompleted",
  ];

  return (
    <>
      <Header />
      {children}
      {!hiddenFooterPaths.includes(pathname) && <Footer />}
    </>
  );
}

// New inner wrapper that uses the context
function ProvidersWrapper({ children }) {
  const { errorMessage } = useError();

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return <LayoutContent>{children}</LayoutContent>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-Grey50">
        <SessionProvider>
          <ErrorProvider>
            <TansStackProvider>
              <ShippingProvider>
                <CartProvider>
                  <ProvidersWrapper>{children}</ProvidersWrapper>
                  <ToastContainer
                    position="top-left"
                    autoClose={3000}
                    newestOnTop={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                  />
                </CartProvider>
              </ShippingProvider>
            </TansStackProvider>
          </ErrorProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
