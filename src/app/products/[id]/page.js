"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

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
  return (
    <div className="px-4 md:px-20 py-8">
      <div className="bg-Green50 rounded-lg p-4 flex flex-col md:flex-row md:space-x-8">
        {/* <h1 className="text-Grey500 text-xl font-semibold">Product Details</h1> */}
        {/* Sidebar for smaller images */}
        <div className="hidden md:flex md:flex-col md:space-y-4">
          <Image
            src="/images/meat 1.svg"
            alt="meat"
            width={200}
            height={100}
            className="bg-Grey300 p-2 rounded-lg"
          />
          <Image
            src="/images/meat 1.svg"
            alt="meat"
            width={200}
            height={100}
            className="bg-Grey300 p-2 rounded-lg"
          />
          <Image
            src="/images/meat 1.svg"
            alt="meat"
            width={200}
            height={100}
            className="bg-Grey300 p-2 rounded-lg"
          />
        </div>
        <div className="flex-1">
          {/* Large Image */}
          <div className="">
            <Image
              src="/images/meat 1.svg"
              alt="meat"
              width={600}
              height={440}
              className="bg-Grey300 p-2 rounded-lg"
            />
          </div>
          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Pepper mixed for soup - Elo
            </h1>
            <p className="text-gray-600">1 kilogram / Bag</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6 mt-8 bg-Green50 p-4 rounded-2xl">
        <h1 className="text-Grey500 text-2xl font-semibold">
          Related Products
        </h1>
        <Link href="/products">
          <h1 className="text-Green500">View All</h1>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
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
    </div>
  );
};

export default ProductDetails;

{
  /* Product Info */
}
<div className="space-y-4">
  <h1 className="text-2xl font-bold text-gray-800">
    Pepper mixed for soup - Elo
  </h1>
  <p className="text-gray-600">1 kilogram / Bag</p>

  {/* Quantity Selector & Dynamic Price */}
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
      <button
        onClick={handleDecrement}
        className="w-8 h-8 bg-gray-200 text-gray-700 rounded-md font-bold"
      >
        -
      </button>
      <span className="text-gray-800">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="w-8 h-8 bg-gray-200 text-gray-700 rounded-md font-bold"
      >
        +
      </button>
    </div>
    <p className="text-2xl font-semibold text-green-600">₦{totalPrice}</p>
  </div>

  {/* Add to Cart Button */}
  <button className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600">
    Add to cart
  </button>

  {/* Product Description */}
  <div>
    <h2 className="font-bold text-gray-800">Product Description</h2>
    <p className="text-gray-600">
      Your trusted source for fresh produce, essentials, bulk purchasing, and
      farming support—delivering quality, convenience, and customer
      satisfaction.
    </p>
  </div>

  {/* Contact Support */}
  <div className="mt-4 p-4 bg-gray-100 rounded-md">
    <p className="text-gray-700">
      Looking for more details about this item? Anything you want to know? We're
      here for you, and we'll reply in 2 minutes or less.
    </p>
    <a href="#" className="flex items-center mt-2 text-green-600 font-semibold">
      <span className="mr-2">📩</span> Send us a message
    </a>
  </div>
</div>;
