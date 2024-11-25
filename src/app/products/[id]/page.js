"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const pricePerUnit = 1200.99;

  const totalPrice = (quantity * pricePerUnit).toFixed(2);

  // Handlers for increment and decrement
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const products = Array(6).fill({
    image: "/images/chicken.svg",
    title: "Product Name",
    description: "15g",
    price: "₦10,000.00",
  });

  const notify = () => toast("One item has been added to cart!");
  return (
    <div className="px-4 md:px-20 py-8 min-h-screen">
      <div className="bg-white rounded-[28px] p-4">
        <h1 className=" text-Grey500 text-xl font-bold mb-1">
          Product details
        </h1>
        <div className=" flex flex-col md:flex-row md:space-x-8">
          {/* Sidebar for smaller images */}
          <div className="hidden md:flex md:flex-col md:space-y-4 ">
            {[1, 2, 3].map((_, index) => (
              <Image
                key={index}
                src="/images/meat 1.svg"
                alt={`Small image ${index + 1}`}
                width={170}
                height={100}
                className="bg-Grey100 p-2 rounded-[16px]"
              />
            ))}
          </div>

          {/* Large Image */}
          <div className="flex-1 mb-4 md:mb-0">
            <Image
              src="/images/meat 1.svg"
              alt="Large image"
              width={600}
              height={100}
              className="bg-Grey100 p-2 rounded-[16px]"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 mt-6">
            <h1 className="text-[20px] md:text-[31px] font-nunitoSans font-bold text-Grey500">
              Pepper mixed for soup - Elo
            </h1>
            <p className="text-LightGrey text-sm md:text-[25px] opacity-80 font-nunito">
              1 kilogram / Bag
            </p>
            {/* Quantity Selector & Price */}
            <div className="mt-4 flex items-center justify-between border border-Green500 p-3 rounded-[8px]">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrement}
                  className={`px-2 py-1 rounded-md font-extrabold ${
                    quantity > 1
                      ? "bg-Green500 text-Green50"
                      : "bg-Grey100 text-Green50"
                  }`}
                >
                  -
                </button>
                <span className=" text-[13px] font-nunitoSans text-Grey500">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="bg-Green500 text-Green50 px-2 py-1 rounded-md font-bold"
                >
                  +
                </button>
              </div>
              <p className="text-2xl font-bold text-Grey500">₦{totalPrice}</p>
            </div>
            {/* Add to Cart Button */}
            <button className="w-full bg-Green500 text-Grey500 font-bold py-2 rounded-[12px] hover:bg-Green600 h-[56px] mt-8">
              Add to cart
            </button>

            {/* Product Description */}
            <div className="mt-10">
              <h2 className="font-bold text-[20px] font-nunitoSans text-Grey400">
                Product Description
              </h2>
              <p className="text-[13px] font-nunitoSans text-Grey200">
                Your trusted source for fresh produce, essentials, bulk
                purchasing, and farming support—delivering quality, convenience,
                and customer satisfaction.
              </p>
            </div>
            {/* Contact Support */}
            <div className="mt-4 p-4 bg-Grey500 rounded-[12px]">
              <p className="mb-4 text-[16px] font-nunitoSans font-bold text-Grey50">
                Looking for more details about this item?
              </p>
              <p className="mb-4 text-[10px] text-Grey100">
                Anything you want to know? We're here for you, and we'll reply
                in 2 minutes or less.
              </p>
              <div className="">
                <a
                  href="#"
                  className="flex justify-center items-center space-x-4 text-Green500 font-semibold"
                >
                  <FaWhatsapp size={20} className="" />
                  <span className="">Send us a message</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* related products */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[28px]">
          <h1 className="text-Grey500 text-[20px] md:text-4xl font-nunito font-bold">
            Related Products
          </h1>
          <Link href="/products">
            <h1 className="text-Green500 text-[13px] md:text-[16px] font-nunitoSans">
              View All
            </h1>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-Green50 rounded-[16px] p-4 hover:border border-Grey300 hover:border-solid transition duration-200 ease-in-out"
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
              <div className="flex flex-col">
                <h3 className="mt-4 text-sm text-Grey400 font-bold">
                  {product.title}
                </h3>
                <p className=" text-Grey200">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="mt-2 text-Grey500 font-nunitoSans text-[16px] font-bold">
                  {product.price}
                </p>
                <Link
                  href={`/products/${product.id}`}
                  className=""
                  onClick={notify}
                >
                  <div className="rounded-full border border-Green500 p-2 text-Green500  hover:bg-Green500 hover:text-white cursor-pointer">
                    <FaShoppingCart className="w-4 h-4" />
                  </div>
                  <ToastContainer />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
