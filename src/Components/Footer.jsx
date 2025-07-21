import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <>
      <div className="w-full  py-10 px-6 sm:px-[8vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-gray-700">
          {/* Logo and Description */}
          <div className="">
            <img src={assets.logo} alt="Logo" className="w-32 mb-4" />
            <p className="text-sm leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              since the 1500s.
            </p>
          </div>

          {/* Company Links */}
          <div className=" flex flex-col sm:items-baseline-last">
            <h2 className="text-lg font-semibold mb-4">Company</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:items-baseline-last">
            <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
            <p className="text-sm mb-2">📞 +1-000-000-0000</p>
            <p className="text-sm mb-2">📧 greatstackdev@gmail.com</p>
            <p className="text-sm">📸 Instagram</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
