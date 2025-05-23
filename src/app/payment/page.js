"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiMail, FiUser, FiMapPin, FiPhone, FiCopy } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { PiFireTruck } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import ProgressIndicator from "@/components/ProgressIndicator";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/app/context/CartContext";
import { useFetchCartProducts } from "@/lib/models/product/hooks";
import { useShipping } from "../context/ShippingContext";
import PaymentComponent from "@/components/PaymentComponent";

const Payment = () => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("paystack");
  const [saveCard, setSaveCard] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const { shippingDetails, cartSummary } = useShipping();
  const { cart, formatPrice } = useCart();

  const bankDetails = [
    "AGRO-SUCCOUR NIGERIA LIMITED | 0126516021 | Wema bank",
    "Agro-succor Nigeria Ltd | 1229561022 | Zenith Bank",
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

  //   get orderId
  const orderId = localStorage.getItem("orderId");

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
              Where to send your order ₦{formatPrice(cart.total_amount)}
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
                  Pay with paystack
                </h2>
                <p className="text-[13px] font-nunitoSans text-Grey400 mb-6 w-[397px]">
                  You will not be charged until you review this order on the
                  next page. All transactions are secured and encrypted.
                </p>
              </div>
              {/* payment option */}
              <div className="space-y-4">
                <div className="mb-8 border bg-Grey50 hover:border-Grey50">
                  <div className="flex justify-between items-center space-x-2">
                    <div className="flex space-x-4 p-6">
                      <div className="relative w-6 h-6 rounded-full border-2 border-Green500">
                        <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-Green500" />
                      </div>
                      <span className="text-[16px] text-Grey500 font-nunitoSans font-bold ">
                        Paystack
                      </span>
                    </div>
                    <Image
                      src="/images/paystack.com"
                      alt="paystack"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-8  ">
                  <Image
                    src="/images/paystack.com"
                    alt="paystack"
                    width={100}
                    height={100}
                  />
                  <p className="max-w-[450px] text-center">
                    Click “Continue ”, you will be redirected to paystack to
                    complete your payment securely.
                  </p>
                  <PaymentComponent
                    orderId={orderId}
                    amount={formatPrice(cart.total_amount)}
                    email={shippingDetails.email}
                  />
                </div>
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
                    Reach out on +2347026542265. We will reply in 2mins.
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
