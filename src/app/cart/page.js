"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
  // Initial product data
  const initialProducts = [
    {
      id: 1,
      name: "Pepper",
      quantity: 1,
      price: 1200.99,
      image: "/images/elo.svg",
    },
    {
      id: 2,
      name: "Full Chicken",
      quantity: 2,
      price: 1200.99,
      image: "/images/chicken.svg",
    },
    {
      id: 3,
      name: "Fresh Fishes",
      quantity: 1,
      price: 1200.99,
      image: "/images/fish.svg",
    },
    {
      id: 4,
      name: "Cabbage",
      quantity: 1,
      price: 1200.99,
      image: "/images/rice.svg",
    },
  ];

  const [products, setProducts] = useState(initialProducts);

  // Function to increment quantity
  const incrementQuantity = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Function to decrement quantity
  const decrementQuantity = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Function to delete a product
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Calculate total price
  const totalPrice = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <>
      {/* desktop */}
      <div className="hidden  md:block px-20 pt-6">
        <div className="mb-4 bg-white rounded-[28px] border p-4 flex justify-between items-center">
          <h1 className="text-Grey500 text-[25px] font-bold">Shopping Cart</h1>
          <Link
            href="/products"
            className="text-Green800 border border-Green500 text-[16px] p-4 rounded-[12px]"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="flex space-x-4">
          <div className="bg-white p-4 rounded-[28px] shadow-md flex-1 space-x-8">
            {/* Product List */}
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-8">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={124}
                      height={80}
                      className="rounded-md"
                    />
                    <div className="">
                      <h2 className="text-[20px] text-Grey500 font-bold">
                        {product.name}
                      </h2>
                      <p className="text-xs text-Grey400">
                        {product.quantity} kilogram / Bag
                      </p>
                    </div>
                  </div>
                  <p className="text-[20px] font-bold text-Grey500 ml-2">
                    ₦{product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decrementQuantity(product.id)}
                      className={`px-2 py-1 rounded-md font-extrabold ${
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
                      onClick={() => incrementQuantity(product.id)}
                      className="bg-Green500 text-Green50 px-2 py-1 rounded-md font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="">
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-Grey400 hover:text-red-600 ml-2"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Order Summary */}
          <div className="pt-6 bg-white p-4 rounded-[28px] shadow-md flex flex-col space-y-12">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-[20px] text-Grey500 font-bold">
                Order summary
              </h2>
              <p className="text-Grey400 text-[13px]">
                {products.length} items
              </p>
            </div>

            <div className="mb-4 border-b pb-2 font-nunitoSans">
              <p className="text-Grey500 text-[16px]">Delivery fees:</p>
              <p className="text-[11px] text-Grey300 w-[260px]">
                Your trusted source for fresh produce, essentials, bulk
                purchasing, and farming
              </p>
            </div>

            <div className="flex justify-between items-center text-Grey400 text-[13px] border-b pb-2">
              <p>Subtotal:</p>
              <p>₦{totalPrice.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center text-Grey400 text-[13px] border-b pb-2">
              <p>Other fees:</p>
              <p>₦0.00</p>
            </div>

            <div className="flex justify-between items-center text-Grey400 font-bold text-[16px] font-nunitoSans border-b pb-2">
              <p className="">Total:</p>
              <p>₦{totalPrice.toFixed(2)}</p>
            </div>
            <Link href="/checkout">
              <button className="mt-4 w-full h-[44px] bg-Green500 text-Grey500 text-[16px] font-bold py-2 rounded-md hover:bg-Green600 transition">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="px-4 py-2 bg-Grey50 md:hidden">
        <div className="mb-4 bg-Green50 rounded-[28px] border p-4 flex justify-between items-center">
          <div className="text-Grey400 text-lg font-bold">
            <h1 className="text-Grey500 text-xl font-bold">Shopping Cart</h1>
            <p>₦{totalPrice.toFixed(2)}</p>
          </div>
          <Link
            href="/products"
            className="text-Green800 border border-Green500 text-xs p-4 rounded-[12px]"
          >
            Continue Shopping
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className=" bg-white rounded-[28px] border p-4 mb-4"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={124}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="text-Grey500">
                    <h2 className="text-lg font-bold">{product.name}</h2>
                    <p className="text-sm">{product.quantity} kilogram / Bag</p>
                  </div>
                  <div className="">
                    <button
                      onClick={() => deleteProduct(product.id)}
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
                      onClick={() => decrementQuantity(product.id)}
                      className={`px-2 py-1 rounded-md font-extrabold ${
                        product.quantity > 2
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
                      onClick={() => incrementQuantity(product.id)}
                      className="bg-Green500 text-Green50 px-2 py-1 rounded-md font-bold"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-bold text-Grey500 ml-2">
                    ₦{product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* checkout button */}
        <div className="">
          <Link href="/checkout">
            <button className="mt-4 w-full bg-Green500 text-Grey500 font-medium py-2 rounded-[12px] hover:bg-[#5A9E3A] transition">
              Checkout
            </button>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="pt-6 mt-6 bg-white p-4 rounded-[28px] shadow-md flex flex-col space-y-12">
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h2 className="text-lg text-Grey500 font-semibold">
              Order summary
            </h2>
            <p className="text-Grey400 text-sm">{products.length} items</p>
          </div>

          <div className="mb-4 border-b pb-2">
            <p className="text-Grey500 font-semibold text-lg">Delivery fees:</p>
            <p className="text-sm text-Grey400">
              Your trusted source for fresh produce, essentials, bulk
              purchasing, and farming
            </p>
          </div>

          <div className="flex justify-between items-center text-Grey400 text-sm border-b pb-2">
            <p>Subtotal:</p>
            <p>₦{totalPrice.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center text-Grey400 text-sm border-b pb-2">
            <p>Other fees:</p>
            <p>₦0.00</p>
          </div>

          <div className="flex justify-between items-center text-Grey400 text-lg font-bold border-b pb-2">
            <p className="text-medium">Total:</p>
            <p>₦{totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
