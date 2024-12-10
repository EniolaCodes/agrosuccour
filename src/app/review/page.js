"use client";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { PiFireTruck } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import ProgressIndicator from "@/components/ProgressIndicator";

const Review = () => {
  const steps = ["DELIVERY", "PAYMENT", "REVIEW"];
  const currentStep = 2;

  const products = [
    {
      id: 1,
      image: "/images/elo.svg",
      name: "Pepper mixed for soup - Elo",
      weight: "1 kilogram / Bag",
      price: "1,200.99",
      quantity: 1,
    },
    {
      id: 2,
      image: "/images/chicken.svg",
      name: "Full Chicken",
      weight: "2 kilogram",
      price: "1,200.99",
      quantity: 2,
    },
    {
      id: 3,
      image: "/images/fish.svg",
      name: "Pepper mixed for soup - Elo",
      weight: "1 kilogram / Bag",
      price: "1,200.99",
      quantity: 1,
    },
  ];

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
              <p className="text-Grey400 text-[13px]">8 items</p>
            </div>
          </div>
          <div className="bg-white  p-6 shadow-md rounded-[28px]">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center relative border-b border-gray-300 py-4"
              >
                <div className="">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={124}
                    height={80}
                    className=" object-cover rounded-md"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-[20px] text-Grey500 font-bold">
                    {product.name}
                  </h3>
                  <p className="text-[16px] text-Grey400">{product.weight}</p>
                </div>
                <span className="bg-[#F26262] text-white text-xs font-bold absolute px-2 py-1 top-2 right-0 rounded-full mb-4">
                  {product.quantity}
                </span>
                <div className="flex items-center">
                  <p className="text-[20px] font-bold text-Grey500">
                    ₦{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* order summary */}
        <div className="hidden md:flex flex-col gap-6">
          <div className="w-[350px] pt-6 bg-white p-4 rounded-[28px] shadow-md flex flex-col space-y-12">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-[20px] text-Grey500 font-bold">
                Order summary
              </h2>
              <p className="text-Grey400 text-[13px]">8 items</p>
            </div>

            <div className="mb-4 border-b pb-2 font-nunitoSans">
              <p className="text-Grey500 text-[16px]">Delivery fees:</p>
              <p className="text-[11px] text-Grey300 w-[260px]">
                Your trusted source for fresh produce, essentials, bulk
                purchasing, and farming
              </p>
            </div>

            <div className="flex justify-between items-center text-[16px]  text-Grey400 border-b pb-2">
              <p>Subtotal:</p>
              <p>₦6000</p>
            </div>

            <div className="flex justify-between items-center text-Grey400 text-[16px] border-b pb-2">
              <p>Other fees:</p>
              <p>₦0.00</p>
            </div>

            <div className="flex justify-between items-center text-Grey400 font-bold text-[16px] font-nunitoSans border-b pb-2">
              <p className="">Total:</p>
              <p>₦7000</p>
            </div>
            <Link href="/ordercompleted">
              <button className="hidden md:block mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
                Place your order
              </button>
            </Link>
          </div>
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
        href="/ordercompleted"
        className="block md:hidden mt-8 bg-Green50 fixed bottom-0 w-full"
      >
        <div className="p-8">
          <button className=" mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
            Place your order
          </button>
        </div>
      </Link>
    </div>
  );
};
export default Review;
