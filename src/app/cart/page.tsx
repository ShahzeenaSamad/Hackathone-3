"use client";

import React, { useEffect, useState } from 'react';
import { Product } from '../../../types/products';
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import Swal from 'sweetalert2';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) {
      handleQuantityChange(id, product.inventory + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventory > 1) {
      handleQuantityChange(id, product.inventory - 1);
    }
  };

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  };
 const router = useRouter()
  const handledProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your order before proceeding.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success!", "Your order has been placed.", "success");
        router.push("/checkout")
        setCartItems([]);
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-lg text-center text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between space-x-4 p-4 border rounded-lg shadow-sm">
              {item.image && (
                <Image
                  src={urlFor(item.image).url()}
                  className="w-20 h-20 object-cover rounded-md"
                  alt={item.productName}
                  width={80}
                  height={80}
                />
              )}

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
                <p className="text-sm text-gray-600">Price: ${item.price}</p>
                <p className="text-sm text-gray-600">In stock: {item.inventory}</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleDecrement(item._id)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  -
                </button>

                <span className="text-gray-800">{item.inventory}</span>

                <button
                  onClick={() => handleIncrement(item._id)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(item._id)}
                className="ml-4 text-red-600 hover:text-red-800 transition"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">Total: ${calculatedTotal().toFixed(2)}</h3>
            <button
              onClick={handledProceed}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;