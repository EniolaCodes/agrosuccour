"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { PiFireTruck } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { FiMail, FiUser, FiMapPin, FiGlobe } from "react-icons/fi";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import ProgressIndicator from "@/components/ProgressIndicator";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const steps = ["DELIVERY", "PAYMENT", "REVIEW"];
  const currentStep = 0;

  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  return (
    <div className="px-4 md:px-20 py-8 ">
      <div className="flex flex-row space-x-6">
        <div className="bg-white flex-1 p-6 shadow-md rounded-[28px]">
          {/* Progress Bar */}
          <div className="">
            <ProgressIndicator steps={steps} currentStep={currentStep} />
          </div>
          <h2 className="text-2xl font-nunito text-Grey500 font-bold mt-6">
            Shipping Information
          </h2>
          {/* Delivery Method */}
          <div className="flex h-[100px] gap-4 mt-12">
            <button
              className={`flex-1 py-2 border rounded-[12px] ${
                deliveryMethod === "delivery"
                  ? "bg-Grey100 border border-Grey50"
                  : "bg-white border-Grey50"
              }`}
              onClick={() => setDeliveryMethod("delivery")}
            >
              <span className="flex items-center justify-center gap-2 text-Grey500 text-[16px] font-nunito">
                {deliveryMethod === "delivery" ? (
                  <>
                    <div className="relative w-6 h-6 rounded-full border-2 border-Green500 font-bold">
                      <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-Green500" />
                    </div>
                  </>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-Grey300" />
                )}
                <PiFireTruck size={20} className="" />
                Delivery
              </span>
            </button>
            <button
              className={`flex-1 py-2 border rounded-[12px] ${
                deliveryMethod === "pickup"
                  ? "bg-Grey100 border border-Grey50"
                  : "bg-white border-Grey50"
              }`}
              onClick={() => setDeliveryMethod("pickup")}
            >
              <span className="flex items-center justify-center gap-2 text-Grey500 text-[16px] font-nunito">
                {deliveryMethod === "pickup" ? (
                  <>
                    <div className="relative w-6 h-6 rounded-full border-2 border-Green500 font-bold">
                      <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-Green500" />
                    </div>
                  </>
                ) : (
                  <div className="w-6 h-6 rounded-full border border-Grey300" />
                )}
                <BsBoxSeam size={20} />
                Pick up
              </span>
            </button>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
            {/* Full Name */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Full Name / Company Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  type="text"
                  className={`w-full pl-10 p-4 border rounded-lg focus:outline-none ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Yussuf Olabayo"
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  className={`w-full pl-10 p-4 border rounded-lg focus:outline-none ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="example123@gmail.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Phone Number */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Phone Number
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field }) => (
                  <div className="relative">
                    <PhoneInput
                      {...field}
                      country={"ng"} // Default country
                      placeholder="8000000000"
                      containerClass="w-full"
                      inputClass={`w-full pl-10 px-4 py-4 border rounded-lg focus:outline-none ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            {/* Address */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                City Address
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  {...register("address", { required: "Address is required" })}
                  type="text"
                  className={`w-full pl-10 p-4 border rounded-lg focus:outline-none ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Address"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
            {/* State */}
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">State</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  {...register("state", { required: "State is required" })}
                  className={`w-full pl-10 p-4 border rounded-lg focus:outline-none ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="Oyo">Oyo</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Kano">Kano</option>
                </select>
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Continue to Payment
            </button>
          </form>
        </div>
        {/* right side */}
        <div className="hidden md:flex flex-col gap-6">
          {/* Order Summary */}
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
            <Link href="/checkout">
              <button className="mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
                Save and Continue
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
    </div>
  );
};

export default Checkout;
