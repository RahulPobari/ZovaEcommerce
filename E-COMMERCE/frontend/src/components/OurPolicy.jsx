import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <section className='bg-white py-20 px-6'>
      <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-4 text-center text-xs sm:text-sm md:text-base text-gray-700'>

        {/* Policy 1 */}
        <div className='hover:scale-105 transition-transform duration-300 cursor-default'>
          <img
            src={assets.exchange_icon}
            className='w-12 m-auto mb-5'
            alt="Easy Exchange Icon"
            loading='lazy'
          />
          <h3 className='font-semibold text-black'>Easy Exchange Policy</h3>
          <p className='text-gray-500'>We offer hassle-free exchange for all products.</p>
        </div>

        {/* Policy 2 */}
        <div className='hover:scale-105 transition-transform duration-300 cursor-default'>
          <img
            src={assets.quality_icon}
            className='w-12 m-auto mb-5'
            alt="7-Day Return Icon"
            loading='lazy'
          />
          <h3 className='font-semibold text-black'>7-Day Return Policy</h3>
          <p className='text-gray-500'>Return any item within 7 days — no questions asked.</p>
        </div>

        {/* Policy 3 */}
        <div className='hover:scale-105 transition-transform duration-300 cursor-default'>
          <img
            src={assets.support_img}
            className='w-12 m-auto mb-5'
            alt="24/7 Support Icon"
            loading='lazy'
          />
          <h3 className='font-semibold text-black'>24/7 Customer Support</h3>
          <p className='text-gray-500'>We're here for you around the clock, always.</p>
        </div>
      </div>
    </section>
  );
};

export default OurPolicy;
