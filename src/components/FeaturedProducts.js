"use client";
// import { useGetProducts } from "@/lib/models/product/hooks";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const FeaturedProducts = () => {
  // const {data: fetchProducts, isSuccess} = useGetProducts({})
  const products = Array(14).fill({
    image: "/images/singleProduct.svg",
    title: "Product Name",
    description: "15g",
    price: "₦10,000.00",
  });
  // console.log(fetchProducts);

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
          <h1 className="text-Green500 text-[16px] font-nunitoSans">
            View All
          </h1>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {/* large image */}
        <div className="col-span-2 md:col-span-2 md:row-span-2 bg-white rounded-lg shadow-md overflow-hidden">
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
          <div
            key={index}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg relative"
          >
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
              <p className="mt-2 text-Grey500 font-nunitoSans text-[16px] font-bold">
                {product.price}
              </p>
              <Link href={`/products/${product.id}`} className="">
                <div className="rounded-full border border-Green500 p-2 text-Green500 cursor-pointer">
                  <FaShoppingCart className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
