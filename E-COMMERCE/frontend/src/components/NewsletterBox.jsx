import React from 'react';

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // You can later add your API logic here
  };

  return (
    <section className='text-center py-16 px-4 bg-white'>
      {/* Title */}
      <h2 className='text-3xl font-bold text-gray-900 tracking-tight'>
        Subscribe & Get 20% Off 💥
      </h2>
      <p className='text-gray-500 mt-3 text-sm sm:text-base'>
        Get the hottest drops, early access, and exclusive promos right in your inbox.
      </p>

      {/* Form */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full sm:w-2/3 md:w-1/2 flex items-center gap-3 mx-auto mt-8 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300'
        aria-label="Subscribe to newsletter"
      >
        <input
          type="email"
          className='w-full bg-transparent text-sm px-2 py-3 outline-none placeholder-gray-400 text-gray-700'
          placeholder='Drop your email here...'
          aria-label='Email address'
          required
        />

        <button
          type="submit"
          className="relative flex items-center justify-center overflow-hidden bg-black text-white text-xs sm:text-sm font-extrabold uppercase px-6 py-3 rounded-full 
                    transition-all duration-500 ease-in-out active:scale-95 group"
        >
          {/* Button Glow on Hover */}
          <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-yellow-500 to-purple-500 opacity-0 group-hover:opacity-70 blur-md transition-all duration-500"></span>
          <span className="relative z-10">Subscribe</span>
        </button>
      </form>
    </section>
  );
};

export default NewsletterBox;
