"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useGetProducts,
  useGetTopSellingProducts,
} from "@/lib/models/product/hooks";
import { MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopSellingProducts = () => {
  const {
    data: fetchProducts,
    isLoading,
    isError,
    error,
  } = useGetTopSellingProducts({
    params: "?limit=6",
  });
  const products = Array(6).fill({
    id: Math.random(),
    image: "/images/chicken.svg",
    title: "Product Name",
    description: "15g",
    price: "₦10,000.00",
  });
  const topsellingProducts = fetchProducts?.result?.data;
  console.log("topsellingProducts : ", topsellingProducts);
  const [cartState, setCartState] = useState(
    Array(products.length).fill(false)
  );
  const notify = (message) => {
    toast(message, {
      position: "top-left",
      style: {
        backgroundColor: "#fff",
        color: "#6BB244",
        fontSize: "20px",
        fontWeight: "bold",
      },
    });
  };

  const toggleCart = (index) => {
    const updatedCartState = [...cartState];
    updatedCartState[index] = !updatedCartState[index];
    setCartState(updatedCartState);

    if (updatedCartState[index]) {
      notify("Cart successfully updated");
    } else {
      notify("One item removed from cart");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="px-4 md:px-20 py-8">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[28px]">
        <h1 className="text-Grey500 text-4xl font-nunito font-bold">
          Top Selling Products
        </h1>
        <Link href="/products">
          <h1 className="text-Green500 hover:text-Green800  text-[16px] font-nunitoSans">
            View All
          </h1>
        </Link>
      </div>
      <div className="bg-white rounded-[28px] px-6 py-8 grid grid-cols-2 md:grid-cols-6 gap-6">
        {topsellingProducts.map((product, index) => (
          <Link
            href={`/products/${product.product_id}`}
            key={index}
            className="bg-white rounded-[16px] p-4 hover:shadow-customHover transition-shadow duration-300"
          >
            <div className="relative w-full h-40 md:h-40">
              <Image
                src={product.image_url}
                alt={product.image_url}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="mt-4 text-sm text-Grey400 font-bold">
                {product.title}
              </h3>
              <p className=" text-Grey200">{product.description}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="mt-2 text-Grey500 font-nunitoSans text-[20px] font-bold">
                {product.price}
              </p>

              <div
                onClick={(e) => {
                  e.preventDefault();
                  toggleCart(index);
                }}
                className={`rounded-full border p-2 cursor-pointer transition-colors ${
                  cartState[index]
                    ? "bg-Green500 text-white border-Green500"
                    : "border-Green500 text-Green500"
                }`}
              >
                <MdAddShoppingCart className="text-[20px]" />
              </div>
            </div>
          </Link>
        ))}
        <ToastContainer
          position="top-left"
          autoClose={3000}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default TopSellingProducts;
