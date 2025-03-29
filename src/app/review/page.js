"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { PiFireTruck } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import ProgressIndicator from "@/components/ProgressIndicator";
import { useSession } from "@/components/providers/SessionProvider";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/app/context/CartContext";
import { useFetchCartProducts } from "@/lib/models/product/hooks";

const Review = () => {
  const steps = ["DELIVERY", "REVIEW", "PAYMENT"];
  const currentStep = 1;

  const sessionId = useSession();
  useEffect(() => {
    console.log("Session ID in Review Page:", sessionId);
    // Fetch review data associated with the sessionId
  }, [sessionId]);

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const {
    data: cartedProducts = [],
    isLoading,
    isError,
    refetch: refetchCartProducts,
  } = useFetchCartProducts(cartItems);

  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure client-side execution

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
      <div className="flex flex-row space-x-6">
        <div className="flex flex-col flex-1">
          <div className=" mb-6 bg-white p-4 rounded-[28px]">
            {/* Progress Bar */}
            <div className="w-full flex justify-center">
              <ProgressIndicator steps={steps} currentStep={currentStep} />
            </div>
            <div className="flex justify-between items-center mt-4">
              <h1 className="text-Grey500 font-semibold font-nunito text-[25px]">
                Review your order
              </h1>
              <p className="text-Grey400 text-[13px]">
                {products.length} items
              </p>
            </div>
          </div>
          <div className="bg-white  p-6 shadow-md rounded-[28px]">
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
                {/* <span className="bg-[#F26262] text-white text-xs font-bold absolute px-2 py-1 top-2 right-0 rounded-full mb-4">
                  {product.quantity}
                </span> */}
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
        {/* order summary */}
        <div className="hidden md:flex flex-col gap-6">
          <OrderSummary products={products} totalPrice={totalPrice} />

          <div className="bg-Grey400 rounded-[28px] p-4 w-[350px]">
            <div className="">
              <div className="flex space-x-8">
                <PiFireTruck
                  size={20}
                  className="text-Green500 font-semibold"
                />
                <div className="font-nunitoSans space-y-2 mb-6">
                  <h1 className="text-Green400 text-bold text-[16px] ">
                    Quick Delivery
                  </h1>
                  <p className="text-Grey50 text-[13px]">
                    Efficient order processing and timely delivery
                  </p>
                </div>
              </div>
              <hr className="w-full bg-Grey100" />
            </div>
            <div className="mt-6">
              <div className="flex space-x-8">
                <MdOutlinePayment
                  size={20}
                  className="text-Green500 font-semibold"
                />
                <div className="font-nunitoSans space-y-2">
                  <h1 className="text-Green400 text-bold text-[16px] ">
                    Secured Payment
                  </h1>
                  <p className="text-Grey50 text-[13px]">
                    Secure payment processing for your peace of mind.
                  </p>
                </div>
              </div>
              <hr className="w-full bg-Grey100 mt-6" />
            </div>
            <div className="mt-6">
              <div className="flex space-x-8">
                <FaWhatsapp size={20} className="text-Green500 font-semibold" />
                <div className="font-nunitoSans space-y-2">
                  <h1 className="text-Green400 text-bold text-[16px] ">
                    Contact us
                  </h1>
                  <p className="text-Grey50 text-[13px]">
                    Reach out on +2340706375930. We will reply in 2mins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        href="/payment"
        className="block md:hidden mt-8 bg-Green50 fixed bottom-0 w-full"
      >
        <div className="p-8">
          <button className=" mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
            Proceed to Payment
          </button>
        </div>
      </Link>
    </div>
  );
};
export default Review;
