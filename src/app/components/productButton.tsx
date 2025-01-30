

"use client";

import React from "react";
import { Product } from "../../../types/products";
import { IoCartOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { addToCart } from "../actions/actions";

interface ProductButtonProps {
  product: Product;
}

const ProductButton: React.FC<ProductButtonProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    Swal.fire({
      position: "top-right",
      icon: "success",
      title: `${product.productName} has been added to the cart`, 
      showConfirmButton: false, 
      timer: 1000, 
    });

    addToCart(product); // Add the product to the cart
  };

  return (
    <button
    className="bg-gradient-to-r from-blue-500 to-blue-800 w-[189px] h-[56px] text-white rounded-full 
    shadow-md hover:scale-110 transition-transform duration-200 ease-in-out flex items-center justify-center space-x-2 mt-8"
    
      onClick={handleAddToCart} // Handle button click here
    >
      <IoCartOutline className="text-white" />
      <span>Add To Cart</span>
    </button>
  );
};

export default ProductButton;
