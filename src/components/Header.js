"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FiSearch, FiPhone } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const menuRef = useRef(null);
  const productsRef = useRef(null);

  const handleClickOutside = (event) => {
    //check if click is outside of the desktop menu
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
      console.log("opened");
    }
    if (productsRef.current && !productsRef.current.contains(event.target)) {
      setProductsOpen(false);
      console.log("closed");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleProducts = () => setProductsOpen((prev) => !prev);

  const router = useRouter();

  const handleCartClick = () => {
    toggleMenu(); // Close the menu
    router.push("/cart"); // Redirect to the cart page
  };

  const handleHomeClick = () => {
    toggleMenu(); // Close the menu
    router.push("/"); // Redirect to the home page
  };

  const handleAboutClick = () => {
    toggleMenu(); // Close the menu
    router.push("/about"); // Redirect to the home page
  };
  return (
    <>
      <header className="hidden md:block px-20 py-4">
        <div className="w-full rounded-2xl bg-Grey500 text-white py-4 px-6 flex items-center justify-between relative">
          <Link href="/" className="flex items-center space-x-4">
            <Image
              src="/images/logo.svg"
              alt="Agrosuccour Logo"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-semibold text-agroLightGreen">
              Agrosuccour
            </h1>
          </Link>
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded overflow-hidden w-full max-w-lg px-4 py-2 relative">
            <IoMenu
              className="text-Green500 cursor-pointer relative z-50"
              size={20}
              onClick={toggleProducts}
            />

            <input
              type="text"
              placeholder="Search your favorite product..."
              className="flex-1 p-3 text-gray-700 focus:outline-none"
            />
            <button className="flex items-center justify-center p-3 bg-green-500 absolute h-full top-0 right-0">
              <FiSearch className="text-white" />
            </button>
          </div>
          {/*desktop menu */}
          {productsOpen && (
            <div
              ref={productsRef}
              className="mt-4 bg-Green50 rounded-md shadow-lg w-[272px] h-auto absolute z-50 top-20 left-72"
            >
              <ul className="flex flex-col space-y-4 mt-6 mb-6">
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/box 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/all">All Products</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/apple 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/fruits">Fruits</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/meat 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/meat">Meat and Fish</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/cabbage 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/vegetables">Vegetables</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/wine 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/beverages">Drinks & Beverages</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/wheat-sack 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/drygoods">Dry Goods</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/cooking-oil 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/oils">Oils</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/milk 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/dairy">Dairy</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/food 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/baking">Baking Goods</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                  <Image
                    src="/images/spice 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/spices">Spices</Link>
                </li>
              </ul>
            </div>
          )}
          {/* navigation */}
          <ul className="flex space-x-2 text-agroText ">
            <li className="text-inherit hover:text-green-600 ">
              <Link href="/">Home</Link>
            </li>

            <li className="text-inherit hover:text-green-600 ">
              <Link href="/about">About</Link>
            </li>
            <li className="text-inherit hover:text-green-600 ">
              <Link href="/products">Products</Link>
            </li>
          </ul>
          {/* Contact */}
          <div className="flex items-center space-x-2">
            <FiPhone className="text-lg" />
            <span>0706375930</span>
          </div>
          {/* Cart */}
          <Link href="/cart">
            <div className="flex items-center space-x-4 cursor-pointer border px-2 py-4 rounded-xl">
              <FaShoppingCart className="text-2xl" />
              <div className="relative">
                <h1>Cart</h1>
                <span className="absolute -top-2 right-1 bg-red-600 text-white rounded-full px-2 text-xs">
                  4
                </span>
              </div>
            </div>
          </Link>
        </div>
      </header>
      {/* mobile */}
      <header className="px-4 py-2 md:hidden">
        <div className="w-full rounded-2xl bg-black text-white py-4 px-6 flex flex-col space-y-4 relative">
          {/* logo & cart */}
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/logo.svg"
                  alt="Agrosuccour Logo"
                  width={40}
                  height={40}
                />
                <h1 className="text-2xl font-semibold text-agroLightGreen">
                  Agrosuccour
                </h1>
              </div>
            </div>
            {/* cart */}
            <div className="flex items-center space-x-4 border px-2 py-4 rounded-xl">
              <FaShoppingCart className="text-2xl" />
              <Link href="/cart" className="relative">
                <h1>Cart</h1>
                <span className="absolute -top-2 right-1 bg-red-600 text-white rounded-full px-2 text-xs">
                  4
                </span>
              </Link>
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded overflow-hidden w-full max-w-lg px-4 py-2 relative">
            <IoMenu
              className="text-green-600 cursor-pointer relative z-50"
              size={20}
              onClick={toggleMenu}
            />
            <input
              type="text"
              placeholder="Search your favorite product..."
              className="flex-1 p-3 text-gray-700 focus:outline-none"
            />
            <button className="flex items-center justify-center p-3 bg-green-500 absolute h-full top-0 right-0">
              <FiSearch className="text-white" />
            </button>
          </div>
          {/* Mobile Menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="mt-2 bg-Green50 rounded-md shadow-lg absolute z-50 top-36 left-8 w-[272px] h-[600px]"
            >
              <div className="flex justify-end items-center p-4">
                <IoClose
                  className="text-2xl text-Grey400 cursor-pointer relative z-50"
                  size={20}
                  onClick={toggleMenu}
                />
              </div>
              <ul className="flex flex-col space-y-4 mt-2">
                <li className="text-Grey500 font-bold hover:bg-Green100 px-6 py-1">
                  <Link href="/" onClick={handleHomeClick}>
                    Home
                  </Link>
                </li>
                <li className="text-Grey500 font-bold hover:bg-Green100 px-6 py-1">
                  <Link href="/about" onClick={handleAboutClick}>
                    About
                  </Link>
                </li>
                <li className="px-6 py-1 font-bold hover:bg-Green100">
                  <Link
                    href="/cart"
                    onClick={handleCartClick}
                    className="flex items-center justify-between"
                  >
                    <span className="text-Grey500">Cart</span>
                    <span className="text-sm bg-red-600 text-white px-2 py-1 rounded-full">
                      4
                    </span>
                  </Link>
                </li>
                <li className="flex justify-between items-center px-6 py-1 ">
                  <span
                    onClick={toggleProducts}
                    className="text-Grey500 font-bold"
                  >
                    Products
                  </span>
                  {productsOpen ? (
                    <IoChevronUp
                      onClick={toggleProducts}
                      className="relative z-50 text-Grey400 cursor-pointer"
                    />
                  ) : (
                    <IoChevronDown
                      onClick={toggleProducts}
                      className="relative z-50 text-Grey400 cursor-pointer"
                    />
                  )}
                </li>
                {productsOpen && (
                  <ul className="bg-Green50 ml-4 space-y-4 mt-4">
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1 ">
                      <Image
                        src="/images/box 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/all">All Products</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1 w-full">
                      <Image
                        src="/images/apple 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/fruits">Fruits</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                      <Image
                        src="/images/meat 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/meat">Meat and Fish</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                      <Image
                        src="/images/cabbage 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/vegetables">Vegetables</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                      <Image
                        src="/images/wine 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/beverages">Drinks & Beverages</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                      <Image
                        src="/images/wheat-sack 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/drygoods">Dry Goods</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                      <Image
                        src="/images/cooking-oil 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/oils">Oils</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                      <Image
                        src="/images/milk 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/dairy">Dairy</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1">
                      <Image
                        src="/images/food 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/baking">Baking Goods</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green100 px-6 py-1 mb-6">
                      <Image
                        src="/images/spice 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/spices">Spices</Link>
                    </li>
                  </ul>
                )}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
