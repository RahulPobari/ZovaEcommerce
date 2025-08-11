import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0); 

    if (products.length > 0) {
      const item = products.find((item) => item._id === productId);
      if (item) {
        setProductData(item);
        setImage(item.image[0]);
      }
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="w-full flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-400 text-sm animate-pulse">Loading product...</p>
      </div>
    );
  }

  return (
    <div className='bg-white border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Section */}
      <div className='flex gap-12 flex-col sm:flex-row'>
        {/* Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row sm:gap-5'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
  onClick={() => setImage(item)}
  src={item}
  key={index}
  className={`w-[24%] sm:w-full mr-3 last:mr-0 sm:mb-4 flex-shrink-0 cursor-pointer transition duration-300 rounded-lg hover:shadow-md ${
    item === image ? 'ring-2 ring-orange-500' : ''
  }`}
  alt=''
/>

            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img
              className='w-full h-auto transition-all duration-500 rounded-lg shadow-md'
              src={image}
              alt='Selected Product'
            />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-semibold text-3xl mt-2 text-gray-800 tracking-tight'>{productData.name}</h1>

          {/* Rating */}
          <div className='flex items-center gap-1 mt-3'>
            {[...Array(4)].map((_, i) => (
              <img src={assets.star_icon} alt='star' className='w-4' key={i} />
            ))}
            <img src={assets.star_dull_icon} alt='star' className='w-4' />
            <p className='pl-2 text-gray-500'>(137)</p>
          </div>

          <p className='mt-5 text-4xl font-semibold text-rose-600'>
            {currency}
            {productData.price}
          </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>

          {/* Size Select */}
          <div className='flex flex-col gap-4 my-8'>
            <p className='text-gray-700 font-medium'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-5 rounded-lg font-semibold transition-all duration-300 hover:shadow-md ${
                    item === size
                      ? 'bg-black text-white border-black scale-105'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => {
              if (!size) {
                toast.error('Please select a size before adding to cart.');
                return;
              }
              addToCart(productData._id, size);
              navigate('/cart');
            }}
            className='bg-black text-white px-10 py-3 text-sm rounded-md mt-4 font-semibold transition duration-300 hover:bg-neutral-900 active:scale-95 shadow-lg'
          >
            ADD TO CART
          </button>

          {/* Policy */}
          <hr className='mt-10 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>✅ 100% Original Product</p>
            <p>🚚 Cash on delivery available</p>
            <p>🔁 Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Review */}
      <div className='mt-20'>
        <div className='flex'>
          <p className='border px-5 py-3 text-sm font-semibold text-gray-700 bg-gray-100'>Description</p>
          <p className='border px-5 py-3 text-sm font-semibold text-gray-500'>Reviews (137)</p>
        </div>
        <div className='flex flex-col gap-4 border rounded-xl bg-white/60 backdrop-blur-sm shadow-md px-6 py-6 text-sm text-gray-500'>
          <p>
            This isn’t just a product — it’s a whole damn mood.🔥<br></br>
Designed to make you look bold, feel confident, and own every room you walk into. Whether you’re dressing <br />
 to impress or undressing the rules, this piece brings the heat.
          </p>
          <p>
            For the wild ones, the heart-stealers, and the unapologetically stylish — this is your sign to turn up the crazy and slay your vibe.⚡<br />
Hot. Edgy. Unforgettable. <br />
Because ordinary? That’s just not your style.😉
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
