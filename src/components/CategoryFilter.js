import React from "react";
const categories = ["Donuts", "Ice Cream", "Bomboloni", "All"];
class CategoryFilter extends React.Component {
  render() {
    const { category, onCategory } = this.props;
    return (
      <div className="flex space-x-4 mt-2">
        {categories.map((cat) => (
          <button
            key={cat}
            
            className={`px-4 py-1 rounded-full font-semibold text-sm
              ${category === cat
                ? "bg-gradient-to-r from-emerald-400 to-rose-400 text-white shadow"
                : "bg-white/60 text-gray-500 border border-emerald-100"}
              hover:scale-105 transition-all duration-150 mx-1`}
            onClick={() => onCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    );
  }
}
export default CategoryFilter;