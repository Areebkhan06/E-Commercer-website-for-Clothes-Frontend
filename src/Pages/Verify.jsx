import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, setcartItem, token } = useContext(ShopContext);
  const [searchParam, setsearchParam] = useSearchParams();

  const success = searchParam.get("success");
  const orderId = searchParam.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(
        "https://e-commercer-website-for-clothes-backend.onrender.com/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );
      if (response.data.success) {
        setcartItem({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);
  return <div>verify</div>;
};

export default Verify;
