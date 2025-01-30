"use client";

import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../context/cartContext"; // Importing cart context

export default function NewNavbar() {
  const { getCartCount } = useCart(); // Access cart context
  const cartCount = getCartCount(); // Get total cart count

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  return (
    <header className="bg-gray-100 shadow-md">
      <nav className="flex items-center justify-between px-4 py-4 bg-gray-200">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <Image
            src="/vector.png"
            alt="Shoe Store Logo"
            width={50}
            height={50}
            className="rounded-md"
          />
          <Link href="/">
            <span className="text-2xl font-bold text-gray-800">Shoe World</span>
          </Link>
        </div>

        {/* Centered Content */}
        <div className="hidden md:block">
          <p className="font-bold text-lg text-gray-800">Welcome to Shoe World</p>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="hover:text-gray-800">
            Home
          </Link>
          <Link href="/contact" className="hover:text-gray-800">
            Join Us
          </Link>
          <Link href="/login" className="hover:text-gray-800">
            Sign In
          </Link>
          <FaHeart className="text-gray-700 text-xl cursor-pointer hover:text-black" />
          <Link href="/cart" className="relative">
            <FaShoppingBag className="text-gray-700 text-xl cursor-pointer hover:text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </nav>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="flex flex-col bg-gray-200 px-4 py-2 md:hidden">
          <Link href="/" className="hover:text-black text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/contact" className="hover:text-black text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>
            Join Us
          </Link>
          <Link href="/login" className="hover:text-black text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>
            Sign In
          </Link>
          <Link href="/cart" className="hover:text-black text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>
            Cart
          </Link>
        </div>
      )}
    </header>
  );
}
