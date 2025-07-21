import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const SearchBar = () => {
  const { products, search, setsearch, showSearch, setshowSearch } =
    useContext(ShopContext);
  const location = useLocation();

  const [Visible, setVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.includes("/collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return ( Visible && showSearch ?(
      <div
      className={`border-t border-b text-center bg-gray-50 ${Visible ? "" : "hidden"}`}
    >
      <div className="inline-flex items-center justify-center border border-gray-400 py-2 my-5 mx-3 rounded-full w-3-4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setsearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm px-3"
          type="text"
          placeholder="Search"
        />
        <img src={assets.search_icon} className="w-4 mx-3" alt="" />
      </div>
      <img
        onClick={() => setshowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
      />
    </div>
  ): null
  
  );
};

export default SearchBar;
