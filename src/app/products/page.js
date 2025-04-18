"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetProducts } from "@/lib/models/product/hooks";
import { MdAddShoppingCart } from "react-icons/md";
import { IoChevronForwardOutline, IoChevronBackOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/app/context/CartContext";
import ErrorPage from "../error/page";

const Products = () => {
  const totalPages = 10; // Total number of pages
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: fetchProducts,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProducts({
    params: `?limit=20&page=${currentPage}`,
  });

  const allproducts = fetchProducts?.result?.data;

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const { cart, addItemToCart, removeItemFromCart } = useCart();

  const toggleCart = (product) => {
    const isAlreadyInCart = cart.items.some(
      (item) => item.product_id === product.product_id
    );

    if (!isAlreadyInCart) {
      addItemToCart(product.product_id, 1, product.price); // <--- PASS A DEFAULT QUANTITY OF 1
      toast.success("Cart successfully updated");
    } else {
      removeItemFromCart(product.product_id);
      toast.error("One item has been removed from cart");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorPage message={error.message} />; // Render the ErrorPage
  return (
    <div className="px-4 md:px-20 py-8">
      <div className="flex">
        {/* Sidebar - hidden on mobile */}
        <div className="hidden lg:flex w-1/4 h-full">
          <div className="bg-white p-4 w-[301px] rounded-[28px] shadow">
            <h2 className="text-xl text-Grey500 font-semibold mb-4">
              Select by category
            </h2>
            <ul className="flex flex-col space-y-4 mt-6 mb-6">
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 hover:rounded-[8px] p-2">
                <Image src="/images/box 1.svg" width={20} height={20} alt="" />
                <Link href="/products">All Products</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image
                  src="/images/apple 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/fruits">Fruits</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image src="/images/meat 1.svg" width={20} height={20} alt="" />
                <Link href="/products/meat">Meat and Fish</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image
                  src="/images/cabbage 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/vegetables">Vegetables</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image src="/images/wine 1.svg" width={20} height={20} alt="" />
                <Link href="/products/beverages">Drinks & Beverages</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image
                  src="/images/wheat-sack 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/drygoods">Dry Goods</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image
                  src="/images/cooking-oil 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/oils">Oils</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image src="/images/milk 1.svg" width={20} height={20} alt="" />
                <Link href="/products/dairy">Dairy</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image src="/images/food 1.svg" width={20} height={20} alt="" />
                <Link href="/products/baking">Baking Goods</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image
                  src="/images/spice 1.svg"
                  width={20}
                  height={20}
                  alt=""
                />
                <Link href="/products/spices">Spices</Link>
              </li>
              <li className="flex space-x-4 text-Grey400 hover:bg-Green200 p-2 hover:rounded-[8px] ">
                <Image src="/images/others.svg" width={20} height={20} alt="" />
                <Link href="/products/others">Others</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[28px]">
            <h1 className="text-Grey500 font-bold font-nunitotext-[20px] md:text-[25px]">
              All Products
            </h1>
            <p className="text-Grey400 text-[13px] md:text-[16px] font-nunitoSans">
              1500 items
            </p>
          </div>
          {/* all products */}
          <div className="bg-white rounded-[28px] px-6 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allproducts.map((product, index) => (
              <Link
                key={index}
                href={`/products/${product.product_id}`}
                className="bg-white  rounded-[16px] p-4 hover:shadow-customHover transition-shadow duration-300"
              >
                <div className="relative w-full h-40 md:h-40">
                  <Image
                    src={product.image_url}
                    alt={product.product_name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="mt-4 text-sm text-Grey400 font-semibold">
                    {product.title}
                  </h3>
                  <p className=" text-Grey200 font-normal">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="mt-2 text-Grey500 font-nunitoSans text-[16px] font-bold">
                    {product.price}
                  </p>

                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      toggleCart(product);
                    }}
                    className={`rounded-full border p-2 cursor-pointer transition-colors ${
                      (cart.items || []).some(
                        (item) => item.product_id === product.product_id
                      )
                        ? "bg-Green500 text-white border-Green500"
                        : "border-Green500 text-Green500"
                    }`}
                  >
                    <MdAddShoppingCart className="text-[20px]" />
                  </div>
                </div>
              </Link>
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
                    className="text-Green500 hover:text-Green600 flex items-center"
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
                      className={`flex justify-center text-white items-center px-4 py-2 rounded-[12px] ${
                        currentPage === totalPages
                          ? "bg-Grey200 cursor-not-allowed"
                          : "bg-Green500 hover:bg-Green600"
                      }`}
                    >
                      Next page
                      <IoChevronForwardOutline className="h-4 w-4 ml-4" />
                    </button>
                  </div>
                </div>
                {/* page indicator */}
                <div className="text-Grey500 font-nunitoSans text-[16px] w-full text-right">
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
                    className="w-10 text-center bg-white rounded-[8px] px-2 mx-1"
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
                    className={`flex justify-center items-center text-white p-2 rounded-[12px] ${
                      currentPage === totalPages
                        ? "bg-Grey200 cursor-not-allowed"
                        : "bg-Green500 hover:bg-Green600"
                    }`}
                  >
                    Next page
                    <IoChevronForwardOutline className="h-4 w-4 ml-4" />
                  </button>
                </div>
                {/* page indicator */}
                <div className="text-Grey500 font-nunitoSans text-[13px] w-full text-right">
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
                    className="w-10 text-center rounded-[8px]  px-2 mx-1"
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
                    <IoChevronBackOutline className="text-white" />
                  </button>
                  <button
                    onClick={handleNextPage}
                    className="bg-Green500 px-4 py-2 rounded-md  flex items-center"
                  >
                    <IoChevronForwardOutline className="text-white" />
                  </button>
                </div>
                {/* page indicator */}
                <div className="text-Grey500 font-nunitoSans text-[13px]  w-full text-right">
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
                    className="w-10 text-center rounded-[8px]   px-2 mx-1"
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
                    className={`flex justify-center text-white items-center p-2 rounded-[12px] ${
                      currentPage === totalPages
                        ? "bg-Grey200 cursor-not-allowed"
                        : "bg-Green500 hover:bg-Green600"
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
                    className="w-10 text-center rounded-[8px] px-2 mx-1"
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
