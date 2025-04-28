"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import {
  useFetchCartProducts,
  useFetchLogistics,
  useFetchLogisticsByLocation,
  useFetchLogisticsPrice,
} from "@/lib/models/product/hooks";
import { useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import ProgressIndicator from "@/components/ProgressIndicator";
import { useMutateSubmitUserDetails } from "@/lib/models/auth/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ShippingDetails from "@/components/ShippingDetails";

const Checkout = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit: handleFormSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [isLoadingSubmitDetails, setIsLoadingSubmitDetails] = useState(false);
  const { isPending: isPendingSubmitDetails, mutate: onMutateSubmitDetails } =
    useMutateSubmitUserDetails({});

  const steps = ["DELIVERY", "REVIEW", "PAYMENT"];
  const currentStep = 0;

  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const { removeItemFromCart, setLogisticPrice, setLogisticId } = useCart();

  const {
    data: cartedProducts = [],
    isLoading,
    isError,
    refetch: refetchCartProducts,
  } = useFetchCartProducts(cartItems);
  const { data } = useFetchLogistics();
  const locations =
    data?.result?.data?.map((item, index) => ({
      id: index,
      name: item.from_location,
    })) || [];

  const { data: logisticsOptionsData } = useFetchLogisticsByLocation({
    from: fromLocation,
  });

  const logisticsOptions =
    logisticsOptionsData?.result?.data?.map((item, index) => ({
      id: index,
      name: item.to_location,
    })) || [];

  const { data: priceData } = useFetchLogisticsPrice({
    from: fromLocation,
    to: toLocation,
  });

  const logisticsPrice = priceData?.result?.data?.logistic_price ?? 0;
  const logisticId = priceData?.result?.data?.logistic_id ?? null;

  useEffect(() => {
    if (toLocation) {
      setLogisticPrice(logisticsPrice);
      setLogisticId(logisticId);
    } else {
      setLogisticPrice(0);
      setLogisticId(null);
    }
  }, [toLocation, logisticsPrice, logisticId]);

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

  useEffect(() => {
    if (toLocation) {
      setLogisticPrice(logisticsPrice);
    } else {
      setLogisticPrice(0);
    }
  }, [toLocation, logisticsPrice]);

  const onSubmitShippingDetails = async (data) => {
    console.log("Form Data from react-hook-form:", data);

    // const formData = new FormData(e.target);
    // const values = Object.fromEntries(formData);

    if (
      !data.email ||
      !data.fullName ||
      !data.phone ||
      (deliveryMethod === "delivery" && !data.address && !data.state) ||
      (deliveryMethod === "delivery" && !fromLocation) ||
      (deliveryMethod === "delivery" && !toLocation)
    ) {
      toast.error("All fields are required");
      alert("All fields are required");
      return;
    }
    // if (!logisticId || logisticId === 0) {
    //   toast.error("Please select a valid delivery route");
    //   return;
    // }

    setIsLoadingSubmitDetails(true);
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    const payload = {
      email: data.email,
      username: data.fullName,
      password: data.email,
      address: data.address,
      state: data.state,
      logistic_id: logisticId,
      cart: storedCart,
    };
    onMutateSubmitDetails(payload, {
      onSuccess: (response) => {
        console.log("OUr backend response: ", response);

        if (response?.result?.success) {
          localStorage.setItem("token", response.result.token);
          setIsLoadingSubmitDetails(false);
          toast.success("Registration successful");
          alert("Registration successful");
        } else {
          setIsLoadingSubmitDetails(false);
          toast.error("Unsuccessful registration");
          alert("UnsuccessfulRegistration");
        }
        // toast.success("Registration successfully");
        router.push("/review");
      },
      onError: (error) => {
        console.log("Error: ", error);
        setIsLoadingSubmitDetails(false);
        toast.error(
          error?.response?.data?.message?.toString() || "An error occurred"
        );
      },
    });
  };

  return (
    <div className="px-4 md:px-80 md:py-8 ">
      <div className="flex flex-row space-x-6">
        <div className="bg-white flex-1 p-6 shadow-md rounded-[28px]">
          {/* Progress Bar */}
          <div className="w-full flex justify-center">
            <ProgressIndicator steps={steps} currentStep={currentStep} />
          </div>
          <h2 className="text-2xl font-nunito text-Grey500 font-bold mt-6">
            Shipping Information
          </h2>
          {/* Shipping Details */}
          <ShippingDetails
            onSubmit={handleFormSubmit(onSubmitShippingDetails)}
            deliveryMethod={deliveryMethod}
            setDeliveryMethod={setDeliveryMethod}
            fromLocation={fromLocation}
            setFromLocation={setFromLocation}
            toLocation={toLocation}
            setToLocation={setToLocation}
            locations={locations}
            logisticsOptions={logisticsOptions}
            logisticsPrice={logisticsPrice}
            isLoadingSubmitDetails={isLoadingSubmitDetails}
            errors={errors}
            register={register}
            control={control}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;