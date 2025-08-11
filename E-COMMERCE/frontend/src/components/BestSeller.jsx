import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    // Optional: sort by popularity or any logic if available
    const bestProduct = products
      .filter(item => item.bestseller)
      .slice(0, 5); // Limit to 5 items
    setBestSeller(bestProduct);
  }, [products]);

  return (
    <div className="my-10 px-4 sm:px-8 lg:px-12">
      {/* Title & Subtext */}
      <div className="text-center py-8 text-3xl">
        <Title text1={'THE HYPE '} text2={'IS REAL'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          "What’s hotter than gossip? This section. What’s next? You in these fits🫶."
        </p>
      </div>

      {/* Products Grid */}
      {bestSeller.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
          {bestSeller.map((item, index) => (
            <div
              key={item._id}
              aria-label={`Best seller item: ${item.name}`}
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
      ) : (
        <p className="text-center text-gray-400 mt-12 text-sm">No best sellers found.</p>
      )}
    </div>
  );
};

export default BestSeller;
