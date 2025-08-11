import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative w-full bg-[#0e0e0e] text-white py-24 px-6 sm:px-16 rounded-3xl overflow-hidden mt-6 border border-white/10 shadow-[0_0_60px_#ff00ff30] group transition-all duration-700 hover:shadow-[0_0_100px_#ff00ff60] hover:scale-[1.015]">

      {/*Background Light Flares */}
      <div className="absolute -top-32 -left-24 w-[30rem] h-[30rem] bg-gradient-to-br from-pink-500 via-fuchsia-600 to-purple-700 opacity-20 rounded-full blur-[160px] animate-pulse group-hover:opacity-40 transition duration-500"></div>
      <div className="absolute bottom-[-7rem] right-[-4rem] w-[25rem] h-[25rem] bg-gradient-to-tr from-purple-700 to-pink-500 opacity-20 rounded-full blur-[140px] animate-ping group-hover:opacity-40 transition duration-500"></div>

      {/* Glow Ring */}
      <div className="absolute inset-0 border border-pink-500/10 rounded-[2rem] blur-md opacity-10 group-hover:opacity-20 pointer-events-none animate-glow-ring"></div>

      {/*Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 transition-all duration-500 group-hover:scale-[1.01]">

        <p className="text-pink-400 font-bold tracking-widest text-xs sm:text-sm uppercase animate-fade-in-up">
          🌐 Exclusive Drop – Just Landed
        </p>

        <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-transparent bg-gradient-to-r from-pink-500 via-red-400 to-purple-500 bg-clip-text animate-fade-in-up tracking-tight group-hover:tracking-widest transition-all duration-700">
          Glow Bold. Dress Louder.
        </h1>

        <p className="text-gray-300 max-w-2xl text-base sm:text-lg leading-relaxed animate-fade-in-up delay-200">
          Don’t follow trends — launch them. Your outfit is your voice. Let it shout in neon, whisper in satin, and dance under strobe lights. This is your era.
        </p>

        <Link to="/collection" className="animate-fade-in-up delay-300">
          <button className="relative mt-4 px-10 py-3 rounded-full font-bold text-sm sm:text-base text-white tracking-wider bg-gradient-to-r from-fuchsia-600 via-pink-500 to-red-500 shadow-[0_0_30px_#ff00ff30] hover:shadow-[0_0_50px_#ff00ff90] hover:scale-110 active:scale-105 transition-all duration-300 ease-in-out overflow-hidden">
            <span className="relative z-10">Shop The Drop ❤️‍🔥</span>
            <span className="absolute inset-0 bg-white/10 blur-md opacity-0 hover:opacity-20 transition-all duration-500" />
          </button>
        </Link>

        {/*Extra Touch: Teaser Tagline */}
        <div className="mt-3 text-pink-200 text-xs sm:text-sm tracking-wider uppercase animate-fade-in-up delay-500">
          Designed in chaos. Delivered with love.
        </div>
      </div>

      {/* Scroll Prompt */}
      <div className="absolute bottom-4 left-[460px] transform -translate-x-1/2 text-white/40 text-xs sm:text-sm tracking-widest animate-bounce">
        ↓ Keep Scrolling to Unlock the Style Vault ↓
      </div>
    </div>
  );
};

export default Hero;
