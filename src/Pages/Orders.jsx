import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { token, currency } = useContext(ShopContext);
  const [ordersData, setordersData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        "https://e-commercer-website-for-clothes-backend.onrender.com/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          console.log(order);
          
          order.items.forEach((item) => {
            item["paymentMethod"] = order.paymentMethod;
            item["status"] = order.status;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setordersData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h1>

        <div className="space-y-6">
          {ordersData.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-5 border-l-4 border-blue-500"
            >
              {/* Order Header */}
              <div className="flex justify-between flex-wrap gap-y-2 items-center text-sm text-gray-600 mb-3">
                <span>Order ID: ORD{1000 + index}</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  {product.status}
                </span>
              </div>

              {/* Product Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-t pt-4">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-md self-start sm:self-center"
                />

                <div className="flex-1">
                  <h2 className="text-gray-800 font-semibold text-sm mb-1">
                    {product.name}
                  </h2>
                  <div className="text-gray-500 text-xs space-y-1">
                    <p>Size: {product.size}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>
                      Date:{" "}
                      {new Date(product.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p>Payment: {product.paymentMethod}</p>
                  </div>
                </div>

                <div className="flex sm:flex-col justify-between sm:items-end sm:text-right text-sm text-gray-700 font-medium w-full sm:w-auto">
                  <div>
                    {currency} {product.price?.toFixed(2)} <br />
                    <span>Total payment: {currency}{product.quantity * product.price}</span>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="mt-2 sm:mt-3 text-blue-600 hover:underline text-xs"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            </div>
          ))}

          {ordersData.length === 0 && (
            <p className="text-sm text-gray-500 text-center mt-10">
              You have no orders yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
