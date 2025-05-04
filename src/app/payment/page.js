"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiUser, FiMapPin, FiPhone, FiCopy } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { PiFireTruck } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { BsQuestionLg } from "react-icons/bs";
import { RiCalendarEventFill } from "react-icons/ri";
import ProgressIndicator from "@/components/ProgressIndicator";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/app/context/CartContext";
import { useFetchCartProducts } from "@/lib/models/product/hooks";
import { useShipping } from "../context/ShippingContext";

const Payment = () => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("debit-card");
  const [saveCard, setSaveCard] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { shippingDetails, cartSummary } = useShipping();
  const { cart } = useCart();

  const bankDetails = [
    "AGROSUCCOUR | 2000000020 | UBA Plc, Nigeria",
    "AGROSUCCOUR | 2000000021 | UBA Plc, Nigeria",
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  const redirectToCheckout = () => {
    router.push("/checkout");
  };

  const handleDeleteAll = () => {
    localStorage.removeItem("shippingDetails");
    window.location.reload(); // force re-render or use state
  };

  const steps = ["DELIVERY", "REVIEW", "PAYMENT"];
  const currentStep = 2;

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const {
    data: cartedProducts = [],
    isLoading,
    isError,
    refetch: refetchCartProducts,
  } = useFetchCartProducts(cartItems);

  //Authentication check
  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/checkout");
    } else {
      setIsAuthenticated(true);
    }
    setIsAuthLoading(false);
  }, [router]);

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

  // Show loading state during auth
  if (isAuthLoading || !isMounted) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // If not authenticated, this will redirect already
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        Redirecting to checkout...
      </div>
    );
  }
  const shippingList = Array.isArray(shippingDetails)
    ? shippingDetails
    : [shippingDetails];

  if (!shippingDetails || !cartSummary) {
    return (
      <div className="text-Grey500 text-[18px] text-center mt-10">
        No shipping data found. Please return to{" "}
        <Link href="/checkout" className="hover:text-Green500">
          Checkout
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-52 py-8 overflow-y-auto">
      <div className="flex flex-row space-x-6">
        <div className="bg-white flex-1 p-6 shadow-md rounded-[28px]">
          {/* Progress Bar */}

          <div className="w-full flex justify-center">
            <ProgressIndicator steps={steps} currentStep={currentStep} />
          </div>
          {/* shipping info */}
          <section>
            <h2 className="text-[25px] text-Grey500 font-nunito font-bold mt-4 mb-4">
              Where to send your order
            </h2>
            <div className="">
              {shippingList.length > 0 ? (
                shippingList.map((shippingDetails, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-[8px] shadow mb-4 bg-Grey50"
                  >
                    <div className="flex justify-between font-nunitoSans mb-2">
                      <h3 className="text-[20px] text-Grey500 ">
                        {shippingDetails.fullName}
                      </h3>
                      <div className="flex space-x-4 font-bold text-[16px]">
                        <button
                          onClick={redirectToCheckout}
                          className="text-Green900 button"
                        >
                          Edit
                        </button>
                        <button
                          onClick={handleDeleteAll}
                          className="text-red-500 button"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="bg-Grey200 w-full h-px mb-2" />
                    <div className="space-y-2 text-Grey400">
                      <div className="flex items-center text-[14px] space-x-2">
                        <FiUser />
                        <p className=" ">{shippingDetails.fullName}</p>
                      </div>
                      <div className="flex items-center text-[14px] space-x-2">
                        <FiMail />
                        <p className="">{shippingDetails.email}</p>
                      </div>
                      <div className="flex items-center text-[14px] space-x-2">
                        <FiMapPin />
                        <p className="">{shippingDetails.address}</p>
                      </div>
                      <div className="flex items-center text-[14px] space-x-2">
                        <FiPhone />
                        <p className="">{shippingDetails.phone}</p>
                      </div>
                      {/* <div className="flex items-center text-[14px] space-x-2">
                        <Image
                          src="/images/nigeria 1.svg"
                          width={20}
                          height={20}
                          alt=""
                        />
                        <p className="">{shippingDetails.country}</p>
                      </div> */}
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
                <p className="text-[13px] font-nunitoSans text-Grey400 mb-6 w-[397px]">
                  You will not be charged until you review this order on the
                  next page. All transactions are secure and encrypted.
                </p>
              </div>
              {/* payment option */}
              <div className="space-y-4">
                <div
                  onClick={() => setSelectedPaymentMethod("debit-card")}
                  className={`mb-8 border bg-Grey50 hover:border-Grey50"  ${
                    selectedPaymentMethod === "debit-card"
                      ? " border"
                      : "border-Grey50"
                  } p-2 rounded-[8px] flex justify-between items-center cursor-pointer`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`relative w-6 h-6 rounded-full ${
                        selectedPaymentMethod === "debit-card"
                          ? "border-2 border-Green500"
                          : "border-2 border-Grey100"
                      }`}
                    >
                      {selectedPaymentMethod === "debit-card" && (
                        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-Green500" />
                      )}
                    </div>
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
                      <FiMail className="absolute left-3 top-[55px] transform -translate-y-1/2 text text-Grey200" />
                      <p className="text-Grey500 text-[16px] mb-2 font-bold">
                        Card Number
                      </p>
                      <input
                        type="text"
                        placeholder="5199 8080 8080 8080"
                        className="w-full pl-10 p-2 border border-Grey200 rounded-lg focus:outline-none  hover:border-Grey400"
                      />
                    </div>
                    <div className="flex space-x-4 w-full">
                      <div className="flex-1 flex-row">
                        <p className="text-Grey500 text-[16px] mb-2 font-bold">
                          Expiration date
                        </p>
                        <div className="relative">
                          <RiCalendarEventFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Grey200" />
                          <select className="w-[100px] md:w-1/2 border border-Grey200 rounded-lg p-2 pl-10 focus:outline-none  border:border-Grey400">
                            <option>MM</option>
                            <option>01</option>
                            <option>02</option>
                            <option>03</option>
                            <option>04</option>
                            <option>05</option>
                            <option>06</option>
                            <option>07</option>
                            <option>08</option>
                            <option>09</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                          </select>
                          <RiCalendarEventFill className="absolute left-[110px] md:left-[190px] top-1/2 transform -translate-y-1/2 text-Grey200" />
                          <select className="w-[100px] md:w-1/2 border border-Grey200 rounded-lg p-2 pl-12 focus:outline-none  hover:border-Grey400">
                            <option>YY</option>
                            <option>2024</option>
                            <option>2025</option>
                            <option>2026</option>
                            <option>2027</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <p className="text-Grey500 text-[16px] font-bold mb-2">
                          CRV
                        </p>
                        <input
                          type="text"
                          placeholder="572"
                          className="w-[110px] md:w-1/3 border border-gray-300 rounded-lg p-2 focus:outline-none  hover:border-Grey400"
                        />
                        <BsQuestionLg
                          size={20}
                          className="absolute transform -translate-y-1/2 bottom-0.5 left-20  bg-Grey200 rounded-full p-1 text-white "
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <FiUser className="absolute left-3 bottom-3 transform -translate-y-1/2 text-Grey200" />
                      <p className="text-Grey500 text-[16px] font-bold mb-2">
                        Name on Card
                      </p>
                      <input
                        type="text"
                        className="w-full pl-10 p-4 font-nunitoSans border rounded-lg focus:outline-none  hover:border-Grey400"
                        placeholder="Yussuf Olabayo"
                      />
                    </div>
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={() => setSaveCard(!saveCard)}
                        className={`bg-Grey500 text-white rounded-md ${
                          saveCard ? "bg-Grey500 text-white" : ""
                        }`}
                      />
                      <span className="text-Green900 text-[13px]">
                        Save Card
                      </span>
                    </label>
                  </div>
                )}
                {/* bank transfer */}
                <div
                  onClick={() => setSelectedPaymentMethod("bank-transfer")}
                  className={`border ${
                    selectedPaymentMethod === "bank-transfer"
                      ? "border"
                      : "border-Grey50"
                  } p-4 rounded-md flex bg-Grey50 border hover:border-Grey50 items-center cursor-pointer`}
                >
                  <div
                    className={`relative w-6 h-6 rounded-full ${
                      selectedPaymentMethod === "bank-transfer"
                        ? "border-2 border-Green500"
                        : "border-2 border-Grey100"
                    }`}
                  >
                    {selectedPaymentMethod === "bank-transfer" && (
                      <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-Green500" />
                    )}
                  </div>
                  <span className="ml-2 text-[16px] text-Grey500 font-bold font-nunitoSans">
                    Direct bank transfer
                  </span>
                </div>
                {/* Bank Transfer Details */}
                {selectedPaymentMethod === "bank-transfer" && (
                  <div className="mt-4 font-nunitoSans">
                    <p className="text-[11px] text-Grey400 mb-4">
                      To complete your order, please pay directly into our
                      account. Use your Order ID as a reference. Your order will
                      ship as soon as we confirm your payment.
                    </p>
                    <div className="flex flex-col space-y-4 text-[11px] text-Grey400">
                      {bankDetails.map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm">{detail}</span>
                          <FiCopy
                            size={20}
                            className="text-Grey400 cursor-pointer"
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
        <div className="hidden md:flex flex-col gap-6">
          {/* Order Summary */}
          <OrderSummary products={products} totalPrice={cart.total_amount} />
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
        <div className="p-2">
          <button className=" mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
            Complete Order
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Payment;
