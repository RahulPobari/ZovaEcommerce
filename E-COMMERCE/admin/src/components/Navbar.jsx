import React from 'react';
import { assets } from '../assets/assets';

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken('');
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-[4%] py-3 border-b border-gray-100 shadow-sm bg-white/60 backdrop-blur-sm">
      <img
        className="w-[80px] sm:w-[max(10%,80px)] transition-transform duration-300 hover:scale-105"
        src={assets.logo}
        alt="Logo"
      />

      <button
        onClick={handleLogout}
        className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-4 sm:px-8 py-2 rounded-full text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
