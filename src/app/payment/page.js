"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiMail, FiUser, FiMapPin, FiPhone, FiCopy } from "react-icons/fi";
import { BsQuestionLg } from "react-icons/bs";
import { RiCalendarEventFill } from "react-icons/ri";
import ProgressIndicator from "@/components/ProgressIndicator";

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("debit-card");
  const [saveCard, setSaveCard] = useState(true);

  const bankDetails = [
    "AGROSUCCOUR | 2000000020 | UBA Plc, Nigeria",
    "AGROSUCCOUR | 2000000021 | UBA Plc, Nigeria",
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const [addresses, setAddresses] = useState([
    {
      name: "Yussuf Olabayo",
      email: "example123@gmail.com",
      address: "Idi Oji junction, Ologuneru, Ibadan-Eruwa Expy, Ibadan. OYO",
      phone: "+2348000000000",
      country: "Nigeria",
    },
  ]);
  const router = useRouter();

  const redirectToCheckout = () => {
    router.push("/checkout");
  };

  // Delete all addresses
  const handleDeleteAll = () => {
    setAddresses([]); // Clear all addresses
  };

  const steps = ["DELIVERY", "PAYMENT", "REVIEW"];
  const currentStep = 1;

  return (
    <div className="px-4 md:px-52 py-8 ">
      <div className="flex flex-row space-x-6">
        <div className="bg-white flex-1 p-6 shadow-md rounded-[28px]">
          {/* Progress Bar */}
          <div className="">
            <ProgressIndicator steps={steps} currentStep={currentStep} />
          </div>
          {/* shipping info */}
          <section>
            <h2 className="text-[25px] font-nunito font-bold mb-4">
              Where to send your order
            </h2>
            <div className="">
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-[8px] shadow mb-4 bg-Green100"
                  >
                    <div className="flex justify-between font-nunitoSans mb-2">
                      <h3 className="text-[20px] text-Grey500 ">
                        {address.name}
                      </h3>
                      <div className="flex space-x-4 text-[13px]">
                        <button
                          onClick={redirectToCheckout}
                          className="text-Green900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDeleteAll}
                          className="text-Grey200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="bg-Grey200 w-full h-px mb-2" />
                    <div className="space-y-2 text-Grey400 text-[13px]">
                      <div className="flex items-center space-x-2">
                        <FiUser />
                        <p className=" ">{address.name}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiMail />
                        <p className="">{address.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiMapPin />
                        <p className="">{address.address}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiPhone />
                        <p className="">{address.phone}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Image
                          src="/images/nigeria 1.svg"
                          width={20}
                          height={20}
                          alt=""
                        />
                        <p className="">{address.country}</p>
                      </div>
                    </div>
                    <div className="bg-Grey200 w-full h-px mt-2" />
                    <button
                      onClick={redirectToCheckout}
                      className="mt-4 text-Green900 text-[16px] flex items-center space-x-2"
                    >
                      <span>+</span>
                      <p className="">Add a new Address</p>
                    </button>
                  </div>
                ))
              ) : (
                <button
                  onClick={redirectToCheckout}
                  className="mt-4 bg-Green300 p-4 text-Green900 font-semibold w-full rounded-[8px] text-[16px] flex items-center space-x-2"
                >
                  <span>+</span>
                  <p className="">Add a new Address</p>
                </button>
              )}
            </div>
            {/* Payment Method Section */}
            <section className="mt-8">
              <div>
                <h2 className="text-[25px] font-nunito text-Grey500 font-bold mb-2">
                  Choose a payment method
                </h2>
                <p className="text-[11px] font-nunitoSans text-Grey400 mb-6 w-[397px]">
                  You will not be charged until you review this order on the
                  next page. All transactions are secure and encrypted.
                </p>
              </div>
              {/* payment option */}
              <div className="space-y-4">
                <div
                  onClick={() => setSelectedPaymentMethod("debit-card")}
                  className={`mb-8 border hover:border-Grey400  bg-Grey200 ${
                    selectedPaymentMethod === "debit-card"
                      ? " border"
                      : "border-gray-300"
                  } p-4 rounded-[8px] flex justify-between items-center cursor-pointer`}
                >
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment-method"
                      checked={selectedPaymentMethod === "debit-card"}
                      onChange={() => setSelectedPaymentMethod("debit-card")}
                      className="accent-green-500"
                    />
                    <span className="text-[16px] text-Grey500 font-nunitoSans font-bold">
                      Debit Card
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Image
                      src="/images/mastercard.svg"
                      alt="master card"
                      width={50}
                      height={50}
                    />
                    <Image
                      src="/images/visa.svg"
                      alt="visa card"
                      width={50}
                      height={50}
                    />
                    <Image
                      src="/images/verve.svg"
                      alt="verve card"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>

                {/* Debit Card Details */}
                {selectedPaymentMethod === "debit-card" && (
                  <div className="space-y-4">
                    <div className="relative">
                      <FiMail className="absolute left-3 top-[43px] transform -translate-y-1/2 text text-Grey200" />
                      <p>Card Number</p>
                      <input
                        type="text"
                        placeholder="5199 8080 8080 8080"
                        className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="flex space-x-4 w-full">
                      <div className="flex-1 flex-row">
                        <p>Expiration date</p>
                        <div className="relative">
                          <RiCalendarEventFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                          <select className="w-1/2 border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-green-500">
                            <option>MM</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                          </select>
                          <RiCalendarEventFill className="absolute left-[280px] top-1/2 transform -translate-y-1/2 text-Grey200" />
                          <select className="w-1/2 border border-gray-300 rounded-md p-2 pl-12 focus:ring-2 focus:ring-green-500">
                            <option>YY</option>
                            <option>2024</option>
                            <option>2025</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <p>CRV</p>
                        <input
                          type="text"
                          placeholder="572"
                          className="w-1/3 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-green-500"
                        />
                        <BsQuestionLg
                          size={20}
                          className="absolute transform -translate-y-1/2 bottom-1 left-36 bg-Grey200 rounded-full p-1 text-white "
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                      <input
                        type="text"
                        className="w-full pl-10 p-4 font-nunitoSans border rounded-lg focus:outline-none"
                        placeholder="Yussuf Olabayo"
                      />
                    </div>
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={() => setSaveCard(!saveCard)}
                        className="accent-Green500"
                      />
                      <span>Save Card</span>
                    </label>
                  </div>
                )}
                {/* bank transfer */}
                <div
                  onClick={() => setSelectedPaymentMethod("bank-transfer")}
                  className={`border ${
                    selectedPaymentMethod === "bank-transfer" ? "" : ""
                  } p-4 rounded-md flex items-center cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    checked={selectedPaymentMethod === "bank-transfer"}
                    onChange={() => setSelectedPaymentMethod("bank-transfer")}
                    className="accent-green-500"
                  />
                  <span className="ml-2 text-sm font-medium">
                    Direct bank transfer
                  </span>
                </div>
                {/* Bank Transfer Details */}
                {selectedPaymentMethod === "bank-transfer" && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-4">
                      To complete your order, please pay directly into our
                      account. Use your Order ID as a reference. Your order will
                      ship as soon as we confirm your payment.
                    </p>
                    <div className="flex flex-col space-y-4">
                      {bankDetails.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{detail}</span>
                          <FiCopy
                            size={20}
                            className="text-gray-500 cursor-pointer"
                            onClick={() => handleCopy(detail)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </section>
        </div>
        {/* right side */}
      </div>
    </div>
  );
};

export default Payment;
