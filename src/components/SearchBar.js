import React from "react";

class SearchBar extends React.Component {
  render() {
    const { search, onSearch } = this.props;
    return (
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full py-2 pl-10 pr-4 rounded-lg bg-zinc-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-yellow">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="9" r="7"></circle>
              <path d="M17 17l-4-4"></path>
            </svg>
          </span>
        </div>
      </div>
    );
  }
}

export default SearchBar;