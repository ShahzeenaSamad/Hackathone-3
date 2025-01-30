import React from 'react'
import Image from 'next/image'
import vector from "../../../public/vector.png"

export default function Page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-[328px] h-auto bg-white p-6 ">
        {/* Centered Vector Image */}
        <div className="flex justify-center mb-4">
          <Image src={vector} alt={"image"} className="md:w-[45px] sm:w-[40px] w-[30px]" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">YOUR ACCOUNT <br />FOR EVERYTHING <br /> NIKE  </h2>
        <div className='w-[324px] h-[305px]'>
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-2 border border-gray-300  mt-1"
              placeholder="Email address"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              className="w-full p-2 border border-gray-300 mt-1"
              placeholder="Password"
            />
          </div>

          {/* Keep me login checkbox and Forgotten password with gap */}
          <div className="flex justify-between items-center mb-4 space-x-4">
            <div className="flex items-center">
              <input type="checkbox" id="keepme" className="mr-2" />
              <label htmlFor="keepme" className="text-sm text-gray-600 text-[13px]">Keep me logged in</label>
            </div>
            <a href="#" className="text-[13px] text-gray-600">Forgotten your password?</a>
          </div>

          {/* Privacy Policy and Terms of Use Text */}
          <p className="text-sm text-gray-500 mb-10 ml-6 text-center">
            By logging in, you agree to Nikes <a href="#" className="underline text-gray-500">Privacy Policy </a>
            and <a href="#" className="underline text-gray-500">Terms of Use</a>.
          </p>

          {/* Sign in Button */}
          <button className="w-full p-3 bg-black text-white hover:bg-blue-700 mb-4">
            Sign In
          </button>

          {/* Paragraph below the button */}
          <p className="text-sm text-center text-gray-500">
            Not a Member? <a href="#" className="text-black underline">Join Us</a>.
          </p>
        </div>
      </div>
    </div>
  )
}

