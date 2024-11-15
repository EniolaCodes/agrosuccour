import Image from "next/image";
import { FiSearch, FiPhone } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";

const Header = () => {
  return (
    <>
      <header className="hidden md:block px-20 py-4">
        <div className="w-full rounded-2xl bg-agroTop text-white py-4 px-6 flex items-center justify-between">
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
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded overflow-hidden w-full max-w-lg px-4 py-2 relative">
            <IoMenu className="text-green-600" size={20} />

            <input
              type="text"
              placeholder="Search your favorite product..."
              className="flex-1 p-3 text-gray-700 focus:outline-none"
            />
            <button className="flex items-center justify-center p-3 bg-green-500 absolute h-full top-0 right-0">
              <FiSearch className="text-white" />
            </button>
          </div>
          {/* navigation */}
          <ul className="flex space-x-2 text-agroText">
            <li className="text-inherit">
              <Link href="/">Home</Link>
            </li>

            <li className="text-inherit">
              <Link href="/#about">About</Link>
            </li>
            <li className="text-inherit">
              <Link href="/#products">Products</Link>
            </li>
          </ul>
          {/* Contact */}
          <div className="flex items-center space-x-2">
            <FiPhone className="text-lg" />
            <span>0706375930</span>
          </div>
          {/* Cart */}
          <div className="flex items-center space-x-4 cursor-pointer border px-2 py-4 rounded-xl">
            <FaShoppingCart className="text-2xl" />
            <div className="relative">
              <h1>Cart</h1>
              <span className="absolute -top-2 right-1 bg-red-600 text-white rounded-full px-2 text-xs">
                4
              </span>
            </div>
          </div>
        </div>
      </header>
      {/* mobile */}
      <header className="px-4 py-2 md:hidden">
        <div className="w-full rounded-2xl bg-black text-white py-4 px-6 flex flex-col space-y-4 ">
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
            <div className="flex items-center space-x-4 cursor-pointer border px-2 py-4 rounded-xl">
              <FaShoppingCart className="text-2xl" />
              <div className="relative">
                <h1>Cart</h1>
                <span className="absolute -top-2 right-1 bg-red-600 text-white rounded-full px-2 text-xs">
                  4
                </span>
              </div>
            </div>
          </div>
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded overflow-hidden w-full max-w-lg px-4 py-2 relative">
            <IoMenu className="text-green-600" size={20} />

            <input
              type="text"
              placeholder="Search your favorite product..."
              className="flex-1 p-3 text-gray-700 focus:outline-none"
            />
            <button className="flex items-center justify-center p-3 bg-green-500 absolute h-full top-0 right-0">
              <FiSearch className="text-white" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
