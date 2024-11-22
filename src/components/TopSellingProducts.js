"use client";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const TopSellingProducts = () => {
  const products = Array(6).fill({
    image: "/images/chicken.svg",
    title: "Product Name",
    description: "15g",
    price: "₦10,000.00",
  });
  return (
    <div className="px-4 md:px-20 py-8">
      <div className="flex justify-between items-center mb-6 bg-Green50 p-4 rounded-2xl">
        <h1 className="text-Grey500 text-xl font-semibold">
          Top Selling Products
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

export default TopSellingProducts;
