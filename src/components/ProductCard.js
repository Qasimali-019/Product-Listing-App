import React from "react";
import { useNavigate } from "react-router-dom";


class ProductCard extends React.Component {
  render() {
    const { product, onEdit, onDelete, isAuthenticated } = this.props;
    return (
     <div className="bg-white/80 rounded-2xl p-4 shadow-lg hover:shadow-emerald-200/50 hover:scale-105 transition-all duration-200 cursor-pointer border border-emerald-100 backdrop-blur-md"
onClick={() => role === "USER" && navigate(`/product/${product.id}`)}      >
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg w-full h-24 object-cover mb-2"
        />
        <div className="font-semibold text-white text-sm">{product.name}</div>
        <div className="text-gray-400 text-xs truncate">{product.description}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-yellow font-bold">{product.price?.toLocaleString()}</div>
          {product.quantity === 0 ? (
            <span className="text-xs text-red-400 font-bold">Out of Stock</span>
          ) : (
            <span className="text-yellow">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="10" cy="10" r="9"></circle>
                <path d="M10 5v10M5 10h10"></path>
              </svg>
            </span>
          )}
        </div>
        {isAuthenticated && (
          <div className="flex justify-end space-x-2 mt-2">
            <button
              className="text-xs text-yellow hover:text-yellowDark"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(product);
              }}
            >
              Edit
            </button>
            <button
              className="text-xs text-red-400 hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(product.id);
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default function ProductCardWithRouter(props) {
  const navigate = useNavigate();
  return <ProductCard {...props} navigate={navigate} />;
}