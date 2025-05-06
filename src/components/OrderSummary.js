"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const OrderSummaryComponent = ({
  //prevents error when value of products and totalPrice are missing
  products = [],
  totalPrice = 0,
  logisticPrice = 0,

  incrementQuantity,
  decrementQuantity,
  deleteProduct,
}) => {
  const pathname = usePathname();

  let buttonLink = "/checkout";
  let buttonText = "Checkout";
  let displayLogisticPrice = false;
  let calculatedTotal = totalPrice;

  if (pathname === "/review") {
    buttonLink = "/payment";
    buttonText = "Proceed to Payment";
    displayLogisticPrice = true;
    calculatedTotal = totalPrice + logisticPrice;
  } else if (pathname === "/payment") {
    buttonLink = "/ordercompleted";
    buttonText = "Complete Order";
  }
  return (
    <div className="md:w-[350px] max-h-[90vh] pt-6 mt-6 md:mt-0 bg-white p-4 rounded-[28px] shadow-md flex flex-col space-y-12">
      <div>
        <div className="flex justify-between">
          <h2 className="text-[20px] text-Grey500 font-bold">Order Summary</h2>
          <p>{products.length} items</p>
        </div>
        <hr className="mt-4" />
      </div>
      <div className="mb-2 border-b font-nunitoSans">
        <p className="text-Grey500 text-[16px]">Delivery fees:</p>
        <p className="text-[11px] text-Grey300 w-[260px]">
          Your trusted source for fresh produce, essentials, bulk purchasing,
          and farming
        </p>
      </div>
      <div className="flex justify-between items-center text-[16px] text-Grey400 border-b pb-2">
        <p>Subtotal:</p>
        <p>₦{totalPrice.toFixed(2)}</p>
      </div>

      {displayLogisticPrice && (
        <div className="flex justify-between items-center text-Grey400 text-[16px] border-b pb-2">
          <p>Other fees:</p>
          <p>₦{logisticPrice.toFixed(2)}</p>
        </div>
      )}

      <div className="flex justify-between items-center text-Grey400 font-bold text-[16px] font-nunitoSans border-b pb-2">
        <p>Total:</p>
        <p>₦{calculatedTotal.toFixed(2)}</p>
      </div>
      <Link href={buttonLink}>
        <button className="mt-4 w-full h-[44px] bg-Green500 text-white text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};
OrderSummaryComponent.displayName = "OrderSummary"; // Set the display name

const OrderSummary = React.memo(OrderSummaryComponent);

export default OrderSummary;
