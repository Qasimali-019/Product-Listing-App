import React from "react";
import { AuthContext } from "./AuthContext";

class Header extends React.Component {
  static contextType = AuthContext;
  render() {
    const { isAuthenticated, login, logout } = this.context;
    return (
      <div className="flex items-center justify-between px-6 py-4">
      <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-emerald-500 drop-shadow">
  Sweet <span className="text-rose-400">Moments</span>
</h1>
<p className="text-lg text-gray-500 font-poppins mt-2">Find your next treat!</p>
        <div className="flex items-center space-x-4">
          <button
            className="text-yellow hover:text-yellowDark"
            onClick={isAuthenticated ? logout : login}
            title={isAuthenticated ? "Logout" : "Login"}
          >
            {isAuthenticated ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7"></path>
                <path d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0z"></path>
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M6 20v-2a4 4 0 0 1 8 0v2"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    );
  }
}

export default Header;