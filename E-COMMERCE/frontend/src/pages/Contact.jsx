import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="bg-white text-gray-800 transition-all">
      
      {/* Title Section */}
      <div className="text-2xl text-center pt-10 border-t border-gray-200">
        <Title className="text-lg" text1={"LET'S"} text2={' SYNC UP 🔗'} />
      </div>

      {/* Contact Info */}
      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-28 px-6 md:px-12">
        {/* Image */}
        <img
          className="w-full md:max-w-[480px] rounded-xl shadow-lg object-cover"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Info Section */}
        <div className="flex flex-col justify-center gap-6 bg-white p-0">
          <div>
            <p className="text-pink-600 font-semibold text-xl">Our Store</p>
            <p className="text-gray-600 leading-relaxed mt-1">
              203, Vaikunth City <br /> Bakrol, Anand, Gujarat
            </p>
          </div>

          <div>
            <p className="text-gray-600">
              Tel:{' '}
              <span className="text-black font-medium">+91-265-2244-668</span>
              <br />
              Email:{' '}
              <span className="text-black font-medium">admin@Zova.com</span>
            </p>
          </div>

          <div>
            <p className="text-xl font-bold text-gray-800 mt-2">Careers at Zova 🚀</p>
            <p className="text-gray-600">Learn more about our teams and job openings.</p>
            <button
              className="mt-4 border border-gray-700 px-8 py-3 rounded-full font-semibold tracking-wide
              hover:bg-gradient-to-tr hover:from-black hover:to-gray-800 hover:text-white transition-all duration-500" >
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
