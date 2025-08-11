import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="bg-white text-gray-800 pt-16 px-6 sm:px-16">
      {/* Main Footer Content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 text-sm">

        {/* Brand Column */}
        <div>
          <img
            src={assets.logo}
            alt="Zova Logo"
            className="mb-5 w-32 hover:scale-110 transition-transform duration-500"
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            Shopping shouldn’t be complicated. That’s why we deliver looks that feel good, tech that works smooth, and a vibe that speaks your language. Scroll, click, slay — we handle the rest.
          </p>
        </div>

        {/* Inside ZOVA Navigation */}
        <div>
          <p className="text-xl font-semibold mb-5 tracking-wide">INSIDE ZOVA</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            {['Home', 'About Us', 'Delivery', 'Privacy Policy'].map((item, idx) => (
              <li
                key={idx}
                className="hover:text-rose-500 hover:translate-x-1 transition-all duration-300 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-xl font-semibold mb-5 tracking-wide">START THE VIBE</p>
          <ul className="flex flex-col gap-3 text-gray-600">
            {/*<li className="hover:text-rose-500 transition-all duration-300">+91-93273-81425</li>
            <li className="hover:text-rose-500 transition-all duration-300">manthakkar2005@gmail.com</li>
            <li className="hover:text-rose-500 transition-all duration-300">
              <a
                href="https://www.instagram.com/manthakkar_3?igsh=MXVqdTdyNnhiOGNxYg=="
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:scale-105 inline-block"
              >
                Instagram
              </a>
            </li>*/}
          </ul>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="mt-14">
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-500 tracking-widest">
          © 2025 <span className="text-black font-semibold">ZovaMan.com</span> — All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
