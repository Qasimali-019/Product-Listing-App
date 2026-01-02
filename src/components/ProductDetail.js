import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetail({ products, userDetails, onSaveUserDetails, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => String(p.id) === id);

  // Only show form if userDetails is not filled
  const needsForm = !userDetails || !userDetails.name || !userDetails.address || !userDetails.phone || !userDetails.email;
  const [showForm, setShowForm] = useState(needsForm);
  const [form, setForm] = useState(userDetails || {
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  if (!product) return <div className="text-center py-16">Product not found.</div>;

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-br from-orange-50 via-white to-pink-100">
      <div className="bg-white rounded-3xl shadow-2xl border-2 border-orange-100 p-10 max-w-2xl w-full flex flex-col items-center relative">
        {/* ...product details as before... */}
        <div className="w-56 h-56 flex items-center justify-center bg-white/70 rounded-2xl shadow-lg mb-6 overflow-hidden border-4 border-orange-100">
          <img
            src={product.image && product.image.startsWith('/uploads/')
              ? `http://localhost:5000${product.image}`
              : product.image}
            alt={product.name}
            className="object-contain h-full w-full drop-shadow-xl"
          />
        </div>
        <div className="text-center text-4xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow">
          {product.name || product.title}
        </div>
        <div className="text-center mb-2">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-orange-500 to-pink-500 bg-clip-text text-transparent drop-shadow">
            ${product.price}
          </span>
        </div>
        <div className="text-left text-xl font-bold text-gray-700 mb-4 w-full">
          {product.description}
        </div>
        {/* Add to Cart Button or User Details Form */}
        {!showForm ? (
          <button
            className="mt-2 px-10 py-3 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:from-emerald-500 hover:to-emerald-700 transition-all duration-200"
            onClick={() => {
              onAddToCart(product);
              navigate("/cart");
            }}
            disabled={product.quantity === 0}
          >
            {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        ) : (
          <form
            onSubmit={e => {
              e.preventDefault();
              onSaveUserDetails(form);
              onAddToCart(product);
              setShowForm(false);
              navigate("/cart");
            }}
            className="w-full mt-6 bg-white rounded-xl shadow p-6 border"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Your Details</h3>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Full Name"
              required
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Phone"
              required
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Email"
              required
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded mb-3"
              placeholder="Shipping Address"
              required
            />
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition"
              >
                Confirm & Add to Cart
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;