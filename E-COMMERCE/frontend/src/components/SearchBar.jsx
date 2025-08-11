import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setVisible(location.pathname.includes('collection'));
  }, [location]);

  if (!(showSearch && visible)) return null;

  return (
    <div className="w-full px-4 sm:px-6 py-4 border-t border-b bg-white z-40 sticky top-[64px] sm:top-[72px]">
      <div className="max-w-[800px] mx-auto flex items-center gap-3">
        {/* Search Input */}
        <div className="flex items-center flex-1 border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search for products..."
            className="flex-1 text-sm sm:text-base outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
          />
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform ml-2"
            onClick={() => {
              if (search.trim() !== '') {
                // Add search trigger logic if needed
              }
            }}
          />
        </div>

        {/* Close (X) Button */}
        <button
          onClick={() => {
            setShowSearch(false);
            setSearch('');
          }}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close search"
        >
          <img
            src={assets.cross_icon}
            alt="Close"
            className="w-4 h-4"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
