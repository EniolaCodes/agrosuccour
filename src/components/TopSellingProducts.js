"use client";
import Image from "next/image";
import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TopSellingProducts = () => {
  const products = Array(6).fill({
    image: "/images/chicken.svg",
    title: "Product Name",
    description: "15g",
    price: "₦10,000.00",
  });

  const notify = (event) => {
    toast("Cart successfully updated");
  };
  const handleCartClick = (event) => {
    event.preventDefault(); // Prevent default Link behavior
    notify(event);
  };

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
      <div className="bg-white rounded-[28px] px-6 py-8 grid grid-cols-2 md:grid-cols-6 gap-6 overflow-y-scroll">
        {products.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={index}
            className="bg-white rounded-[16px] p-4 shadow-custom hover:shadow-custom-hover transition-shadow duration-300"
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
              <p className="mt-2 text-Grey500 font-nunitoSans text-[20px] font-bold">
                {product.price}
              </p>

              <div
                onClickCapture={handleCartClick}
                className="rounded-full border border-Green500 p-2 text-Green500  hover:bg-Green500 hover:text-white cursor-pointer"
              >
                <MdAddShoppingCart className="text-[20px]" />
              </div>
            </div>
          </Link>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default TopSellingProducts;
