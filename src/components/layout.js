import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Layout({
  search,
  onSearch,
  selectedCategory,
  onCategory,
  categories = [],
  role,
  onRoleChange,
  children,
}) {
  const navigate = useNavigate();
const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategory={onCategory}
      />

      <button
  className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
  onClick={() => setSidebarOpen(true)}
>
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 6h16M4 12h16M4 18h16"></path>
  </svg>
</button>


      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar (Orange) with Role Switcher */}
<header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-2 bg-white/90 shadow-md">
{role === "ADMIN" && (
  <button
    className="px-3 py-1 bg-gray-200 text-orange-500 font-bold rounded hover:bg-gray-300 transition text-xs shadow"
    onClick={() => {
      onRoleChange("USER");
      // Optionally, also set isAdminLoggedIn to false in App.js
      window.location.href = "/"; // Go back to home
    }}
  >
    Logout
  </button>
)}

  {/* Left: Logo and Nav */}
  <div className="flex-1 flex justify-center w-full">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHXpjISVE2lrJ3x7IcrSdgVrQlMrZMKnLyMg&s"
      alt="Logo"
      className="h-10 w-10 object-contain rounded-full bg-white border border-orange-200 shadow"
      style={{ maxWidth: "40px" }}
      onClick={() => navigate("/")}
    />

  </div>

  {/* Center: Search Bar */}
  <div className="flex-1 flex justify-center">
    <input
      type="text"
      placeholder="Search for products, brands, categories..."
      className="w-full md:w-2/3 max-w-xl px-6 py-2 border border-gray-300 rounded-l-lg text-black bg-white"
      value={search}
      onChange={e => onSearch(e.target.value)}
    />
    <button className="bg-orange-500 text-white px-6 rounded-r-lg font-bold">SEARCH</button>
  </div>

  {/* Right: Role, Add Product, Cart, Avatar */}
  <div className="flex items-center space-x-3 ml-4">
    <span className={`font-bold text-xs px-3 py-1 rounded-full shadow
      ${role === "ADMIN"
        ? "bg-blue-600 text-white border border-blue-700"
        : "bg-emerald-600 text-white border border-emerald-700"}
    `}>
      {role === "ADMIN" ? "Admin" : "User"}
    </span>
    <select
      value={role}
      onChange={e => onRoleChange(e.target.value)}
      className="border rounded px-2 py-1 text-xs bg-white text-black"
    >
      <option value="USER">User</option>
      <option value="ADMIN">Admin</option>
    </select>
    {role === "ADMIN" && (
      <button
        className="px-3 py-1 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition text-xs shadow"
        onClick={() => navigate("/add-product")}
      >
        + Add Product
      </button>
    )}
    <button
      className="px-3 py-1 bg-orange-500 text-white rounded font-bold hover:bg-orange-600 transition shadow"
      onClick={() => navigate("/cart")}
    >
      Cart
    </button>
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTszuKlB9hcKg-Rn_uvUS8pr0nmqotFhBeMoYCn9Df38Q&s"
      alt="User"
      className="h-10 w-10 object-contain rounded-full border-2 border-orange-200 shadow"
      style={{ maxWidth: "40px" }}
    />
  </div>
</header>
        

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;