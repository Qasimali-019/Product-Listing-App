import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, delivery, onConfirm }) {
  const orderNumber = "ORD" + Math.floor(100000 + Math.random() * 900000);

  // Calculate totals
  const subTotal = cart.reduce((sum, item) => sum + (item.price * (item.cartQuantity || 1)), 0);
  const discount = 0;
  const tax = 0;
  const shipping = 0;
  const total = subTotal - discount + tax + shipping;

  const [confirmed, setConfirmed] = useState(false);
  const navigate = useNavigate();

  // ✅ Define the handler OUTSIDE the JSX
  const handleConfirmOrder = async () => {
    await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderNumber,
        name: delivery.name,
        phone: delivery.phone,
        email: delivery.email,
        address: delivery.address,
        total,
        cart,
      }),
    });
    onConfirm();
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Order Booked Successfully!</h2>
        <div className="text-lg mb-2">Order Number: <span className="font-bold">{orderNumber}</span></div>
        <button
          className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-100 py-10 px-2">
      <div className="max-w-5xl mx-auto bg-white/90 rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Cart Items and Delivery Details */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>
          {/* Cart Items */}
          <div>
            <h3 className="text-lg font-bold mb-2">Your Items</h3>
            {cart.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center border-b py-4 gap-6">
                <img
                  src={item.image && item.image.startsWith('/uploads/')
                    ? `http://localhost:5000${item.image}`
                    : item.image}
                  alt={item.name}
                  className="h-16 w-16 object-contain rounded"
                />
                <div className="flex-1 w-full">
                  <div className="font-bold text-base text-gray-900">{item.name}</div>
                  <div className="text-orange-500 font-bold text-lg">${item.price}</div>
                  <div className="text-gray-500 text-sm">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Delivery Details (read-only) */}
          <div className="bg-white rounded-xl shadow p-6 border space-y-2 mt-6">
            <h3 className="text-lg font-bold mb-2">Shipping Details</h3>
            <div className="flex flex-col gap-1">
              <div>
                <span className="font-semibold text-gray-500">Name:</span>
                <span className="ml-2 text-black font-bold text-base md:text-lg">{delivery.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Phone:</span>
                <span className="ml-2 text-black font-bold text-base md:text-lg">{delivery.phone}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Email:</span>
                <span className="ml-2 text-black font-bold text-base md:text-lg">{delivery.email}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-500">Address:</span>
                <span className="ml-2 text-black font-bold text-base md:text-lg">{delivery.address}</span>
              </div>
            </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="w-full md:w-80 bg-gray-50 rounded-2xl p-6 shadow flex flex-col gap-4 border border-orange-100 mt-6 md:mt-0">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Order Summary</h3>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Sub Total</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Discount</span>
            <span>${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-base border-t pt-2 text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700 mt-2">
            <span>Order Number</span>
            <span className="font-bold">{orderNumber}</span>
          </div>
          <button
            className="w-full mt-4 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;