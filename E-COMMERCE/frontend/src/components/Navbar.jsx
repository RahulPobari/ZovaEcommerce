import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { setShowSearch, getCartCount, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const handleSearchClick = () => {
    setShowSearch(true);
    navigate('/collection');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : 'auto';
  }, [visible]);

  const navLinkClass = ({ isActive }) =>
    `relative pb-1 font-mono text-sm sm:text-base tracking-wider uppercase transition-all duration-300 
     after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r from-fuchsia-500 to-sky-500 hover:after:w-full after:transition-all after:duration-500
     ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-sky-500 after:w-full' : 'text-gray-400 hover:text-black'}`;

  return (
    <>
      {/* Overlay (Mobile Only) */}
      {visible && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 sm:hidden"
          onClick={() => setVisible(false)}
        />
      )}

      {/* Main Navbar */}
      <div className={`w-full px-4 sm:px-6 py-3 bg-white border-b border-gray-100 transition-all duration-300 z-30 relative ${scrolled ? 'sm:shadow-md' : ''}`}>
        <div className="flex justify-between items-center max-w-[1400px] mx-auto">

          {/* Logo (smaller & tighter on mobile) */}
          <Link to="/" className="sm:ml-0 ml-[-6px]">
            <img 
              src={assets?.logo || '/fallback.png'} 
              alt="Logo" 
              className="w-24 sm:w-28 hover:scale-105 transition-transform duration-300" 
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden sm:flex gap-10 font-semibold">
            <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
            <li><NavLink to="/collection" className={navLinkClass}>Collection <span className="ml-1 animate-pulse text-pink-500">★</span></NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
            <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
          </ul>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search */}
            <img 
              src={assets?.search_icon || '/search.png'} 
              onClick={handleSearchClick} 
              alt="Search" 
              className="w-6 cursor-pointer hover:scale-110 transition-transform duration-300" 
            />

            {/* Cart */}
            <Link to="/cart" className="relative hover:scale-110 transition-transform">
              <img src={assets?.cart_icon || '/cart.png'} alt="Cart" className="w-6" />
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white text-[10px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                {getCartCount()}
              </div>
            </Link>

            {/* Profile */}
            <div className="relative group cursor-pointer">
              <img 
                onClick={() => token ? null : navigate('/login')}
                src={assets?.profile_icon || '/profile.png'} 
                alt="User" 
                className="w-7 hover:scale-110 transition-transform duration-300" 
              />
              {token && (
                <div className="absolute top-9 right-0 z-50 w-40 py-3 px-5 bg-white/90 backdrop-blur-md rounded-lg border border-gray-200 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300">
                  <a 
  href="https://github.com/Man-Thakkar03/Codealpha_E-commerce-Store/tree/main/E-COMMERCE" 
  target="_blank" 
  rel="noopener noreferrer"
>
  <p className="hover:text-pink-500 cursor-pointer">Source Code</p>
</a>

                  <p onClick={() => navigate('/orders')} className="hover:text-pink-500 cursor-pointer">Orders</p>
                  <p onClick={logout} className="hover:text-red-500 cursor-pointer">Logout</p>
                </div>
              )}
            </div>

            {/* Mobile Menu Icon */}
            <img 
              onClick={() => setVisible(true)} 
              src={assets?.menu_icon || '/menu.png'} 
              className="w-5 cursor-pointer sm:hidden" 
              alt="Menu" 
            />
          </div>
        </div>
      </div>

      {/* Sidebar (Mobile Only) */}
      <div className={`fixed top-0 right-0 h-full bg-white/90 backdrop-blur-xl z-50 transform transition-transform duration-500 ease-in-out sm:hidden ${visible ? 'translate-x-0 w-4/5' : 'translate-x-full'} overflow-hidden`}>
        <div className="p-6 flex flex-col gap-4 text-base text-gray-700 font-semibold h-full">
          {/* Back Button */}
          <div onClick={() => setVisible(false)} className="flex items-center gap-3 cursor-pointer group">
            <img className="h-4 rotate-180 group-hover:scale-110 transition-transform" src={assets?.dropdown_icon || '/back.png'} alt="Back" />
            <p className="group-hover:text-pink-500 transition-colors">Back</p>
          </div>

          {/* Mobile Nav Links */}
          {[
            { path: '/', label: 'Home', gradient: 'from-pink-500 via-red-400 to-orange-500' },
            { path: '/collection', label: 'Collection', gradient: 'from-purple-500 to-sky-500' },
            { path: '/about', label: 'About', gradient: 'from-fuchsia-600 to-sky-500' },
            { path: '/contact', label: 'Contact', gradient: 'from-pink-500 to-orange-500' }
          ].map(({ path, label, gradient }, index) => (
            <NavLink
              key={index}
              to={path}
              onClick={() => setVisible(false)}
              className={({ isActive }) =>
                `py-2 pl-4 border-b transition-all duration-300 ${
                  isActive
                    ? `text-transparent bg-clip-text bg-gradient-to-r ${gradient}`
                    : 'text-gray-700 hover:text-pink-500'
                }`
              }>
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
