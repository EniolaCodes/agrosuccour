"use client";
import Image from "next/image";
import Link from "next/link";

const OrderCompleted = () => {
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
      <div className="flex flex-col md:flex-row space-x-6">
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[28px]">
            <h1 className="text-Grey500 font-semibold font-nunito text-[25px]">
              Order Completed
            </h1>
            <p className="text-Grey400 text-[13px]">8 items</p>
          </div>
          <div className="bg-white  p-6 shadow-md rounded-[28px]">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center border-b border-gray-300 py-4"
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
                <div className="flex flex-col items-center">
                  <span className="bg-Green900 text-white text-xs font-bold px-2 py-1 ml-10  rounded-full mb-4">
                    {product.quantity}
                  </span>
                  <p className="text-[20px] font-bold text-Grey500">
                    ₦{product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* right side */}
        <div className="">
          <div className="w-[350px] bg-white rounded-[28px] p-6 shadow-lg mt-10 md:mt-0 ml-10 md:ml-0">
            <h2 className="text-[25px] font-bold font-nunito mb-4 text-[#000000] text-center">
              Payment details
            </h2>
            <div className="">
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400">Account name:</span>
                <span className="text-Grey500 font-bold">Yussuf Olabayo</span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400 ">Account number:</span>
                <span className="text-Grey500 font-bold">123456789</span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400 ">Date:</span>
                <span className="text-Grey500 font-bold">15th Nov, 2024</span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400">Time:</span>
                <span className="text-Grey500 font-bold">01:08 PM</span>
              </div>
              <div className="flex justify-between items-center text-[13px] font-nunitoSans mb-4">
                <span className="text-Grey400 ">Order ID:</span>
                <span className="text-Grey500 font-bold">AgS123456789Or</span>
              </div>
            </div>
            <hr className="my-4 border-Grey-50" />
            <p className="text-[31px] font-nunitoSans text-center font-bold text-Green900">
              ₦102,000
            </p>
            <hr className="my-4 border-Grey-50" />
            <div className="mt-4">
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
          <div className="ml-10">
            <button className="mt-4 ml-10 md:ml-0 w-[260px] h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
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
        <div className="p-8">
          <button className=" mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
            Continue shopping
          </button>
        </div>
      </Link>
    </div>
  );
};

export default OrderCompleted;
