import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

   useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className='border-t pt-14 bg-white min-h-screen px-4 sm:px-10'>
      {/* Page Title */}
      <div className='text-3xl mb-6 font-semibold tracking-tight'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart List */}
      <div className='divide-y divide-gray-200'>
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          if (!productData) return null;

          return (
            <div
              key={index}
              className='py-5 grid grid-cols-1 sm:grid-cols-[4fr_2fr_0.5fr] gap-4 sm:items-center transition-all hover:bg-gray-50 rounded-md px-2'
            >
              {/* Left: Product Info */}
              <div className='flex items-start gap-4'>
                <img className='w-16 sm:w-20 rounded-md shadow' src={productData.image[0]} alt='' />
                <div>
                  <p className='text-sm sm:text-lg font-medium text-gray-800'>{productData.name}</p>
                  <div className='flex flex-wrap items-center gap-3 mt-2 text-gray-600 text-sm'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-3 py-0.5 border rounded bg-gray-100 text-xs'>{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Center: Quantity Input */}
              <div className='flex items-center sm:justify-start'>
                <input
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(item._id, item.size, Number(e.target.value))
                  }
                  className='border border-gray-300 rounded-md px-3 py-1 w-16 text-center focus:outline-none focus:ring-2 focus:ring-black'
                  type='number'
                  min={1}
                  defaultValue={item.quantity}
                />
              </div>

              {/* Right: Remove Icon */}
              <div className='flex justify-end items-center'>
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className='w-4 sm:w-5 cursor-pointer hover:scale-110 transition-transform duration-200'
                  src={assets.bin_icon}
                  alt='delete'
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      <div className='flex justify-end mt-16'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button
              onClick={() => navigate('/place-order')}
              className='bg-gradient-to-r from-black to-gray-800 text-white text-sm font-semibold tracking-wide px-8 py-3 mt-8 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:from-gray-900 hover:to-black active:scale-95 transition-all duration-300'
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
