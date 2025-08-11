import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    return filtered;
  };

  const sortProduct = (productsArray) => {
    if (!sortType) {
      setFilterProducts(productsArray);
      return;
    }

    const sorted = [...productsArray].sort((a, b) => {
      if (sortType === 'low-high') return a.price - b.price;
      if (sortType === 'high-low') return b.price - a.price;
      return 0;
    });

    setFilterProducts(sorted);
  };

  useEffect(() => {
    const filtered = applyFilter();
    sortProduct(filtered);
  }, [products, category, subCategory, search, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-4 sm:px-8 lg:px-12">
      
      {/* Filter Sidebar */}
      <div className="min-w-60">
        {/* Filter Toggle (mobile) */}
        <div className="block sm:hidden">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center justify-between w-full bg-white py-2 px-4 border rounded shadow mb-4 cursor-pointer text-base font-semibold text-gray-700"
          >
            FILTERS
            <img
              className={`w-3 h-3 ml-2 transition-transform ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>
        </div>

        <div className={`${showFilter ? "block" : "hidden"} sm:block`}>
          {/* Categories */}
          <div className="rounded-xl border border-gray-300 shadow px-4 py-4 mt-6 bg-white">
            <p className="mb-3 text-sm font-bold text-gray-700">CATEGORIES</p>
            {['Men', 'Women'].map((label) => (
              <label key={label} className="flex items-center gap-2 py-1 text-sm text-gray-700">
                <input
                  type="checkbox"
                  value={label}
                  onChange={toggleCategory}
                  className="accent-rose-500"
                />
                {label}
              </label>
            ))}
          </div>

          {/* Subcategories */}
          <div className="rounded-xl border border-gray-300 shadow px-4 py-4 mt-6 bg-white">
            <p className="mb-3 text-sm font-bold text-gray-700">TYPE</p>
            {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
              <label key={type} className="flex items-center gap-2 py-1 text-sm text-gray-700">
                <input
                  type="checkbox"
                  value={type}
                  onChange={toggleSubCategory}
                  className="accent-rose-500"
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Main Product Content */}
      <div className="flex-1">
        {/* Title & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-lg sm:text-2xl mb-4">
          <Title text1={'BECAUSE BORING? '} text2={' COULDN’T BE YOU'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="">Sort by: Relevance</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <div
              key={index}
              className="hover:scale-[1.05] hover:shadow-2xl hover:bg-white/30 transition-all duration-300 rounded-xl"
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
    </div>
  );
};

export default Collection;
