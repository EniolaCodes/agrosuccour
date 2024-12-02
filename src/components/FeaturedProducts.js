"use client";
// import { useGetProducts } from "@/lib/models/product/hooks";
import Image from "next/image";
import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FeaturedProducts = () => {
  // const {data: fetchProducts, isSuccess} = useGetProducts({})
  const products = Array(14).fill({
    image: "/images/singleProduct.svg",
    title: "Product Name",
    description: "15g",
    price: "₦10,000.00",
  });
  // console.log(fetchProducts);

  const notify = (event) => {
    toast("Cart successfully updated");
  };
  const handleCartClick = (event) => {
    event.preventDefault(); // Prevent default Link behavior
    notify(event);
  };

  return (
    <div className="px-4 md:px-20 py-8">
      <h2 className="text-4xl font-nunito font-bold text-Grey500 text-center mb-4">
        <span className="text-Green500">Featured</span> Products
      </h2>
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-[28px]">
        <h1 className="text-Grey500 font-semibold font-nunito text-4xl">
          All Products
        </h1>
        <Link href="/products">
          <h1 className="text-Green500 hover:text-Green800  text-[16px] font-nunitoSans">
            View All
          </h1>
        </Link>
      </div>
      <div className="bg-white rounded-[28px] px-6 py-8 grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* large image */}
        <div className="col-span-2 md:col-span-2 md:row-span-2 bg-Grey500 rounded-[12px] shadow-md overflow-hidden">
          <Image
            src="/images/bigProduct.svg"
            alt="Featured Product"
            layout="responsive"
            width={400}
            height={500}
            className="object-cover"
          />
        </div>
        {/* Small Products Section Under Large Image */}
        {products.map((product, index) => (
          <Link
            href={`/products/${product.id}`}
            key={index}
            className="bg-white rounded-[16px] p-4 shadow-custom hover:shadow-custom-hover transition-shadow duration-300"
          >
            <div>
              <div className="relative w-full h-40 md:h-40">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col font-nunitoSans">
                <h3 className="mt-4 text-sm text-Grey400 font-semibold">
                  {product.title}
                </h3>
                <p className=" text-Grey200">{product.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="mt-2 text-Grey500 font-nunitoSans text-[20px] font-bold">
                  {product.price}
                </p>
                <div
                  onClickCapture={handleCartClick}
                  className="rounded-full border border-Green500 p-2 text-Green500 hover:bg-Green500 hover:text-white cursor-pointer"
                >
                  <MdAddShoppingCart className="text-[20px]" />
                </div>
              </div>
            </div>
          </Link>
        ))}
        <ToastContainer />
      </div>
    </div>
  );
};

export default FeaturedProducts;
