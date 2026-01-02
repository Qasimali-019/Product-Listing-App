import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      onLogin();
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs">
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <div className="text-red-500 mb-2 text-center">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          className="w-full border px-3 py-2 rounded mb-3"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded mb-3"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;