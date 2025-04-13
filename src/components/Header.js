"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { FiSearch, FiPhone } from "react-icons/fi";
import { ImEnlarge2 } from "react-icons/im";
import CartComponent from "@/components/CartComponent";
import { useCart } from "@/app/context/CartContext";
import { useFetchCartProducts } from "@/lib/models/product/hooks";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const { cart, removeItemFromCart, incrementQuantity, decrementQuantity } =
    useCart();
  const items = cart ? cart.items : [];
  const isCartEmpty = !items || items.length === 0;

  const {
    data: cartedProducts = [],
    isLoading,
    isError,
    refetch: refetchCartProducts,
  } = useFetchCartProducts(items);

  // const totalPrice = cart?.total_amount;
  const totalPrice = cartedProducts.reduce((acc, product) => {
    const price = parseFloat(product?.result?.data?.price) || 0;
    const quantity = parseInt(product?.quantity, 10) || 0;
    return acc + price * quantity;
  }, 0);

  useEffect(() => {
    if (cartedProducts && cartedProducts.length) {
      setProducts(cartedProducts);
    }
  }, [cartedProducts]);

  const menuRef = useRef(null);
  const productsRef = useRef(null);
  const cartRef = useRef(null);

  const handleClickOutside = (event) => {
    //check if click is outside of the desktop menu
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
    if (productsRef.current && !productsRef.current.contains(event.target)) {
      console.log("product closed");
      setProductsOpen(false);
    }
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      console.log("cart closed");
      setCartOpen(false);
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
  const toggleCart = () => setCartOpen((prev) => !prev);
  const router = useRouter();

  const handleHomeClick = () => {
    toggleMenu(); // Close the menu
    router.push("/"); // Redirect to the home page
  };

  const handleAboutClick = () => {
    toggleMenu(); // Close the menu
    router.push("/about"); // Redirect to the home page
  };
  const handleCartClick = () => {
    toggleMenu(); // Close the menu
    router.push("/cart"); // Redirect to the cart page
  };

  return (
    <div>
      {(productsOpen || cartOpen) && (
        <div
          className="fixed inset-0 bg-Grey500 bg-opacity-70 z-40"
          onClick={() => {
            setProductsOpen(false);
            setCartOpen(false);
          }}
        />
      )}

      <header className=" hidden md:block px-20 py-4">
        <div className="w-full rounded-[28px] bg-Grey500 text-white py-4 px-6 flex items-center justify-between relative">
          <Link href="/" className="flex justify-center items-center space-x-2">
            <Image
              src="/images/logo.svg"
              alt="Agrosuccour Logo"
              width={30}
              height={30}
            />
            <h1 className="text-[26px] mt-4 font-urbanist font-semibold text-Green100">
              Agrosuccour
            </h1>
          </Link>
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-[8px] overflow-hidden w-full max-w-lg px-4 py-2 relative">
            <IoMenu
              className="text-Grey400 cursor-pointer relative z-50"
              size={30}
              onClick={toggleProducts}
            />

            <input
              type="text"
              placeholder="Search your favorite product..."
              className="flex-1 p-3 text-Green50 focus:outline-none"
            />
            <button className="flex items-center justify-center p-3 bg-Green500 absolute h-full top-0 right-0">
              <FiSearch className="text-Green50 text-[24px]" />
            </button>
          </div>
          {/*desktop menu */}
          {productsOpen && (
            <div
              ref={productsRef}
              className="mt-4 p-4 bg-white rounded-[8px] shadow-lg w-[272px] h-auto absolute z-50 top-20 left-72"
            >
              <ul className="flex flex-col space-y-4 mt-6 mb-6 text-[13px] font-nunitoSans">
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/box 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/all">All Products</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/apple 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/fruits">Fruits</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/meat 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/meat">Meat and Fish</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/cabbage 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/vegetables">Vegetables</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/wine 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/beverages">Drinks & Beverages</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/wheat-sack 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/drygoods">Dry Goods</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/cooking-oil 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/oils">Oils</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/milk 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/dairy">Dairy</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
                  <Image
                    src="/images/food 1.svg"
                    width={20}
                    height={20}
                    alt=""
                  />
                  <Link href="/products/baking">Baking Goods</Link>
                </li>
                <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-1">
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
          <ul className="flex space-x-2 text-[16px] text-Green50 font-nunitoSans">
            <li className=" hover:text-Green500 ">
              <Link href="/">Home</Link>
            </li>

            <li className="hover:text-Green500 ">
              <Link href="/products">Products</Link>
            </li>
          </ul>
          {/* Contact */}
          <div className="flex text-[16px] justify-center items-center space-x-2">
            <FiPhone className=" text-Green50" />
            <span className="font-nunitoSans ">0706375930</span>
          </div>
          {/* Cart */}
          <div onClick={toggleCart} className="relative">
            <CartComponent />
          </div>
          {/* cart dropdown */}
          {cartOpen && (
            <div
              className="px-4 py-2 bg-white rounded-[8px] border w-[400px] h-auto absolute z-50 top-16 -right-10 overflow-y-scroll"
              ref={cartRef}
            >
              <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-[20px] font-nunitoSans text-Grey400">
                  Cart Overview
                </h1>
                <div className="flex items-center space-x-4 text-Grey400">
                  <Link href="/cart">
                    <ImEnlarge2 onClick={toggleCart} className="text-2xl" />
                  </Link>
                  <button
                    onClick={toggleCart}
                    className=" flex items-center border border-Grey300 rounded-[12px] space-x-2 p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-[10px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <h1 className="text-[11px] font-nunitoSans">Cancel</h1>
                  </button>
                </div>
              </div>
              <div className="border-b border-Grey50 mb-4" />
              {/* Check if the cart is empty */}
              {isCartEmpty ? (
                <div className="flex flex-col items-center mb-6">
                  <Link
                    href="/products"
                    className="bg-white text-Green500 rounded-full p-4 hover:text-white hover:bg-Green500 transition duration-150"
                  >
                    <MdAddShoppingCart className="text-[20px]" />
                  </Link>
                  <p className="text-center font-bold text-[16px] text-Grey500">
                    Your cart is empty!
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-4 font-nunitoSans flex justify-between items-center">
                    <h1 className="text-Grey400 text-sm font-bold">
                      {products.length} items
                    </h1>
                    <p className="text-[16px] font-bold bg-Green100 rounded-[6px] p-1 text-Green900">
                      ₦{(totalPrice || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-4">
                    {products.map((product) => (
                      <div
                        key={product?.result?.data?.product_id}
                        className=" bg-white rounded-[8px] border p-4 mb-4"
                      >
                        <div className="space-y-6">
                          <div className=" relative">
                            <div className="flex flex-row space-x-6">
                              <Image
                                src={product?.result?.data?.image_url}
                                alt={product?.result?.data?.product_name}
                                width={124}
                                height={80}
                                className="rounded-md"
                              />
                              <div className="">
                                <h2 className="text-Grey500 text-[16px] font-bold">
                                  {product?.result?.data?.product_name}
                                </h2>
                                <p className="text-[16px] text-Grey400">
                                  {product?.quantity} kilogram / Bag
                                </p>
                              </div>
                            </div>
                            <div className="">
                              <button
                                onClick={() =>
                                  removeItemFromCart(
                                    product?.result?.data?.product_id
                                  )
                                }
                                className="text-Grey400 hover:text-red-600 absolute top-0 right-2"
                              >
                                x
                              </button>
                            </div>
                          </div>
                          {/* + & - buttons and product price */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  decrementQuantity(
                                    product?.result?.data?.product_id
                                  )
                                }
                                className={`px-3 py-1 rounded-md font-extrabold ${
                                  product.quantity > 1
                                    ? "bg-Green500 text-Green50"
                                    : "bg-Grey100 text-Green50"
                                }`}
                              >
                                -
                              </button>
                              <span className="text-lg text-Grey400 font-semibold">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  incrementQuantity(
                                    product?.result?.data?.product_id
                                  )
                                }
                                className="bg-Green500 text-Green50 px-3 py-1 rounded-md font-bold"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-lg font-bold text-Grey500 ml-2">
                              ₦
                              {(
                                (product?.result?.data?.price || 0) *
                                (product?.quantity || 0)
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* checkout button */}
                  <div className="pb-6">
                    <Link href="/checkout">
                      <button className="mt-4 w-full h-[44px] bg-Green500 text-white text-[16px]uppercase font-bold py-2 rounded-[8px] hover:bg-Green600 transition">
                        Checkout ( ₦{totalPrice.toFixed(2)} )
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      {/* mobile */}
      <header className="px-4 py-2 bg-Grey50 md:hidden">
        <div className="w-full rounded-[28px] bg-Grey500 py-4 px-6 flex flex-col space-y-4 relative">
          {/* logo & cart */}
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-4">
                <Image
                  src="/images/logo.svg"
                  alt="Agrosuccour Logo"
                  width={40}
                  height={40}
                />
                <h1 className="text-[20px] font-urbanist font-semibold text-Green50">
                  Agrosuccour
                </h1>
              </Link>
            </div>
            {/* cart component */}
            <CartComponent />
          </div>
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-[8px] overflow-hidden w-full max-w-lg px-4 py-2 relative">
            <IoMenu
              className="text-Grey400 cursor-pointer relative z-50"
              size={20}
              onClick={toggleMenu}
            />
            <input
              type="text"
              placeholder="Search your favorite product..."
              className="flex-1 p-3 text-Green50 focus:outline-none"
            />
            <button className="flex items-center justify-center p-3 bg-Green500 absolute h-full top-0 right-0">
              <FiSearch className="text-Green50 text-[24px]" />
            </button>
          </div>
          {/* Mobile Menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="mt-2 bg-white rounded-md shadow-lg absolute z-50 top-36 left-8 w-[272px] h-[600px]"
            >
              <div className="flex justify-end items-center p-4">
                <IoClose
                  className="text-[14px] text-Grey200 cursor-pointer relative z-50"
                  size={20}
                  onClick={toggleMenu}
                />
              </div>
              <ul className="flex flex-col text-[16px] font-nunitoSans text-Grey500 space-y-4 mt-2">
                <li className="font-bold hover:bg-Green100 px-6 py-1">
                  <Link href="/" onClick={handleHomeClick}>
                    Home
                  </Link>
                </li>
                <li className="font-bold hover:bg-Green100 px-6 py-1">
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
                    <span className="">Cart</span>
                    <span className="text-sm bg-red-600 text-Green50 px-2 py-1 rounded-full">
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
                  <ul className="bg-white p-4 ml-4 space-y-4 mt-4 text-[13px] font-nunitoSans">
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/box 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/all">All Products</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/apple 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/fruits">Fruits</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/meat 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/meat">Meat and Fish</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/cabbage 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/vegetables">Vegetables</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/wine 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/beverages">Drinks & Beverages</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/wheat-sack 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/drygoods">Dry Goods</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/cooking-oil 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/oils">Oils</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/milk 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/dairy">Dairy</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px] ">
                      <Image
                        src="/images/food 1.svg"
                        width={20}
                        height={20}
                        alt=""
                      />
                      <Link href="/products/baking">Baking Goods</Link>
                    </li>
                    <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 rounded-[8px]  mb-6">
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
    </div>
  );
};

export default Header;
