import React from "react";
import Image from "next/image";

export default function Dnt() {
  return (
    <div className="w-full min-h-screen bg-myWhite flex justify-center items-start">
      <div className="w-[90%] lg:mt-16 md:mt-16 pb-16">
        {/* Heading */}
        <p className="text-2xl font-semibold mb-8 text-black">Don&apos;t Miss</p>

        {/* Image Div */}
        <div className="w-full h-[900px]">
          <Image
            src="/dnt1 (2).jpg"
            alt={"image"}
            width={1344}
            height={700}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
