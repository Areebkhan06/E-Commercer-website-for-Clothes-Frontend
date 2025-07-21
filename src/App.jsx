import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import ProductInfo from "./pages/ProductInfo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { useState } from "react";
import { ShopContext } from "./context/ShopContext";
import Verify from "./Pages/Verify";

const App = () => {
  const {token, navigate} = useContext(ShopContext);
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
