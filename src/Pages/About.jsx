import React from 'react';
import Title from '../Components/Title';
import { assets } from '../assets/assets';
import {
  FaCheckCircle,
  FaHeadset,
  FaShippingFast,
  FaThumbsUp,
} from 'react-icons/fa';

const About = () => {
  return (
    <div className="px-4 sm:px-10 md:px-20 py-12 bg-gray-50">
      {/* About Us Title */}
      <Title title1="ABOUT" title2="US" />

      {/* Image & Text Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 mt-10">
        {/* Left: Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.about_img}
            alt="About"
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        {/* Right: Text Content */}
        <div className="w-full md:w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Welcome to Our Store
          </h2>
          <p className="text-gray-600 text-sm">
            We are committed to delivering the best quality products and
            services to our customers. With a focus on innovation, satisfaction,
            and trust, we’ve built a brand people love.
          </p>
          <p className="text-gray-600 text-sm">
            Whether it’s customer support, fast delivery, or product selection,
            we go the extra mile to make sure your experience is exceptional.
          </p>
        </div>
      </div>

      {/* Why Choose Us Title */}
      <div className="mt-20">
        <Title title1="WHY" title2="CHOOSE US" />
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center">
          <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-4" />
          <h3 className="font-semibold text-gray-800 text-lg mb-2">Trusted Quality</h3>
          <p className="text-gray-600 text-sm">
            We ensure top quality products that meet your expectations every time.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center">
          <FaShippingFast className="text-blue-500 text-3xl mx-auto mb-4" />
          <h3 className="font-semibold text-gray-800 text-lg mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Get your orders quickly with our efficient and reliable delivery service.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center">
          <FaHeadset className="text-purple-500 text-3xl mx-auto mb-4" />
          <h3 className="font-semibold text-gray-800 text-lg mb-2">24/7 Support</h3>
          <p className="text-gray-600 text-sm">
            Our support team is always ready to help you with your queries and issues.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center">
          <FaThumbsUp className="text-pink-500 text-3xl mx-auto mb-4" />
          <h3 className="font-semibold text-gray-800 text-lg mb-2">Customer Satisfaction</h3>
          <p className="text-gray-600 text-sm">
            Our goal is to make every customer happy and build long-term trust.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
