"use client";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopSellingProducts = () => {
  const products = Array(6).fill({
    image: "/images/chicken.svg",
    title: "Product Name",
    description: "15g",
    price: "₦10,000.00",
  });

  const notify = () => toast("One item has been added to cart!");

  return (
    <div className="px-4 md:px-20 py-8">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[28px]">
        <h1 className="text-Grey500 text-4xl font-nunito font-bold">
          Top Selling Products
        </h1>
        <Link href="/products">
          <h1 className="text-Green500 text-[16px] font-nunitoSans">
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
              <Link href="/" className="" onClick={notify}>
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
  );
};

export default TopSellingProducts;
