import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, onRemoveFromCart, onCheckout }) {
  const navigate = useNavigate();

  // Calculate totals
  const subTotal = cart.reduce((sum, item) => sum + (item.price * (item.cartQuantity || 1)), 0);
  const discount = 0;
  const tax = 0;
  const shipping = 0;
  const total = subTotal - discount + tax + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-100 py-6 px-2">
      <div className="max-w-5xl mx-auto bg-white/80 rounded-3xl shadow-2xl flex flex-col md:flex-row p-4 md:p-8 gap-8 backdrop-blur-md">
        {/* Cart Items */}
        <div className="flex-1 w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Cart</h2>
          {cart.length === 0 ? (
            <div className="text-gray-500 py-16 text-lg flex flex-col items-center">
              Your cart is empty.
              <button
                className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center border-b py-6 gap-6">
                {/* Product Image Card */}
                <div className="bg-white rounded-xl shadow-md p-2 flex items-center justify-center mb-4 sm:mb-0">
                  <img
                    src={item.image && item.image.startsWith('/uploads/')
                      ? `http://localhost:5000${item.image}`
                      : item.image}
                    alt={item.name}
                    className="h-20 w-20 object-contain rounded"
                  />
                </div>
                {/* Product Info */}
                <div className="flex-1 w-full">
                  <div className="font-extrabold text-lg text-gray-900">{item.name}</div>
                  <div className="text-orange-500 font-extrabold text-xl">${item.price}</div>
                  <div className="text-xs text-gray-400 mt-1">Color: {item.color || "N/A"}</div>
                  <div className="text-base text-gray-700 font-bold mt-1">{item.description}</div>
                </div>
                {/* Remove Button */}
                <button
                  className="mt-4 sm:mt-0 ml-0 sm:ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 shadow transition"
                  onClick={() => onRemoveFromCart(item.id)}
                  title="Remove"
                >
                  &times;
                </button>
              </div>
            ))
          )}
        </div>
        {/* Order Summary */}
        <div className="w-full md:w-80 bg-white/80 rounded-2xl p-6 shadow-lg flex flex-col gap-4 backdrop-blur-md border border-orange-100">
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
          <button
            className="w-full mt-4 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition"
            onClick={() => navigate("/checkout")}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
          <div className="text-xs text-gray-500 mt-2">
            Estimated Delivery by 25 April, 2022
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="text"
              placeholder="Coupon Code"
              className="flex-1 px-2 py-1 border rounded text-xs"
              disabled
            />
            <button className="px-3 py-1 bg-gray-200 rounded text-xs font-bold" disabled>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;