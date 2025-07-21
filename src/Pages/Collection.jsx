import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../Components/ProductItem";
import { assets } from "../assets/assets";

const Collection = () => {
  const { products, search, setsearch, showSearch, setshowSearch } =
    useContext(ShopContext);
  const [FilterProducts, setFilterProducts] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const [Categoery, setCategoery] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [sortType, setsortType] = useState("relavent");

  console.log(search);

  const toggleCategoery = (e) => {
    if (Categoery.includes(e.target.value)) {
      setCategoery((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategoery((prev) => [...prev, e.target.value]);
    }
  };

  const togleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setsubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setsubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const ApplyFilter = () => {
    let copyProducts = products.slice();

    if (Categoery.length > 0) {
      copyProducts = copyProducts.filter((item) =>
        Categoery.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      copyProducts = copyProducts.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (search && showSearch) {
      copyProducts = copyProducts.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilterProducts(copyProducts);
  };

  const sortProducts = () => {
    let Products = FilterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(Products.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(Products.sort((a, b) => b.price - a.price));
        break;
      default:
        ApplyFilter();
        break;
    }
  };

  useEffect(() => {
    ApplyFilter();
  }, [Categoery, subCategory, search, showSearch,products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 w-full">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl lg:rounded-3xl shadow-xl border border-gray-200/50 p-4 sm:p-6 lg:p-8 sticky top-4 lg:top-8 transition-all duration-300 hover:shadow-2xl">
              {/* Filter Toggle Button for Mobile */}
              <div
                onClick={() => setShowFilter(!showFilter)}
                className="lg:hidden flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 py-3 px-4 rounded-xl cursor-pointer transition-all duration-200 mb-4"
              >
                <h2 className="text-base font-semibold text-gray-700">
                  FILTERS
                </h2>
                <img
                  src={assets.dropdown_icon}
                  className={`w-3 h-3 transform transition-transform duration-200 ${
                    showFilter ? "rotate-90" : ""
                  }`}
                  alt="toggle"
                />
              </div>

              {/* Desktop Title */}
              <h2 className="hidden lg:block text-xl lg:text-2xl font-bold mb-6 lg:mb-8 text-gray-900 tracking-tight border-b border-gray-100 pb-4">
                FILTERS
              </h2>

              {/* Filters Content */}
              <div
                className={`space-y-6 lg:space-y-8 ${showFilter ? "block" : "hidden"} lg:block`}
              >
                {/* Categories Filter */}
                <div>
                  <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-3"></span>
                    CATEGORIES
                  </h3>
                  <div className="space-y-2 lg:space-y-3">
                    {["Men", "Women", "Kids"].map((label) => (
                      <label
                        key={label}
                        className="group flex items-center gap-3 cursor-pointer p-2 lg:p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 lg:w-5 lg:h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all"
                          value={label}
                          onChange={toggleCategoery}
                        />
                        <span className="text-sm lg:text-base text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 text-gray-800 flex items-center">
                    <span className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-3"></span>
                    TYPE
                  </h3>
                  <div className="space-y-2 lg:space-y-3">
                    {["Topwear", "Bottomwear", "Winterwear"].map((label) => (
                      <label
                        key={label}
                        className="group flex items-center gap-3 cursor-pointer p-2 lg:p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                      >
                        <input
                          value={label}
                          onChange={togleSubCategory}
                          type="checkbox"
                          className="w-4 h-4 lg:w-5 lg:h-5 rounded border-2 border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:border-gray-900 transition-all"
                        />
                        <span className="text-sm lg:text-base text-gray-600 group-hover:text-gray-900 transition-colors font-medium">
                          {label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Product Area */}
          <main className="flex-1 min-w-0">
            {/* Title + Sort Dropdown */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 lg:gap-6 mb-8 lg:mb-10">
              <div className="flex-1">
                <Title title1="ALL" title2="COLLECTIONS" />
              </div>

              <div className="relative w-full sm:w-auto">
                <select
                  onChange={(e) => setsortType(e.target.value)}
                  className="w-full sm:w-auto appearance-none bg-white border border-gray-300 text-sm px-4 lg:px-6 py-2.5 lg:py-3 pr-10 lg:pr-12 rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-all duration-200 font-medium text-gray-700 cursor-pointer"
                >
                  <option value="relavent">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Price Low to High</option>
                  <option value="high-low">Sort by: Price High to Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 lg:pr-4 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {FilterProducts.map((product, index) => (
                <ProductItem
                  key={index}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Collection;
