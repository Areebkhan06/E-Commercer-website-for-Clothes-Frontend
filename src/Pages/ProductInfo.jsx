import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";

const ProductInfo = () => {
  const { products, currency, addToCart, cartItem } = useContext(ShopContext);
  const { id } = useParams();

  const [Product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [relatedProducts, setrelatedProducts] = useState([]);

  useEffect(() => {
    const found = products.find((item) => item._id === id);
    if (found) {
      setProduct(found);
      setImage(found.image[0]);
    }
  }, [id, products]);

  useEffect(() => {
    if (Product) {
      const related = products.filter(
        (item) =>
          item.category === Product.category &&
          item.subCategory === Product.subCategory
      );
      setrelatedProducts(related.slice(0, 5));
    }
  }, [Product]);

  return (
    <div className="w-full px-4 py-10 sm:px-8 md:px-12 lg:px-20 bg-white">
      {Product && (
        <>
          {/* Product Display Section */}
          <div className="flex flex-col lg:flex-row gap-10 bg-gray-50 p-6 rounded-lg shadow-md">
            {/* Thumbnail Images */}
            <div className="flex lg:flex-col gap-3 w-full lg:w-[15%] overflow-y-auto max-h-[70vh]">
              {Product.image.map((item, index) => (
                <img
                  key={index}
                  onClick={() => setImage(item)}
                  src={item}
                  alt={`product-thumbnail-${index}`}
                  className={`w-20 h-20 object-cover cursor-pointer border-2 rounded-md transition ${
                    image === item
                      ? "border-black  ring-black"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="flex justify-center items-center w-full lg:w-[50%]">
              <img
                src={image}
                alt="selected-product"
                className="w-full max-h-[70vh] object-contain rounded-md"
              />
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-[35%] flex flex-col gap-4">
              <h1 className="text-3xl font-semibold text-gray-900">
                {Product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <img
                    key={i}
                    src={assets.star_icon}
                    alt="star"
                    className="w-5"
                  />
                ))}
                <img src={assets.star_dull_icon} alt="star" className="w-5" />
                <p className="text-sm text-gray-500 ml-2">(122 reviews)</p>
              </div>

              {/* Price */}
              <h2 className="text-2xl font-bold text-black">
                {currency}
                {Product.price}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm">{Product.description}</p>

              {/* Size Options */}
              <div className="flex gap-2 mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-1 text-sm rounded-md transition ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "hover:bg-black hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              {/* Add to Cart Button */}
              <button
              onClick={()=>addToCart(Product._id,selectedSize)}
                disabled={!selectedSize}
                className={`mt-4 px-6 py-3 rounded-md transition font-medium ${
                  selectedSize
                    ? "bg-black text-white hover:opacity-90"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>

              <hr className="my-4" />

              {/* Purchase Info */}
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✅ 100% Original product.</li>
                <li>💵 Cash on delivery available.</li>
                <li>🔁 Easy return and exchange within 7 days.</li>
              </ul>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <Title title1="RELATED" title2="PRODUCTS" />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {relatedProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductInfo;
