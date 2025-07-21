import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendURl = import.meta.env.VITE_BACKEND_URL;
  const [search, setsearch] = useState("");
  const [showSearch, setshowSearch] = useState(false);
  const [cartItem, setcartItem] = useState({});
  const [products, setproducts] = useState([]);
  const [token, settoken] = useState("");

  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setcartItem(cartData);

    if (token) {
      try {
        await axios.post(
          "http://localhost:3089/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    // Look at each product ID
    for (const productId in cartItem) {
      // Look at each size for that product
      for (const size in cartItem[productId]) {
        const quantity = cartItem[productId][size];
        if (quantity > 0) {
          totalCount += quantity;
        }
      }
    }

    return totalCount;
  };

  const UpdateCartQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);

    cartData[itemId][size] = quantity;

    setcartItem(cartData);
  };

  const UpdateProductQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItem);

    cartData[itemId][size] = quantity;

    setcartItem(cartData);

    if (token) {
      try {
        await axios.post(
          "http://localhost:3089/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartTotal = async () => {
    let totalAmount = 0;
    for (const productId in cartItem) {
      const itemInfo = products.find((product) => product._id === productId);
      for (const size in cartItem[productId]) {
        try {
          if (cartItem[productId][size] > 0) {
            totalAmount += itemInfo.price * cartItem[productId][size];
          }
        } catch (error) {
          console.log("error in cart total");
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3089/api/product/list"
      );
      if (response.data.success) {
        setproducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:3089/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setcartItem(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);
  useEffect(() => {
    console.log(cartItem);
  }, [cartItem]);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setsearch,
    showSearch,
    setshowSearch,
    addToCart,
    cartItem,
    setcartItem,
    getCartCount,
    UpdateCartQuantity,
    UpdateProductQuantity,
    getCartTotal,
    navigate,
    backendURl,
    token,
    settoken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;

//9:25
