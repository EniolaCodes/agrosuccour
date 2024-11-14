"use client";
import { useState } from "react";
import Image from "next/image";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "/images/bg1.svg",
      title: "Fresh Meats & Premium Proteins - Quality You Can Trust",
      description:
        "Explore premium meats and proteins from trusted farms. Choose from grass-fed beef, free-range poultry, seafood, and plant-based options—all sustainably sourced, fresh, and ready for delivery to elevate your meals.",
    },
    {
      image: "/images/bg1.svg",
      title: "Grass-Fed Beef and Organic Options",
      description:
        "Choose from our variety of organic, grass-fed beef and poultry that are raised in natural environments for the highest quality and taste.",
    },
    {
      image: "/images/bg1.svg",
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
      <div className="w-full relative h-[500px] bg-cover bg-center rounded-2xl overflow-hidden">
        {/* Slide Image */}
        <div className="absolute inset-0">
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      </div>
      {/* Slide Content */}
      <div className="relative z-10 p-8 text-black w-full max-w-lg">
        <h1 className="text-4xl font-bold mb-4">
          {slides[currentIndex].title}
        </h1>
        <p className="mb-6 text-lg">{slides[currentIndex].description}</p>
        <button className="bg-green-600 hover:bg-green-500 text-black text-lg font-semibold px-6 py-3 rounded-lg">
          Shop Now
        </button>
      </div>
      {/* Slide Indicators */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
