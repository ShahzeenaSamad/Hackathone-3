import React from "react";
import Image from "next/image";

export default function Gear() {
  return (
    <div className="w-full min-h-screen px-6 md:px-16 flex flex-col mt-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Gear Up Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Gear Up for the Best
        </h1>
        <p className="text-gray-600 mt-2">
          Premium Nike gear designed for your performance and style.
        </p>
      </div>

      {/* Product Section */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Product Card 1 */}
        <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
          <Image
            src="/1.jpg"
            alt="Nike Air Zoom Pegasus 39"
            width={280}
            height={320}
            className="object-cover w-full h-[320px] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Nike Air Zoom Pegasus 39
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Men&apos;s road running shoes.
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2">₹9,995</p>
          </div>
        </div>

        {/* Product Card 2 */}
        <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
          <Image
            src="/2.jpg"
            alt="Nike Dri-FIT Challenger"
            width={280}
            height={320}
            className="object-cover w-full h-[320px] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Nike Dri-FIT Challenger
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Men&apos;s versatile workout shorts.
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2">₹2,495</p>
          </div>
        </div>

        {/* Product Card 3 */}
        <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
          <Image
            src="/3.jpg"
            alt="Nike React Infinity Run Flyknit 3"
            width={280}
            height={320}
            className="object-cover w-full h-[320px] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Nike React Infinity Run Flyknit 3
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Women&apos;s lightweight running shoes.
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2">₹11,495</p>
          </div>
        </div>

        {/* Product Card 4 */}
        <div className="group relative bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
          <Image
            src="/4.jpg"
            alt="Nike Fast"
            width={280}
            height={320}
            className="object-cover w-full h-[320px] group-hover:scale-105 transition-transform duration-300"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Nike Fast</h3>
            <p className="text-sm text-gray-500 mt-1">
              Women&apos;s mid-rise running leggings.
            </p>
            <p className="text-lg font-bold text-gray-900 mt-2">₹3,795</p>
          </div>
        </div>
      </div>
    </div>
  );
}
