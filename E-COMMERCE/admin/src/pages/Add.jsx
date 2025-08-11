import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full max-w-4xl mx-auto items-start gap-8 p-4 sm:p-6 mt-4"
    >
      {/* Image Upload */}
      <div className="w-full">
        <p className="text-sm font-semibold mb-2 text-pink-600">Upload Product Images</p>
        <div className="flex gap-3 sm:gap-4 flex-wrap">
          {[image1, image2, image3, image4].map((img, idx) => (
            <label
              key={idx}
              htmlFor={`image${idx + 1}`}
              className="relative border-2 border-dashed border-pink-500 rounded-xl w-24 h-24 flex justify-center items-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt=""
                className="w-20 h-20 object-cover rounded"
              />
              <input
                type="file"
                id={`image${idx + 1}`}
                hidden
                onChange={(e) => {
                  const setter = [setImage1, setImage2, setImage3, setImage4][idx];
                  setter(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="text-sm font-semibold mb-2 text-pink-600">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-4 py-3 border border-pink-400 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="text-sm font-semibold mb-2 text-pink-600">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full px-4 py-3 border border-fuchsia-500 rounded focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category, Subcategory, Price */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1">
          <p className="text-sm font-semibold mb-2 text-pink-600">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-pink-400 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold mb-2 text-pink-600">Product Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-4 py-3 border border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold mb-2 text-pink-600">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-4 py-3 border border-pink-400 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            type="number"
            placeholder="₹99"
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="w-full">
        <p className="text-sm font-semibold mb-2 text-pink-600">Product Sizes</p>
        <div className="flex gap-2 flex-wrap">
          {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                sizes.includes(size)
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow'
                  : 'border-gray-400 hover:border-pink-500'
              }`}
            >
              {size === '2XL' ? 'XXL' : size}
            </button>
          ))}
        </div>
      </div>

      {/* Bestseller Checkbox */}
      <div className="flex gap-2 mt-2 items-center">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          className="accent-pink-500 w-4 h-4"
        />
        <label htmlFor="bestseller" className="text-sm">Add to bestseller</label>
      </div>

      {/* Submit Button */}
      <button
        className="mt-6 px-10 py-3 bg-black text-white text-sm font-semibold rounded-full hover:scale-105 transition-transform duration-300 hover:shadow-lg hover:shadow-pink-500/40"
        type="submit"
      >
        🚀 ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
