import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const {
    getCartTotal,
    delivery_fee,
    navigate,
    token,
    cartItem,
    setcartItem,
    getCartCount,
    products,
  } = useContext(ShopContext);

  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setpaymentMethod] = useState("cod");

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    street: "",
    state: "",
    zipcode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormEmpty = () => {
    return Object.values(formData).some((value) => value.trim() === "");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (isFormEmpty()) {
      toast.error("Please fill the form");
      return;
    }

    try {
      let orderItems = [];

      for (const [productId, sizes] of Object.entries(cartItem)) {
        for (const [size, quantity] of Object.entries(sizes)) {
          if (quantity > 0) {
            const product = products.find((p) => p._id === productId);
            if (product) {
              const itemInfo = structuredClone(product);
              itemInfo.size = size;
              itemInfo.quantity = quantity;
              orderItems.push(itemInfo);
            }
          }
        }
      }

      console.log("Final Order Items:", orderItems);

      if (orderItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }
      const subtotal = await getCartTotal();
      let orderData = {
        address: formData,
        items:orderItems,
        amount:subtotal + delivery_fee
      }

      switch(paymentMethod){
        case "cod":
          const response = await axios.post("http://localhost:3089/api/order/place",orderData,{headers:{token}});
          if(response.data.success){
            setcartItem({})
            navigate("/orders");
          }else{
            toast.error(response.data.message)
          }
        break;  
        
        case "stripe":
          const responseStripe = await axios.post("http://localhost:3089/api/order/stripe",orderData,{headers:{token}});
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data;
            window.location.replace(session_url);
          }else{
            toast.error(responseStripe.data.message)
          }
          break;
      }
      toast.success("Order placed!");
      console.log(orderItems);
      

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  useEffect(() => {
    const fetchSubtotal = async () => {
      try {
        const total = await getCartTotal();
        setSubtotal(total);
      } catch (error) {
        console.error("Failed to fetch cart total:", error);
      }
    };
    fetchSubtotal();
  }, [getCartTotal]);

  const total = subtotal + delivery_fee;

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-10 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-8">
        {/* Left Side: Delivery Info */}
        <div className="flex-1 bg-white rounded-2xl shadow p-6">
          <div className="mb-6">
            <Title title1="DELIVERY" title2="INFORMATION" />
          </div>

          <form
            onSubmit={onSubmitHandler}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleInputChange} className="border rounded-lg px-4 py-2" />
            <input name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleInputChange} className="border rounded-lg px-4 py-2" />
            <input name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} className="col-span-2 border rounded-lg px-4 py-2" />
            <input name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleInputChange} className="col-span-2 border rounded-lg px-4 py-2" />
            <input name="street" placeholder="Street Address" required value={formData.street} onChange={handleInputChange} className="col-span-2 border rounded-lg px-4 py-2" />
            <input name="city" placeholder="City" required value={formData.city} onChange={handleInputChange} className="border rounded-lg px-4 py-2" />
            <input name="state" placeholder="State" required value={formData.state} onChange={handleInputChange} className="border rounded-lg px-4 py-2" />
            <input name="zipcode" placeholder="Zip Code" required value={formData.zipcode} onChange={handleInputChange} className="border rounded-lg px-4 py-2" />
            <input name="country" placeholder="Country" required value={formData.country} onChange={handleInputChange} className="border rounded-lg px-4 py-2" />

            <button
              type="submit"
              className="col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-full sm:max-w-sm bg-white rounded-2xl shadow-md p-6 space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700">
              <span>Delivery Fee</span>
              <span>₹{delivery_fee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="text-sm text-gray-700 font-semibold mb-3">Select Payment Method</p>
            <div className="flex flex-col gap-4">
              {[
                { id: "stripe", label: "Stripe", logo: assets.stripe_logo },
                { id: "cod", label: "Cash on Delivery", logo: null },
              ].map(({ id, label, logo }) => (
                <label
                  key={id}
                  onClick={() => setpaymentMethod(id)}
                  className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer hover:shadow transition ${
                    paymentMethod === id ? "border-blue-500 ring-1 ring-blue-300" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === id} readOnly />
                    {logo ? <img src={logo} alt={label} className="h-6 object-contain" /> : null}
                    <span className="text-sm font-medium text-gray-700">{label}</span>
                  </div>
                  <span className="text-sm text-gray-600">{id === "cod" ? "Pay at Door" : label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
