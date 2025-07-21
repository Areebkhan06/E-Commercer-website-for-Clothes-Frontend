import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = ({ token }) => {
  const navigate = useNavigate();
  const { showSearch, setshowSearch, getCartCount, settoken } =
    useContext(ShopContext);

  const location = useLocation();

  const [showDropMenu, setshowDropMenu] = useState(false);
  const [showMenu, setshowMenu] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
    navigate("/login");
  };

  return (
    <div className="w-full h-[10vh] bg-white">
      <div className="w-full h-full flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <img src={assets.logo} className="w-32" alt="Logo" />
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-8 text-sm font-semibold uppercase text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`relative hidden sm:block pb-1 transition-all duration-300 ease-in-out 
        ${
          location.pathname === link.path
            ? "text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
            : "hover:text-black hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-black hover:after:transition-all hover:after:duration-300 hover:after:ease-in-out after:w-0"
        }`}
            >
              {link.name}
            </Link>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <img
            onClick={() => setshowSearch(!showSearch)}
            src={assets.search_icon}
            alt="Search"
            className="w-5 cursor-pointer hover:opacity-75 transition"
          />
          <div className="relative">
            {/* Profile Icon */}
            <img
              onClick={() => setshowDropMenu(!showDropMenu)}
              src={assets.profile_icon}
              alt="Profile"
              className="w-5 cursor-pointer hover:opacity-75 transition"
            />

            {/* Dropdown */}
            <div
              onMouseLeave={() => setshowDropMenu(false)}
              className={`absolute ${showDropMenu ? "" : "hidden"} right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50 transition-all`}
            >
              <ul className="text-sm text-gray-800 font-medium">
                {token ? (
                  <>
                    <li className="px-5 py-3 hover:bg-gray-100 rounded-t-xl cursor-pointer transition-all duration-150">
                      Account
                    </li>
                    <li onClick={()=>navigate("/orders")} className="px-5 py-3 hover:bg-gray-100 cursor-pointer transition-all duration-150">
                      Orders
                    </li>
                    <li
                      onClick={logout}
                      className="px-5 py-3 bg-red-100 hover:bg-red-500 hover:text-white text-red-600 rounded-b-xl cursor-pointer transition-all duration-150"
                    >
                      Log Out
                    </li>
                  </>
                ) : (
                  <li
                    onClick={() => navigate("/login")}
                    className="px-5 py-3 bg-blue-100 hover:bg-blue-500 hover:text-white text-blue-600 rounded-xl cursor-pointer transition-all duration-150"
                  >
                    Log In
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="relative cursor-pointer">
            <Link to={"/cart"}>
              <img src={assets.cart_icon} alt="Cart" className="w-5" />
              <p className="absolute -top-2 -right-2 text-[10px] bg-red-500 text-white w-4 h-4 flex items-center justify-center rounded-full">
                {getCartCount()}
              </p>
            </Link>
          </div>
          <div>
            <img
              onClick={() => setshowMenu(true)}
              src={assets.menu_icon}
              className="w-5 sm:hidden"
              alt=""
            />
          </div>
        </div>
        <div
          className={`fixed inset-0 ${
            showMenu ? "opacity-100 visible" : "opacity-0 invisible"
          } bg-[#84838383] backdrop-blur-lg z-50 transition-all duration-500 ease-out`}
        >
          <div className="flex flex-col items-start justify-center text-center gap-10 px-8 h-full max-w-md mx-auto">
            <img
              src={assets.cross_icon}
              onClick={() => setshowMenu(false)}
              className="w-10 absolute right-5 top-5"
              alt=""
            />
            {navLinks.map((item, index) => (
              <Link
                onClick={() => setshowMenu(false)}
                to={item.path}
                key={index}
                className={`relative w-full py-6 text-white text-2xl font-light uppercase tracking-wider transition-all duration-300 hover:text-gray-300 hover:translate-x-2 before:content-[''] before:absolute before:left-0 before:bottom-2 before:w-0 before:h-px before:bg-gradient-to-r before:from-white before:to-transparent hover:before:w-full before:transition-all before:duration-500 ${
                  showMenu
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{
                  transitionDelay: showMenu ? `${index * 100}ms` : "0ms",
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
