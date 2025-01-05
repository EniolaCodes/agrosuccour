"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TansStackProvider from "@/components/providers/TansStackProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hiddenFooterPaths = [
    "/checkout",
    "/payment",
    "/review",
    "/ordercompleted",
  ];

  return (
    <html lang="en">
      <body className="bg-Grey50">
        <SessionProvider>
          <TansStackProvider>
            <CartProvider>
              <Header />
              {children}
              {!hiddenFooterPaths.includes(pathname) && <Footer />}

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
          </TansStackProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
