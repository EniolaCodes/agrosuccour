"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/components/providers/SessionProvider";
import { useFetchCartProducts } from "@/lib/models/product/hooks";
import { useCart } from "../context/CartContext";
import { useShipping } from "../context/ShippingContext";

const OrderCompleted = () => {
  const { cart, formatPrice } = useCart();
  const { shippingDetails } = useShipping();

  const sessionId = useSession();
  useEffect(() => {}, [sessionId]);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const {
    data: cartedProducts = [],
    isLoading,
    isError,
    refetch: refetchCartProducts,
  } = useFetchCartProducts(cartItems);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedCart = JSON.parse(localStorage.getItem("cart")) || {
      items: [],
    };
    setCartItems(storedCart.items);
  }, []);

  useEffect(() => {
    if (cartItems.length) {
      refetchCartProducts();
    }
  }, [cartItems, refetchCartProducts]);

  useEffect(() => {
    if (cartedProducts.length) {
      setProducts(cartedProducts);
    }
  }, [cartedProducts]);

  const totalPrice = products.reduce(
    (total, product) =>
      total + (product?.result?.data?.price || 0) * (product?.quantity || 0),
    0
  );

  return (
    <div className="px-4 md:px-52 py-8 ">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[28px]">
            <h1 className="text-Grey500 font-semibold font-nunito text-[25px]">
              Order Completed
            </h1>
            <p className="text-Grey400 text-[13px]">{products.length} items</p>
          </div>
          <div className="bg-white  p-6 shadow-md rounded-[28px]">
            {" "}
            {products.map((product) => (
              <div
                key={product?.result?.data?.product_id}
                className="flex items-center relative border-b border-gray-300 py-4"
              >
                <div className="">
                  <Image
                    src={product?.result?.data?.image_url}
                    alt={product?.result?.data?.product_name}
                    width={124}
                    height={80}
                    className="rounded-md"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-[20px] text-Grey500 font-bold">
                    {product?.result?.data?.product_name}
                  </h3>
                  <p className="text-[16px] text-Grey400">
                    {product?.quantity} kilogram / Bag
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-[20px] font-bold text-Grey500">
                    ₦
                    {(
                      (product?.result?.data?.price || 0) *
                      (product?.quantity || 0)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* right side */}
        <div className="">
          <div className=" bg-white rounded-[28px] p-4 shadow-lg mt-10 md:mt-0 ">
            <h2 className="text-[25px] font-bold font-nunito mb-4 text-[#000000] text-center">
              Order details
            </h2>
            <div className="">
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400">Account name:</span>
                <span className="text-Grey500 font-bold">
                  {shippingDetails?.fullName}
                </span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400 ">Account number:</span>
                <span className="text-Grey500 font-bold">123456789</span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400 ">Date:</span>
                <span className="text-Grey500 font-bold">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400">Time:</span>
                <span className="text-Grey500 font-bold">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400 ">Order ID:</span>
                <span className="text-Grey500 font-bold">AgS123456789Or</span>
              </div>
            </div>
            <hr className="my-4 border-Grey-50" />
            <p className="text-[31px] font-nunitoSans text-center font-bold text-Green900">
              ₦{formatPrice(cart.total_amount)}
            </p>

            <hr className="my-4 border-Grey-50" />
            <div className="mt-4 flex flex-col items-center justify-center">
              <Image
                src="/images/barcode.svg"
                width={350}
                height={95}
                alt="barcode"
              />
              <p className="text-Grey300 text-[10px] mt-2 text-center">
                123 456 789 101 112 131
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={() => window.print()}
              className="mt-4  w-[260px] h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition"
            >
              Download receipt
            </button>
            <Link href="/products">
              <button className="hidden md:block mt-4 w-[260px] h-[44px] bg-Green50 text-Green900 text-[16px] font-bold py-2 rounded-md hover:bg-Green100 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Link
        href="/products"
        className="block md:hidden bg-Green50 fixed bottom-0 w-full"
      >
        <div className="w-full">
          <button className=" mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold p-8 rounded-md hover:bg-Green600 transition">
            Continue shopping
          </button>
        </div>
      </Link>
    </div>
  );
};

export default OrderCompleted;
