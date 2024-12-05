"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/images/bg1.svg",
      title: "Fresh Meats & Premium Proteins",
      description:
        "Explore premium meats and proteins from trusted farms. Choose from grass-fed beef, free-range poultry, seafood, and plant-based options—all sustainably sourced, fresh, and ready for delivery to elevate your meals.",
    },
    {
      image: "/images/bg2.svg",
      title: "Grass-Fed Beef and Organic Options",
      description:
        "Choose from our variety of organic, grass-fed beef and poultry that are raised in natural environments for the highest quality and taste.",
    },
    {
      image: "/images/bg3.svg",
      title: "Seafood Fresh From the Ocean",
      description:
        "Our selection of seafood is fresh from the ocean, ensuring the best quality and flavor for your meals.",
    },
  ];

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="px-4 md:px-20 py-6 ">
      <div className="w-full relative h-[500px] bg-cover bg-center rounded-[28px] overflow-hidden">
        {/* Slide Image */}
        <div className="absolute inset-0">
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            layout="fill"
            objectFit="cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(
            to right,
            rgba(16, 32, 24, 1) 0%,
            rgba(16, 32, 24, 0.8) 80%,
            rgba(16, 32, 24, 0.2) 100%
          )`,
            }}
          ></div>
        </div>
      </div>
      {/* Slide Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-start z-10 ml-6 md:ml-20 px-4 md:px-8 md:mt-10 max-w-lg">
        <h1 className="text-2xl md:text-5xl py-6 mt-6 font-nunito text-Green50 font-bold mb-2">
          {slides[currentIndex].title}
        </h1>
        <p className="mb-6 opacity-80 text-sm md:text-lg text-agroHeading font-nunitoSans">
          {slides[currentIndex].description}
        </p>
        <Link href="/products">
          <button className="bg-Green500 hover:bg-Green600 text-white font-nunitoSans text-lg font-bold px-6 py-3 rounded-[12px]">
            Shop Now
          </button>
        </Link>
      </div>
      {/* Slide Indicators */}
      <div className="absolute z-20 bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
