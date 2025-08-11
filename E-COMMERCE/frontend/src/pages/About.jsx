import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="bg-white text-gray-800 transition-all">
      {/* Header */}
      <div className="text-2xl text-center pt-8 border-t border-gray-200">
        <Title className="text-lg" text1={'INSIDE '} text2={'THE HYPE 🔥'} />
      </div>

      {/* About Section */}
      <div className="my-10 flex flex-col md:flex-row gap-10 md:gap-16 px-4 sm:px-6 md:px-12">
        <img
          className="w-full md:max-w-[450px] rounded-xl shadow-xl"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 text-gray-700">
          <p className="leading-relaxed text-base sm:text-[17px] tracking-wide">
            We’re not just another fashion destination — we’re the digital wardrobe upgrade your
            personality’s been waiting for. Fueled by creativity, confidence, and just the right
            amount of chaos, we believe in statement pieces that do all the talking. Every
            collection we drop is designed to turn sidewalks into runways and scrolls into
            screenshots. No boring basics. No copy-paste trends. Just bold, wearable energy that
            fits your vibe, your mood, and your moment.
          </p>

          <p className="leading-relaxed text-base sm:text-[17px] tracking-wide">
            We weren’t born in a boardroom — we were built from late-night ideas, bold choices, and
            the belief that fashion should feel like you. Every collection we drop isn’t just about
            style — it’s about energy, confidence, and owning your moment. We create for the
            trendsetters, the rule-breakers, and the “where’d you get that?” crowd. This isn’t fast
            fashion. This is fast expression. And we’re just getting started.
          </p>

          <p className="text-pink-600 text-xl font-bold mt-2">Our Mission</p>
          <p className="leading-relaxed text-base sm:text-[17px] tracking-wide">
            We're here to empower individuals to wear what they feel, break the rules that never
            made sense, and turn every outfit into a statement. From quality to creativity, every
            drop is crafted to inspire confidence — because style isn’t just what you wear, it’s how
            you show up. Our mission? To make fashion personal, powerful, and impossible to ignore.
          </p>
        </div>
      </div>

      {/* What Makes Us Section */}
      <div className="text-2xl py-4 text-center">
        <Title text1={'What Makes Us '} text2={'Your Go-To ✨'} />
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-4 text-sm mb-20 px-4 md:px-10">
        {/* Card 1 */}
        <div className="border border-gray-200 px-6 sm:px-10 md:px-12 py-8 sm:py-14 flex flex-col gap-4 rounded-lg shadow-sm
          hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white hover:border-black transition-all duration-500">
          <b className="text-lg">Quality Assurance:</b>
          <p>
            We stand by what we make — bold in style, solid in quality. Every piece goes through
            strict checks so you can shop stress-free.
          </p>
        </div>

        {/* Card 2 */}
        <div className="border border-gray-200 px-6 sm:px-10 md:px-12 py-8 sm:py-14 flex flex-col gap-4 rounded-lg shadow-sm
          hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white hover:border-black transition-all duration-500">
          <b className="text-lg">Convenience:</b>
          <p>
            No stress, no mess — just easy shopping on your terms. Fast deliveries, smooth returns,
            and everything at your fingertips.
          </p>
        </div>

        {/* Card 3 */}
        <div className="border border-gray-200 px-6 sm:px-10 md:px-12 py-8 sm:py-14 flex flex-col gap-4 rounded-lg shadow-sm
          hover:bg-gradient-to-br hover:from-pink-500 hover:to-red-500 hover:text-white hover:border-black transition-all duration-500">
          <b className="text-lg">Exceptional Customer Service:</b>
          <p>
            Service that listens, solves, and actually cares. Your questions matter — and so do you.
          </p>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default About;
