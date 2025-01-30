import React from 'react'
import Image from 'next/image'
import vector from "../../../public/vector.png"

export default function Contact() {
  return (
    <div className="h-full top-[96px] left-[511.3px] flex justify-center items-center">
      <div className="w-[360px] h-auto bg-white p-6 ">
        {/* Centered Vector Image */}
        <div className=" w-[304.5px] flex justify-center mb-4">
          <Image src={vector} alt={"image"} className="md:w-[45px] sm:w-[40px] w-[30px]" />
        </div>
        
        {/* BECOME A NIKE MEMBER Section */}
        <div className="mb-6 text-center">
          <h2 className="text-1xl font-bold mb-6">BECOME A NIKE MEMBER</h2>
          <p className="text-sm text-gray-500">
            Create your Nike Member profile and get first access to the very best of Nike products, inspiration, and community.
          </p>
        </div>

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
            type="email"
            className="w-full p-2 border border-gray-300 mt-1"
            placeholder="Password"
          />
        </div>

        {/* First Name Input */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300  mt-1"
            placeholder="First Name"
          />
        </div>

        {/* Last Name Input */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300  mt-1"
            placeholder="Last Name"
          />
        </div>

        {/* Date of Birth Input */}
        <div className="mb-2">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 mt-1"
            placeholder="Date of Birth"
          />
        </div>
        <p className='text-xs text-gray-500 mb-4 ml-4 whitespace-nowrap'>Get a Nike Member Reward every year on your Birthday.</p>

        {/* Country Dropdown */}
        <div className="mb-4">
          <select className="w-full p-2 border border-gray-300 text-gray-400">
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            {/* Add more countries if needed */}
          </select>
        </div>

        {/* Male and Female Input for India */}
        <div className="mb-4 flex justify-between gap-4">
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 mt-1 text-center"
              placeholder='Male'
             
            />
           
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 mt-1 text-center "
              placeholder='Female'/>
             
             
          </div>
        </div>

        {/* Sign up for emails checkbox */}
        <div className="flex items-center mb-4">
          <input type="checkbox" id="signupEmails" className="mr-4 transform scale-150 " />
          <label htmlFor="signupEmails" className="text-[12px] text-gray-500">
            Sign up for emails to get updates from Nike on
             products, offers, and your Member benefits 
          </label>
        </div>
 

        {/* Privacy Policy and Terms of Use Text */}
        <p className="text-sm text-center text-gray-500 mb-4">
          By creating an account, you agree to Nikes <a href="#" className="underline text-gray-500">Privacy Policy </a> 
          and <a href="#" className="underline text-gray-500">Terms of Use</a>.
        </p>

        {/* Sign in Button */}
        <button className="w-full p-3 bg-black text-white hover:bg-blue-700 mb-4">
          Join Us
        </button>

        {/* Paragraph below the button */}
        <p className="text-sm text-center text-gray-500">
          Already a Member? <a href="#" className="text-black underline">Sign In</a>.
        </p>
      </div>
    </div>
  )
}
