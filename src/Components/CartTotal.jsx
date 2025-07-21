import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { getCartTotal, delivery_fee,navigate } = useContext(ShopContext);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const fetchSubtotal = async () => {
      const total = await getCartTotal();
      setSubtotal(Number(total) || 0);
    };
    fetchSubtotal();
  }, [getCartTotal]);

  const total = subtotal + delivery_fee;

  return (
    <div className="w-full lg:w-[340px] bg-white border border-gray-200 rounded-2xl shadow-lg p-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 border-b pb-3">Cart Summary</h2>

      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span className="font-medium">₹{delivery_fee.toFixed(2)}</span>
        </div>
      </div>

      <hr className="my-4" />

      <div className="flex justify-between items-center text-lg font-bold text-gray-900 mb-6">
        <span>Total</span>
        <span className="text-green-600">₹{total.toFixed(2)}</span>
      </div>

      <button onClick={()=>navigate("/place-order")} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-base font-semibold transition duration-200">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotal;
