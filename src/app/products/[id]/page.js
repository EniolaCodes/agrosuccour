"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useGetProducts } from "@/lib/models/product/hooks";
import { useGetSingleProducts } from "@/lib/models/product/hooks";
import { FaWhatsapp } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const productId = useParams("id");
  console.log(productId, "product id is here");
  const {
    data: fetchProductDetail,
    isLoading,
    isError,
    error,
  } = useGetSingleProducts({
    productId: productId.id,
  });

  const { data: fetchProducts } = useGetProducts({
    params: "?limit=6",
  });
  const allproducts = fetchProducts?.result?.data;
  console.log(allproducts, "this is all");

  const singleProduct = fetchProductDetail?.result?.data;
  console.log(singleProduct, "our single product");
  const pricePerUnit = 1200.99;

  const totalPrice = (quantity * pricePerUnit).toFixed(2);

  // Handlers for increment and decrement
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const products = Array(6).fill({
    id: Math.random(),
    image: "/images/chicken.svg",
    title: "Product Name",
    description: "15g",
    price: "₦10,000.00",
  });

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
    <div className="px-4 md:px-20 py-8 min-h-screen">
      <div className="bg-white rounded-[28px] p-4">
        <h1 className=" text-Grey500 text-xl font-bold mb-1">
          Product details
        </h1>
        <div className=" flex flex-col md:flex-row md:space-x-8">
          {/* Sidebar for smaller images */}
          <div className="hidden md:flex md:flex-col md:space-y-4 mt-2 ">
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
            {/* {[1, 2, 3].map((_, index) => (
              <Image
                key={index}
                src={singleProduct?.imageUrl}
                alt={`Product Image ${index + 1}`}
                width={170}
                height={100}
                className="bg-Grey100 p-2 rounded-[16px]"
              />
            ))} */}
          </div>

          {/* Large Image */}
          <div className="flex-1">
            {singleProduct}
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
            <h1 className="text-[20px] mb-2 md:text-[31px] font-nunitoSans font-bold text-Grey500">
              Pepper mixed for soup - Elo
            </h1>
            <p className="text-LightGrey text-sm md:text-[25px] opacity-80 font-nunito">
              1 kilogram / Bag
            </p>
            {/* Quantity Selector & Price */}
            <div className="mt-6 flex items-center justify-between border border-Green500 p-3 rounded-[8px]">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrement}
                  className={`px-2 py-1 rounded-md font-extrabold ${
                    quantity > 1
                      ? "bg-Green500 text-Green50"
                      : "bg-Green200 text-Green50"
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
            <Link href="/cart">
              <button className="flex items-center justify-center gap-4 w-full bg-Green500 text-white font-bold py-2 rounded-[12px] hover:bg-Green600 h-[56px] mt-8">
                <MdAddShoppingCart className="text-[20px]" />
                <span>Add to cart</span>
              </button>
            </Link>
            {/* Product Description */}
            <div className="mt-16">
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
            <div className="flex flex-col items-center mt-4 p-4 bg-Grey400 rounded-[12px]">
              <p className="mb-4 text-[16px] font-nunitoSans font-bold text-Grey50">
                Looking for more details about this item?
              </p>
              <p className="mb-4 text-[9px] md:text-[10px] text-Grey100">
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
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[28px] overflow-y-scroll">
          <h1 className="text-Grey500 text-[20px] md:text-4xl font-nunito font-bold">
            Related Products
          </h1>
          <Link href="/products">
            <h1 className="text-Green500 hover:text-Green800 text-[13px] md:text-[16px] font-nunitoSans">
              View All
            </h1>
          </Link>
        </div>
        <div className="bg-white rounded-[28px] px-6 py-8 grid grid-cols-2 md:grid-cols-6 gap-6">
          {allproducts.map((product, index) => (
            <Link
              href={`/products/${product.product_id}`}
              key={index}
              className="bg-white rounded-[16px] p-4 hover:shadow-customHover transition-shadow duration-300"
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
    </div>
  );
};

export default ProductDetails;
