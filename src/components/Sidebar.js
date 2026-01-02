import React, { useState } from "react";

const HIGHLIGHT_COLORS = [
  "bg-gradient-to-r from-pink-400 to-orange-400",
  "bg-gradient-to-r from-blue-400 to-cyan-400",
  "bg-gradient-to-r from-green-400 to-lime-400",
  "bg-gradient-to-r from-purple-400 to-indigo-400",
  "bg-gradient-to-r from-yellow-400 to-orange-400",
  "bg-gradient-to-r from-red-400 to-pink-400",
  "bg-gradient-to-r from-teal-400 to-emerald-400",
];

function Sidebar({ categories, selectedCategory, onCategory }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`
      ${expanded ? "w-64" : "w-20"}
      min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white flex flex-col transition-all duration-300 shadow-2xl
    `}
    style={{ minWidth: expanded ? "16rem" : "5rem" }}
    >
      {/* Logo and toggle */}
      <div className="flex items-center justify-between h-32 border-b border-gray-800 px-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXpjISVE2lrJ3x7IcrSdgVrQlMrZMKnLyMg&s"
          alt="Logo"
          className={`object-contain transition-all duration-300 ${expanded ? "h-20 w-20" : "h-10 w-10 mx-auto"}`}
          style={{ maxWidth: expanded ? "80%" : "40px" }}
        />
        <button
          className="text-white bg-gray-800 rounded-full p-2 ml-2 hover:bg-gray-700 transition"
          onClick={() => setExpanded((prev) => !prev)}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          ) : (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 19l7-7-7-7"></path>
            </svg>
          )}
        </button>
      </div>
      {/* Categories */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {categories.map((cat, idx) => (
            <li key={cat}>
              <button
                className={`
                  w-full flex items-center gap-2 px-4 py-2 rounded-lg
                  transition font-semibold
                  ${selectedCategory === cat
                    ? `${HIGHLIGHT_COLORS[idx % HIGHLIGHT_COLORS.length]} text-white shadow-lg`
                    : "hover:bg-gray-800 text-gray-200"}
                  ${expanded ? "justify-start" : "justify-center"}
                `}
                onClick={() => onCategory(cat)}
                style={{
                  fontSize: expanded ? "1rem" : "1.1rem",
                  letterSpacing: "0.02em",
                }}
              >
                {expanded ? cat : cat[0].toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;