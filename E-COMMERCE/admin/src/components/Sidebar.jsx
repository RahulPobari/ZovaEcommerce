import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const links = [
    { to: "/add", icon: assets.add_icon, label: "Add Items" },
    { to: "/list", icon: assets.order_icon, label: "List Items" },
    { to: "/orders", icon: assets.order_icon, label: "Orders" }
  ];

  return (
    <div className="w-[70px] sm:w-[18%] min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col items-center sm:items-start py-5 sm:pt-10">
      <div className="flex flex-col gap-6 sm:gap-5 text-xs sm:text-[15px] font-medium w-full items-center sm:pl-[20%]">
        {links.map(({ to, icon, label }, idx) => (
          <NavLink
            key={idx}
            to={to}
            className={({ isActive }) =>
              `flex items-center sm:items-start gap-3 px-3 py-2 rounded-full sm:rounded-l-full w-[90%] justify-center sm:justify-start transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-md"
                  : "hover:bg-pink-100 text-gray-800"
              }`
            }
          >
            <img className="w-5 h-5" src={icon} alt={label} />
            <span className="hidden sm:inline">{label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
