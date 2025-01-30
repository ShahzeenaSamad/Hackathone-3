'use client';
import React from 'react';
import Image from 'next/image';



export default function Pic() {
  return (
    <>
      {/* Header Section */}
      <div className="w-full bg-myWhite flex justify-center items-center py-6 lg:mb-16">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
            Discover the Best of Nike Air Max
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Explore our top picks of Air Max shoes for men and women.
          </p>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
          <Image src="/Shoes1.jpg" alt="Nike Air Max Pulse" width={500} height={500} className="object-cover w-full" />
          <div className="p-4">
            <h3 className="text-gray-800 font-semibold text-lg">Nike Air Max Pulse</h3>
            <p className="text-gray-500 text-sm">Women Shoes</p>
            <p className="text-gray-800 font-bold mt-2">$1399</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
          <Image src="/shoes 4.jpg" alt="Nike Air Max Pulse" width={500} height={500} className="object-cover w-full" />
          <div className="p-4">
            <h3 className="text-gray-800 font-semibold text-lg">Nike Air Max Pulse</h3>
            <p className="text-gray-500 text-sm">Men Shoes</p>
            <p className="text-gray-800 font-bold mt-2">$1399</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300">
          <Image src="/shoes2.jpg" alt="Nike Air Max Pulse 97 SE" width={500} height={500} className="object-cover w-full" />
          <div className="p-4">
            <h3 className="text-gray-800 font-semibold text-lg">Nike Air Max Pulse 97 SE</h3>
            <p className="text-gray-500 text-sm">Men Shoes</p>
            <p className="text-gray-800 font-bold mt-2">$1699</p>
          </div>
        </div>
      </div>
    </>
  );
}
