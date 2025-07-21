import React from "react";
import { assets } from "../assets/assets";

const HomeFooter = () => {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row gap-10 py-5 justify-between items-center sm:px-32 mt-10 ">
        <div className="flex flex-col items-center justify-center">
          <img src={assets.exchange_icon} className="w-12 mb-3" alt="" />
          <p className="text-[15px] sm:text-[20px] text-gray-800 font-medium">
            Easy Exchange Policy
          </p>
          <p className="text-gray-400 font-medium text-[10px] sm:text-[15px] ">
            We offer hassle free exchange policy
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={assets.quality_icon} className="w-12 mb-3" alt="" />
          <p className="text-[15px] sm:text-[20px] text-gray-800 font-medium">
            7 Days Return Policy
          </p>
          <p className="text-gray-400 font-medium text-[10px] sm:text-[15px] ">
            We provide 7 days free return policy
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={assets.support_img} className="w-12 mb-3" alt="" />
          <p className="text-[15px] sm:text-[20px] text-gray-800 font-medium">
            Best customer support
          </p>
          <p className="text-gray-400 font-medium text-[10px] sm:text-[15px] ">
            we provide 24/7 customer support
          </p>
        </div>
      </div>
      <div className="w-full py-10 flex flex-col items-center">
        <h1 className="text-center font-medium text-3xl mb-5">
          Subscribe now & get 20% off
        </h1>
        <p className="text-center text-gray-400">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>

        <div className="w-full py-12 flex justify-center items-center  px-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl">
            <div className="flex-1 w-full">
              <input
                type="email"
                placeholder="Enter your email here"
                className="w-full border border-gray-300 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-black transition"
              />
            </div>
            <input
              type="submit"
              value={"Subscribe"}
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeFooter;
