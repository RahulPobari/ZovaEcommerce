import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="text-gray-700 group cursor-pointer block"
    >
      <div className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <img
          src={image[0]}
          alt={name}
          loading="lazy"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium truncate">{name}</p>
      <p className="text-sm font-semibold text-gray-800">
        {currency}{price}
      </p>
    </Link>
  );
};

export default ProductItem;
