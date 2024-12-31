"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useGetProducts,
  useGetTopSellingProducts,
} from "@/lib/models/product/hooks";
import { MdAddShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "@/app/context/CartContext";

const TopSellingProducts = () => {
  const {
    data: fetchProducts,
    isLoading,
    isError,
    error,
  } = useGetTopSellingProducts({
    params: "?limit=6",
  });

  const topsellingProducts = fetchProducts?.result?.data;
  console.log("topsellingProducts : ", topsellingProducts);

  const { cartItems, toggleCartItem } = useCart();

  const toggleCart = (productId) => {
    const isAlreadyInCart = cartItems.includes(productId);
    toggleCartItem(productId);

    if (!isAlreadyInCart) {
      toast.success("Cart successfully updated");
    } else {
      toast.error("One item has been removed from cart");
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
                  toggleCart(product.product_id);
                }}
                className={`rounded-full border p-2 cursor-pointer transition-colors ${
                  cartItems.includes(product.product_id)
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
    </div>
  );
};

export default TopSellingProducts;
