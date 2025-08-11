import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', {
        headers: { token },
      });
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-lg font-semibold text-pink-600">
        All Products List
      </p>

      <div className="flex flex-col gap-3 w-full">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-100 via-gray-50 to-white shadow-sm text-sm font-medium text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 sm:gap-2 py-3 px-4 border border-gray-200 rounded-lg text-sm shadow-sm hover:shadow-md transition-all duration-300"
          >
            <img
              className="w-14 h-14 object-cover rounded-md"
              src={item.image[0]}
              alt={item.name}
            />
            <p className="truncate">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-gray-800 font-medium">{currency}{item.price}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-center text-red-500 font-bold text-xl transition-transform duration-200 hover:scale-125 hover:text-red-600"
              title="Remove"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
