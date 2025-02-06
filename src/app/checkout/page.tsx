'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '../../../types/products';

import Swal from 'sweetalert2';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { CgChevronRight } from 'react-icons/cg';
import { client } from '@/sanity/lib/client';
import { getCartItems } from '../actions/actions';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    shippingAddress: '',
    city: '',
    country: '',
    zipCode: '',
    phone: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCartItems(getCartItems() || []); // Ensure it initializes as an array
    const appliedDiscount = localStorage.getItem('discount');
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  const total = Math.max(subTotal - discount, 0); // Renamed for consistency

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    const errors: Record<string, boolean> = {};
    Object.keys(formValues).forEach((key) => {
      errors[key] = !formValues[key as keyof typeof formValues];
    });
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    if (validateForm()) {
      localStorage.removeItem('discount');
      Swal.fire({
        title: 'Order Placed',
        text: 'Your order has been placed successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
        width: "20%"
      });
    }

    const orderData = {
      _type: "order",
      ...formValues,
      cartItems: cartItems.map(item => ({
        _type: "reference",
        _ref: item._id,
      })),
      total: total,
      discount: discount,
      orderDate: new Date().toISOString(), // Fixed function call
    };

    try {
      await client.create(orderData); // Await the API call
      localStorage.removeItem("appliedDiscount");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/cart" className="hover:text-black">Cart</Link>
          <CgChevronRight className="w-4 h-4" />
          <span>Checkout</span>
        </nav>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4 border-b py-3">
                  <Image 
                    src={item.image ? urlFor(item.image).url(): '/default-image.jpg' } 
                    alt={item.productName} 
                    width={64} 
                    height={64} 
                    className="rounded object-cover w-16 h-16 sm:w-20 sm:h-20"
                  />
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-medium">{item.productName}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Qty: {item.inventory}</p>
                  </div>
                  <p className="text-sm sm:text-base font-semibold">${(item.price * item.inventory).toFixed(2)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Your cart is empty.</p>
            )}
            <div className="mt-4 text-right">
              <p className="text-sm sm:text-base">Subtotal: <span className="font-semibold">${subTotal.toFixed(2)}</span></p>
              <p className="text-sm sm:text-base">Discount: <span className="font-semibold">-${discount.toFixed(2)}</span></p>
              <p className="text-lg sm:text-xl font-bold">Total: ${total.toFixed(2)}</p>
            </div>
          </div>

          {/* Billing Information */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(formValues).map((key) => (
                <div key={key}>
                  <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    id={key}
                    value={formValues[key as keyof typeof formValues]}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`}
                    className={`w-full border rounded-md p-2 mt-1 text-sm sm:text-base ${formErrors[key] ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formErrors[key] && (
                    <p className="text-sm text-red-500">{key.replace(/([A-Z])/g, ' $1')} is required.</p>
                  )}
                </div>
              ))}
            </div>
            <button
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition text-sm sm:text-base"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default CheckoutPage;