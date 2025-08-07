"use client";
import React, { useEffect } from "react";
import {
  useMutateInitiatePayment,
  useMutateVerifyPayment,
} from "@/lib/models/payment/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PaymentComponent = ({ orderId, amount, email, selectedMethod }) => {
  const router = useRouter();
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

  // Convert amount to number and handle potential string input
  const numericAmount =
    typeof amount === "string"
      ? parseFloat(amount.replace(/[^0-9.-]/g, ""))
      : Number(amount);

  // Initialize the mutation hook
  const { mutate: mutateInitiatePayment } = useMutateInitiatePayment({
    onSuccess: (resp) => {
      console.log("Payment Initialization Successful:", resp);
      const transactionRef = resp?.result?.data?.transaction_id;
      const transactionId = resp?.result?.data?.payment_id; //to be submit as payload to BE

      if (transactionRef) {
        const handler = window.PaystackPop.setup({
          key: publicKey,
          email: email,
          amount: Math.round(numericAmount * 100), // Amount in kobo , to be changed to original amount
          currency: "NGN",
          reference: transactionRef, // Use the backend-generated reference
          onClose: () => {
            toast.error("Payment canceled");
          },
          callback: (response) => {
            // console.log('THUS IS RESPONSE IN CALLBACK', response)
            mutateVerifyPayment({
              payment_id: transactionId,
              reference: response.reference,
            });
            //   alert(`Payment complete! Reference: ${response.reference}`);
          },
        });

        handler.openIframe(); // Open the Paystack modal
      } else {
        // alert('Invalid transaction reference.');
        console.log("Invalid transaction reference.");
      }
    },
    onError: (error) => {
      console.log("Error Initializing Payment:", error);
      toast.error("Payment initialization failed.");
    },
  });

  const { mutate: mutateVerifyPayment } = useMutateVerifyPayment({
    onSuccess: (verificationResp) => {
      console.log("Payment Verification Successful:", verificationResp);
      //   verificationResp.result.data.payment_status == 'Completed'
      if (verificationResp.result.data.payment_status == "Completed") {
        // console.log('Payment verified successfully!')
        toast.success("Payment Successful!");
        // router.push("/ordercompleted");
      } else {
        // console.log('Payment verification failed on the backend!')
        toast.error("Payment Failed !");
      }
    },
    onError: (error) => {
      console.error("Error Verifying Payment:", error);
      toast.error("An error occurred during payment verification");
    },
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    const payload = {
      order_id: orderId,
      amount: numericAmount,
      // "payment_method" : "Card"
    };
    mutateInitiatePayment(payload);
  };

  return (
    // <button onClick={handlePayment} className="pay-btn w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    //   Pay Now
    // </button>
    <button
      onClick={handlePayment}
      className=" bg-Green500 text-white rounded-[8px] p-[10px] text-center text-[16px] md:text-[18px] font-bold w-full md:w-[190px]  h-[48px] hover:bg-Green600 transition"
    >
      Pay Now
    </button>
  );
};

export default PaymentComponent;
