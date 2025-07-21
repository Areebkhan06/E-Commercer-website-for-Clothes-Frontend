import React from 'react';
import { assets } from '../assets/assets';
import Title from '../Components/Title';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="px-4 sm:px-10 md:px-32 py-12 bg-white">
      {/* Title */}
      <Title title1="CONTACT" title2="US" />

      {/* Image Section */}
      <div className="my-10">
        <img
          src={assets.contact_img}
          alt="Contact Illustration"
          className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow"
        />
      </div>

      {/* Contact Info Cards */}
      <div className="grid md:grid-cols-3 gap-8 text-center">
        {/* Address */}
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex flex-col items-center gap-3">
            <FaMapMarkerAlt className="text-blue-600 text-2xl" />
            <h3 className="text-lg font-semibold text-gray-700">Address</h3>
            <p className="text-gray-600 text-sm">
              123 Street Name, City, State, 123456
            </p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex flex-col items-center gap-3">
            <FaEnvelope className="text-blue-600 text-2xl" />
            <h3 className="text-lg font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600 text-sm">contact@example.com</p>
          </div>
        </div>

        {/* Phone */}
        <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex flex-col items-center gap-3">
            <FaPhoneAlt className="text-blue-600 text-2xl" />
            <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-600 text-sm">+91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Follow Us</h3>
        <div className="flex justify-center gap-6">
          <a
            href="#"
            className="border border-gray-300 p-3 rounded-full text-blue-600 hover:bg-blue-600 hover:text-white transition"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="border border-gray-300 p-3 rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="border border-gray-300 p-3 rounded-full text-sky-500 hover:bg-sky-500 hover:text-white transition"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
