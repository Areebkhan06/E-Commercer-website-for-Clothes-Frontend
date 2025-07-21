import React, { useContext, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import Footer from "./Components/Footer";

import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import ProductInfo from "./Pages/ProductInfo";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Verify from "./Pages/Verify";

import { ShopContext } from "./context/ShopContext";

const App = () => {
  const { token, navigate } = useContext(ShopContext);
  const location = useLocation();
  const hideLayoutPaths = ["/login", "/signup"];

  const isLayoutHidden = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />

      {!isLayoutHidden && <Navbar token={token} />}
      {!isLayoutHidden && <SearchBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>

      {!isLayoutHidden && <Footer />}
    </div>
  );
};

export default App;
