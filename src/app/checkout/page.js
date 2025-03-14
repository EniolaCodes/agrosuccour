"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { PiFireTruck } from "react-icons/pi";
import { BsBoxSeam } from "react-icons/bs";
import { FiMail, FiUser, FiMapPin, FiGlobe } from "react-icons/fi";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/app/context/CartContext";
import {
  useFetchCartProducts,
  useFetchLogistics,
  useFetchLogisticsByLocation,
  useFetchLogisticsPrice,
} from "@/lib/models/product/hooks";
import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { removeItemFromCart } = useCart();

  const {
    data: cartedProducts = [],
    isLoading,
    isError,
    refetch: refetchCartProducts,
  } = useFetchCartProducts(cartItems);

  const { data: locations = [] } = useFetchLogistics();
  const { data: logisticsOptions = [] } = useFetchLogisticsByLocation({
    from: fromLocation,
  });
  const { data: logisticsPrice = 0 } = useFetchLogisticsPrice({
    from: fromLocation,
    to: toLocation,
  });
  console.log(locations);

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
        <div className="bg-white flex-1 p-6 shadow-md rounded-[28px]">
          {/* Progress Bar */}
          <div className="w-full flex justify-center">
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
                  ? "bg-Grey50 border border-Grey400"
                  : "bg-white border-Grey100"
              }`}
              onClick={() => setDeliveryMethod("delivery")}
            >
              <span className="flex items-center justify-center gap-2 text-Grey500 text-[16px] font-nunito">
                <div className="flex items-center space-x-6">
                  {deliveryMethod === "delivery" ? (
                    <>
                      <div className="relative w-6 h-6 rounded-full border-2 border-Green500 font-bold">
                        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-Green500" />
                      </div>
                    </>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-Grey300" />
                  )}
                  <div className="flex items-center space-x-2">
                    <PiFireTruck size={20} className="" />
                    <p>Delivery</p>
                  </div>
                </div>
              </span>
            </button>
            <button
              className={`flex-1 py-2 border rounded-[12px] ${
                deliveryMethod === "pickup"
                  ? "bg-Grey50 border border-Grey400"
                  : "bg-white border-Grey100"
              }`}
              onClick={() => setDeliveryMethod("pickup")}
            >
              <span className="flex items-center justify-center gap-2 text-Grey500 text-[16px] font-nunito">
                <div className="flex items-center space-x-6">
                  {deliveryMethod === "pickup" ? (
                    <>
                      <div className="relative w-6 h-6 rounded-full border-2 border-Green500 font-bold">
                        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-Green500" />
                      </div>
                    </>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-Grey300" />
                  )}
                  <div className="flex items-center space-x-2">
                    <BsBoxSeam size={20} />
                    <p>Pick up</p>
                  </div>
                </div>
              </span>
            </button>
          </div>
          {deliveryMethod === "delivery" ? (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              {/* Full Name */}
              <div className="mb-4">
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  Full Name / Company Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    className={`w-full pl-10 p-4 font-nunitoSans border rounded-lg focus:outline-none ${
                      errors.fullName
                        ? "border-red-500"
                        : "border-Grey200 hover:border-Grey400 "
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
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="email"
                    className={`w-full pl-10 p-4 font-nunitoSans  border rounded-[8px] focus:outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-Grey200 hover:border-Grey400"
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
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <div className="relative custom-phone-input">
                      <PhoneInput
                        {...field}
                        country={"ng"} // Default country
                        placeholder="8000000000"
                        containerClass={"w-full"}
                        inputClass={`w-full  border font-nunitoSans rounded-lg focus:outline-none ${
                          errors.phone
                            ? "border-red-500"
                            : "border-Grey200 hover:border-Grey400"
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
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  City Address
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                  <input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    className={`w-full pl-10 p-4 border font-nunitoSans rounded-lg focus:outline-none ${
                      errors.address
                        ? "border-red-500"
                        : "border-Grey200 hover:border-Grey400"
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
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  State
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                  <select
                    {...register("state", { required: "State is required" })}
                    className={`w-full pl-10 p-4 border  font-nunitoSans rounded-lg focus:outline-none ${
                      errors.state
                        ? "border-red-500"
                        : "border-Grey200 hover:border-Grey400"
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
                {/* location */}
                <div className="mt-6">
                  <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                    From
                  </label>
                  <select
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="w-full p-4 border border-Grey200 hover:border-Grey400  font-nunitoSans rounded-lg focus:outline-none "
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.name}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <label className="block mt-4 mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                    To
                  </label>
                  <select
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="w-full p-4 border border-Grey200 hover:border-Grey400 font-nunitoSans rounded-lg focus:outline-none"
                  >
                    <option value="">Select Destination</option>
                    {logisticsOptions.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <h1 className="mt-4 text-xl font-bold text-Grey500">
                    Logistics Price: ₦{logisticsPrice}
                  </h1>
                </div>
              </div>
              <Link href="/payment">
                <button className="md:hidden mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
                  Save and Continue
                </button>
                <div className="flex justify-end">
                  <button className=" hidden md:block mt-4 w-[217px] h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
                    Save and Continue
                  </button>
                </div>
              </Link>
            </form>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
              {/* Full Name */}
              <div className="mb-4">
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  Full Name / Company Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                  <input
                    {...register("fullName", {
                      required: "Full name is required",
                    })}
                    type="text"
                    className={`w-full pl-10 p-4 font-nunitoSans border rounded-lg focus:outline-none ${
                      errors.fullName
                        ? "border-red-500"
                        : "border-Grey200 hover:border-Grey400 "
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
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    type="email"
                    className={`w-full pl-10 p-4 font-nunitoSans  border rounded-[8px] focus:outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-Grey200 hover:border-Grey400"
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
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  Phone Number
                </label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <div className="relative custom-phone-input">
                      <PhoneInput
                        {...field}
                        country={"ng"} // Default country
                        placeholder="8000000000"
                        containerClass={"w-full"}
                        inputClass={`w-full  border font-nunitoSans rounded-lg focus:outline-none ${
                          errors.phone
                            ? "border-red-500"
                            : "border-Grey200 hover:border-Grey400"
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
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  City Address
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                  <input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    className={`w-full pl-10 p-4 border font-nunitoSans rounded-lg focus:outline-none ${
                      errors.address
                        ? "border-red-500"
                        : "border-Grey200 hover:border-Grey400"
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
                <label className="block mb-2 font-bold text-Grey500 text-[16px] font-nunitoSans">
                  State
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                  <select
                    {...register("state", { required: "State is required" })}
                    className={`w-full pl-10 p-4 border  font-nunitoSans rounded-lg focus:outline-none ${
                      errors.state
                        ? "border-red-500"
                        : "border-Grey200 hover:border-Grey400"
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

              <Link href="/payment">
                <button className="md:hidden mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
                  Save and Continue
                </button>
                <div className="flex justify-end">
                  <button className=" hidden md:block mt-4 w-[217px] h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
                    Save and Continue
                  </button>
                </div>
              </Link>
            </form>
          )}
        </div>
        {/* right side */}
        <div className="hidden md:flex flex-col gap-6">
          {/* Order Summary */}
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
