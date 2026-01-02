import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const STRIP_COLORS = [
  "bg-gradient-to-b from-orange-400 to-pink-400",
  "bg-gradient-to-b from-blue-400 to-emerald-400",
  "bg-gradient-to-b from-purple-400 to-indigo-400",
  "bg-gradient-to-b from-green-400 to-lime-400",
  "bg-gradient-to-b from-yellow-400 to-orange-400",
];

function ProductGrid({ products, role, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [activeProductId, setActiveProductId] = useState(null);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {products.map((product, idx) => (
          <div
            key={product.id}
            className={`
              group relative flex flex-col items-center bg-white rounded-3xl shadow-xl border border-gray-100
              transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03]
              hover:border-transparent
              backdrop-blur-md
              cursor-pointer
            `}
            style={{
              minHeight: 340,
              cursor: role === "USER" ? "pointer" : "default",
              perspective: 1000,
            }}
            onClick={() => role === "USER" && navigate(`/product/${product.id}`)}
            onMouseEnter={() => role === "ADMIN" && setActiveProductId(product.id)}
            onMouseLeave={() => role === "ADMIN" && setActiveProductId(null)}
          >
            {/* Colorful left strip */}
            <div className={`absolute left-0 top-0 h-full w-3 rounded-l-3xl ${STRIP_COLORS[idx % STRIP_COLORS.length]}`}></div>
            {/* Product Image */}
            <div className="relative w-full flex justify-center pt-8 pb-4 overflow-hidden">
              <img
                src={
                  product.image && product.image.startsWith('/uploads/')
                    ? `http://localhost:5000${product.image}`
                    : product.image
                }
                alt={product.name}
                className="h-32 w-32 object-contain rounded-xl shadow-lg group-hover:scale-110 group-hover:shadow-orange-200 transition-all duration-500"
                style={{ background: "rgba(255,255,255,0.7)" }}
              />
              {/* Sale or Sold Out badge */}
              {product.quantity === 0 ? (
                <span className="absolute top-2 right-2 bg-black text-white text-xs font-bold px-4 py-1 rounded-full shadow animate-bounce">
                  Sold Out
                </span>
              ) : product.onSale ? (
                <span className="absolute top-2 right-2 bg-orange-400 text-white text-xs font-bold px-4 py-1 rounded-full shadow animate-pulse">
                  Sale
                </span>
              ) : null}
            </div>
            {/* Product Info */}
            <div className="px-4 w-full flex flex-col items-center">
              {/* Product Name */}
              <div className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                {product.name || product.title}
              </div>
              {/* Price and Type */}
              <div className="text-center mb-2 flex items-baseline justify-center gap-2">
                <span className="text-2xl md:text-3xl font-extrabold text-blue-700">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-lg md:text-xl text-gray-400 line-through ml-2">${product.oldPrice}</span>
                )}
                {product.type && (
                  <span className="text-base text-gray-500 font-semibold ml-2">{product.type}</span>
                )}
              </div>
              {/* Description */}
              <div className="text-left text-lg font-bold text-gray-700 mt-2 w-full">
                {product.description}
              </div>
            </div>
            {/* Floating Action Buttons */}
       {role === "USER" && (
  <button
    className={`
      absolute bottom-6 left-1/2 -translate-x-1/2
      px-6 py-2 bg-gradient-to-tr from-orange-500 to-pink-500 text-white font-bold rounded-full shadow-lg
      opacity-0 group-hover:opacity-100 transition-all duration-300
      hover:scale-110 animate-bounce
    `}
    onClick={e => {
      e.stopPropagation();
      navigate(`/product/${product.id}`);
    }}
    disabled={product.quantity === 0}
  >
    Buy Now
  </button>
)}
            {role === "ADMIN" && activeProductId === product.id && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
                <button
                  className="px-4 py-1 rounded-lg bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition-all duration-150"
                  onClick={e => {
                    e.stopPropagation();
                    onEdit(product);
                    navigate(`/edit-product/${product.id}`);
                  }}
                  disabled={product.quantity === 0}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition-all duration-150"
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(product.id);
                  }}
                  disabled={product.quantity === 0}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;