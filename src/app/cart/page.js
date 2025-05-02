"use client";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import OrderSummary from "@/components/OrderSummary";
import { MdAddShoppingCart } from "react-icons/md";
import { useCart } from "@/app/context/CartContext";
import { useFetchCartProducts } from "@/lib/models/product/hooks";

export default function Cart() {
  const { cart, removeItemFromCart, incrementQuantity, decrementQuantity } =
    useCart();

  const items = cart ? cart.items : [];
  // const items = useMemo(() => (cart ? cart.items : []), [cart]);
  const isCartEmpty = !items || items.length === 0;
  const {
    data: cartedProducts = [],
    isLoading,
    isError,
    refetch: refetchCartProducts,
  } = useFetchCartProducts(items);

  console.log("Carted Products is here:", cartedProducts);

  const totalPrice = cartedProducts.reduce((acc, product) => {
    const price = parseFloat(product?.result?.data?.price) || 0;
    const quantity = parseInt(product?.quantity, 10) || 0;
    return acc + price * quantity;
  }, 0);

  return (
    <>
      {/* desktop */}
      <div className="hidden md:block px-20 pt-6">
        <div className="mb-4 bg-white rounded-[28px] border p-4 flex justify-between items-center">
          <h1 className="text-Grey500 font-nunito text-[25px] font-bold">
            Shopping Cart
          </h1>
          <Link
            href="/products"
            className="text-Green800 hover:text-Green600 border border-Green500 font-nunitoSans text-[16px] p-4 rounded-[12px]"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="flex space-x-4">
          <div className="bg-white p-4 rounded-[28px] shadow-md flex-1 space-x-8">
            <div className="space-y-4">
              {cartedProducts.length > 0 ? (
                cartedProducts.map((product) => (
                  <div
                    key={product?.result?.data?.product_id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center space-x-8">
                      <Image
                        src={product?.result?.data?.image_url}
                        alt={product?.result?.data?.product_name}
                        width={124}
                        height={80}
                        className="rounded-md"
                      />
                      <div>
                        <h2 className="text-[20px] text-Grey500 font-bold">
                          {product?.result?.data?.product_name}
                        </h2>
                        <p className="text-[16px] text-Grey400">
                          {product?.quantity} kilogram / Bag
                        </p>
                      </div>
                    </div>
                    <p className="text-[20px] font-bold text-Grey500 ml-2">
                      ₦
                      {(
                        (product?.result?.data?.price || 0) *
                        (product?.quantity || 0)
                      ).toFixed(2)}
                    </p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          decrementQuantity(product?.result?.data?.product_id);
                        }}
                        className={`px-3 py-1 rounded-md font-extrabold ${
                          product.quantity > 1
                            ? "bg-Green500 text-Green50"
                            : "bg-Grey100 text-Green50"
                        }`}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {product.quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          incrementQuantity(product?.result?.data?.product_id);
                        }}
                        className="bg-Green500 text-Green50 px-3 py-1 rounded-md font-bold"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeItemFromCart(product?.result?.data?.product_id);
                      }}
                      className="text-Grey400 text-[16px] hover:text-red-600 ml-2"
                    >
                      x
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center">
                  <Link
                    href="/products"
                    className="bg-white text-Green500 rounded-full p-4 hover:text-white hover:bg-Green500 transition duration-150"
                  >
                    <MdAddShoppingCart className="text-[20px]" />
                  </Link>
                  <p className="text-center font-bold text-[16px] text-Grey500">
                    Your cart is empty!
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Order Summary */}
          <div className="sticky top-6 self-start">
            <OrderSummary
              products={cart.items}
              totalPrice={totalPrice}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              deleteProduct={removeItemFromCart}
            />
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="px-4 py-2 md:hidden">
        <div className="mb-4 bg-white rounded-[28px] border p-4 flex justify-between items-center">
          <div className="text-Grey400 text-lg font-bold">
            <h1 className="text-Grey500 text-xl font-bold">Shopping Cart</h1>
            <p className="text-[16px] font-bold text-Grey500">
              ₦{(totalPrice || 0).toFixed(2)}
            </p>
          </div>
          <Link
            href="/products"
            className="text-Green800 border border-Green500 hover:text-Green600 text-xs p-4 rounded-[12px]"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          {cartedProducts.length > 0 ? (
            cartedProducts.map((product) => (
              <div
                key={product?.result?.data?.product_id}
                className=" bg-white rounded-[28px] border p-4 mb-4"
              >
                <div className="space-y-6">
                  <div className=" relative">
                    <div className="flex flex-row items-center space-x-6">
                      <Image
                        src={product?.result?.data?.image_url}
                        alt={product?.result?.data?.product_name}
                        width={124}
                        height={80}
                        className="rounded-md"
                      />
                      <div className="text-Grey500">
                        <h2 className="text-lg font-bold">
                          {product?.result?.data?.product_name}
                        </h2>
                        <p className="text-sm">
                          {product?.quantity} kilogram / Bag
                        </p>
                      </div>
                    </div>
                    <div className="">
                      <button
                        onClick={() =>
                          removeItemFromCart(product?.result?.data?.product_id)
                        }
                        className="text-Grey400 hover:text-red-600 absolute top-0 right-2"
                      >
                        x
                      </button>
                    </div>
                  </div>
                  {/* + & - buttons and product price */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          decrementQuantity(product?.result?.data?.product_id)
                        }
                        className={`px-5 py-1 rounded-md font-extrabold ${
                          product.quantity > 1
                            ? "bg-Green500 text-Green50"
                            : "bg-Grey100 text-Green50"
                        }`}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() =>
                          incrementQuantity(product?.result?.data?.product_id)
                        }
                        className="bg-Green500 text-Green50 px-5 py-1 rounded-md font-bold"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-lg font-bold text-Grey500 ml-2">
                      ₦
                      {(
                        (product?.result?.data?.price || 0) *
                        (product?.quantity || 0)
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center ">
              <Link
                href="/products"
                className="bg-white text-Green500   rounded-full p-4 hover:text-white hover:bg-Green500 transition duration-150"
              >
                <MdAddShoppingCart className=" text-[20px]" />
              </Link>
              <p className="text-center font-bold text-[16px] text-Grey500">
                Your cart is empty!
              </p>
            </div>
          )}
        </div>
        {/* checkout button */}
        <div className="">
          <Link href="/checkout">
            <button className="mt-4 w-full bg-Green500 text-white font-medium py-2 rounded-[12px] hover:bg-[#5A9E3A] transition">
              Checkout
            </button>
          </Link>
        </div>

        {/* Order Summary */}

        <OrderSummary
          products={cart.items}
          totalPrice={totalPrice}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          deleteProduct={removeItemFromCart}
        />
      </div>
    </>
  );
}
