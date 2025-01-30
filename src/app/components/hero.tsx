"use client";

import Link from "next/link";
import { useState, useEffect } from "react";


const HeroSection = () => {
  const images = [
    "/Shoes1.jpg",
    "/shoes2.jpg",
    "/shoes3.jpg",
    "/shoes 4.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change the image every 5 seconds (5000ms)

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [images.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Smooth Sliding Effect */}
      <div
        className="absolute top-0 left-0 w-full h-full transition-all duration-1500 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)), url('${images[currentImageIndex]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Hero Content */}
      <div className="text-center text-white px-4 max-w-3xl z-10">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wide mb-4">
          Step Into Style
        </h1>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Explore the latest collection of premium shoes crafted for every occasion. 
          Comfort meets fashion at Shoe World.
        </p>

        {/* Call-to-action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <Link 
            href="/products"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105"
          >
            Shop Now
          </Link>
          <a 
            href="#collections"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg shadow-lg text-lg transition-transform transform hover:scale-105"
          >
            View Collections
          </a>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
