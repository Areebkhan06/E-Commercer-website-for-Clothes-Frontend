import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const {
    products,
    currency,
    cartItem,
    UpdateCartQuantity,
    UpdateProductQuantity,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItem) {
      for (const size in cartItem[productId]) {
        if (cartItem[productId][size] > 0) {
          tempData.push({
            _id: productId,
            size: size,
            quantity: cartItem[productId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItem,products]);

  return (
    <div className="pt-14 px-4 sm:px-[5vw] md:px-[8vw] lg:px-[10vw] bg-gray-50 min-h-screen">
      <div className="mb-10">
        <Title title1="Your" title2="Cart" />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center text-gray-500 text-xl mt-20">
          Your cart is empty.
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Section - Product List */}
          <div className="flex-1 space-y-6">
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row gap-6 items-center justify-between bg-white p-6 rounded-xl shadow hover:shadow-md transition"
                >
                  {/* Product Info */}
                  <div className="flex gap-5 items-center w-full sm:w-1/2">
                    <img
                      src={productData.image[0]}
                      alt={productData.name}
                      className="w-24 h-24 object-cover rounded-xl border"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {productData.name}
                      </h3>
                      <p className="text-sm bg-gray-700 py-2 px-5 rounded-3xl w-fit text-white mt-1 capitalize">
                        Size: {item.size}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex flex-col items-center text-sm text-gray-700">
                    <label className="mb-1">Qty</label>
                    <input
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(e) =>
                        UpdateProductQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                      }
                      className="w-16 border border-gray-300 rounded-md text-center py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>

                  {/* Price */}
                  <div className="text-right font-medium text-gray-800 text-lg sm:w-[100px]">
                    {currency}
                    {(productData.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => UpdateProductQuantity(item._id, item.size, 0)}
                    className="hover:scale-110 transition-transform"
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove"
                      className="w-6 h-6 opacity-70 hover:opacity-100"
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Section - Cart Summary */}
          <div className="lg:w-[30%] w-full sticky top-28 self-start">
            <CartTotal />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
