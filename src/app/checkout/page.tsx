"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "../../../types/products";
import { getCartItems } from "../actions/actions";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const items = getCartItems();
    if (items) {
      setCartItems(items);
    }
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.inventory, 0);
  const total = Math.max(subtotal - discount, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const validateForm = () => {
    return Object.values(formValues).every((value) => value.trim() !== "");
  };

  const handlePlaceOrder = () => {
    if (validateForm() && paymentMethod) {
      localStorage.removeItem("appliedDiscount");
      Swal.fire("Success!", "Your order has been placed.", "success");
    } else {
      Swal.fire("Error!", "Please fill all fields and select a payment method.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Checkout</h2>

        <div className="mb-6 border-b pb-4 space-y-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
                  {item.image && (
                    <Image
                      src={urlFor(item.image)?.url() || "/fallback-image.jpg"}
                      alt={item.productName}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.productName}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.inventory}</p>
                </div>
                <p className="text-lg font-semibold text-gray-800">${item.price * item.inventory}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          )}
        </div>

        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Discount: -${discount.toFixed(2)}</p>
          <p className="font-bold">Total: ${total.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input id="firstName" placeholder="First Name" className="border p-2 w-full" onChange={handleInputChange} />
          <input id="lastName" placeholder="Last Name" className="border p-2 w-full" onChange={handleInputChange} />
        </div>
        <input id="address" placeholder="Address" className="border p-2 w-full mb-4" onChange={handleInputChange} />
        <input id="city" placeholder="City" className="border p-2 w-full mb-4" onChange={handleInputChange} />
        <input id="zipCode" placeholder="Zip Code" className="border p-2 w-full mb-4" onChange={handleInputChange} />
        <input id="phone" placeholder="Phone" className="border p-2 w-full mb-4" onChange={handleInputChange} />
        <input id="email" placeholder="Email" className="border p-2 w-full mb-4" onChange={handleInputChange} />

        <select className="border p-2 w-full mb-4" value={paymentMethod} onChange={handlePaymentChange}>
          <option value="">Select Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Cash on Delivery">Cash on Delivery</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

