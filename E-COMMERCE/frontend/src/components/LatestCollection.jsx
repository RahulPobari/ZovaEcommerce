import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10)); // Safely get the first 10 latest items
  }, [products]);

  return (
    <div className="my-10 px-4 sm:px-8 lg:px-12">
      {/* Title + Subtext */}
      <div className="text-center py-8 text-3xl">
        <Title text1="CLOTHES THAT DESERVE" text2="A MAIN CHARACTER PLAYLIST" />
        <p className="w-3/4 mx-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Warning: Our latest collection is hotter than your ex’s DMs 😉
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
        {latestProducts.map((item, index) => (
          <div
            key={item._id || index}
            className="transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-xl rounded-xl"
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
