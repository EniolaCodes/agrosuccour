"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";

const Products = () => {
  const totalPages = 10; // Total number of pages
  const [currentPage, setCurrentPage] = useState(1);

  // Example product data (replace with actual data fetching)
  const products = Array.from({ length: 16 }, (_, index) => ({
    name: `Product ${index + 1 + (currentPage - 1) * 16}`,
    price: "₦10,000.99",
    image: "/images/singleProduct.svg",
    title: "Product Name",
    description: "15g",
  }));

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="px-4 md:px-20 py-8">
      <div className="flex">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden lg:flex w-1/4 h-full">
          <div className="bg-Green50 p-4 rounded-lg shadow">
            <h2 className="text-xl text-Grey500 font-semibold mb-4">
              Select by category
            </h2>
            <ul className="flex flex-col space-y-4 mt-6 mb-6">
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image src="/images/box 1.svg" width={20} height={20} alt="" />
                <Link href="/products/all">All Products</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image
                  src="/images/apple 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/fruits">Fruits</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image src="/images/meat 1.svg" width={20} height={20} alt="" />
                <Link href="/products/meat">Meat and Fish</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image
                  src="/images/cabbage 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/vegetables">Vegetables</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image src="/images/wine 1.svg" width={20} height={20} alt="" />
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
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image
                  src="/images/cooking-oil 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/oils">Oils</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image src="/images/milk 1.svg" width={20} height={20} alt="" />
                <Link href="/products/dairy">Dairy</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image src="/images/food 1.svg" width={20} height={20} alt="" />
                <Link href="/products/baking">Baking Goods</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image
                  src="/images/spice 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/spices">Spices</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green400 px-6 py-1">
                <Image src="/images/others.svg" width={20} height={20} alt="" />
                <Link href="/products/others">Others</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 bg-Green50 p-4 rounded-2xl">
            <h1 className="text-Grey500 font-semibold text-xl">All Products</h1>
            <p className="text-Grey200">1500 items</p>
          </div>
          {/* all products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg relative"
              >
                <div className="relative w-full h-40 md:h-40">
                  <Image
                    src={product.image}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="mt-4 text-sm text-Grey400 font-semibold">
                  {product.title}
                </h3>
                <p className="mt-2 text-Grey200 font-normal">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <p className="mt-2 text-Grey500 font-bold">{product.price}</p>
                  <Link href={`/products/${product.id}`} className="">
                    <div className="rounded-full border border-Green500 p-2 text-Green500 cursor-pointer">
                      <FaShoppingCart className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {/* desktop pagination */}
          <div className="hidden md:block mt-8">
            {/* Conditional rendering based on current page */}
            {currentPage > 1 ? (
              <div className="flex justify-between items-center">
                <div className="w-full">
                  {/* Back to Page 1 button */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="text-Green500 hover:text-green-600 flex items-center"
                  >
                    <IoChevronBackOutline className="mr-2" />
                    Back to Page 1
                  </button>
                </div>
                {/* Previous and Next buttons */}
                <div className="w-full flex space-x-4">
                  <button
                    onClick={handlePreviousPage}
                    className="border border-gray-300 px-4 py-2 rounded-md  flex items-center"
                  >
                    <IoChevronBackOutline className="text-Grey300" />
                  </button>
                  <div className="">
                    {/* Next page button */}
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`flex justify-center items-center px-4 py-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-Grey200 cursor-not-allowed"
                          : "bg-Green500 hover:bg-green-600"
                      }`}
                    >
                      Next page
                      <IoChevronForwardOutline className="h-4 w-4 ml-4" />
                    </button>
                  </div>
                </div>
                {/* page indicator */}
                <div className="text-gray-600 w-full text-right">
                  Page{" "}
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) =>
                      setCurrentPage(
                        Math.max(
                          1,
                          Math.min(totalPages, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-10 text-center border border-gray-300 rounded px-2 mx-1"
                  />{" "}
                  of {totalPages}
                </div>
              </div>
            ) : (
              // Pagination for page 1
              <div className="flex justify-between items-center">
                <div className="w-full">
                  {/* Next page button */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex justify-center items-center p-2 rounded ${
                      currentPage === totalPages
                        ? "bg-Grey200 cursor-not-allowed"
                        : "bg-Green500 hover:bg-green-600"
                    }`}
                  >
                    Next page
                    <IoChevronForwardOutline className="h-4 w-4 ml-4" />
                  </button>
                </div>
                {/* page indicator */}
                <div className="text-gray-600 w-full text-right">
                  Page{" "}
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) =>
                      setCurrentPage(
                        Math.max(
                          1,
                          Math.min(totalPages, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-10 text-center border border-gray-300 rounded px-2 mx-1"
                  />{" "}
                  of {totalPages}
                </div>
              </div>
            )}
          </div>
          {/* mobile pagination */}
          <div className="md:hidden mt-8">
            {/* Conditional rendering based on current page */}
            {currentPage > 1 ? (
              <div className="flex justify-between items-center">
                {/* Previous and Next buttons */}
                <div className="w-full flex space-x-4">
                  <button
                    onClick={handlePreviousPage}
                    className="bg-Green500 px-4 py-2 rounded-md  flex items-center"
                  >
                    <IoChevronBackOutline className="text-Grey500" />
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="bg-Green500 px-4 py-2 rounded-md  flex items-center"
                  >
                    <IoChevronForwardOutline className="text-Grey500" />
                  </button>
                </div>
                {/* page indicator */}
                <div className="text-gray-600 w-full text-right">
                  Page{" "}
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) =>
                      setCurrentPage(
                        Math.max(
                          1,
                          Math.min(totalPages, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-10 text-center border border-gray-300 rounded px-2 mx-1"
                  />{" "}
                  of {totalPages}
                </div>
              </div>
            ) : (
              // Pagination for page 1
              <div className="flex justify-between items-center">
                <div className="w-full">
                  {/* Next page button */}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex justify-center items-center p-2 rounded ${
                      currentPage === totalPages
                        ? "bg-Grey200 cursor-not-allowed"
                        : "bg-Green500 hover:bg-green-600"
                    }`}
                  >
                    Next page
                    <IoChevronForwardOutline className="h-4 w-4 ml-4" />
                  </button>
                </div>
                {/* page indicator */}
                <div className="text-gray-600 w-full text-right">
                  Page{" "}
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) =>
                      setCurrentPage(
                        Math.max(
                          1,
                          Math.min(totalPages, parseInt(e.target.value) || 1)
                        )
                      )
                    }
                    className="w-10 text-center border border-gray-300 rounded px-2 mx-1"
                  />{" "}
                  of {totalPages}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
