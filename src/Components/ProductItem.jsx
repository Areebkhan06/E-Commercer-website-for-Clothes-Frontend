import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, name, image, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-gray-800 cursor-pointer mt-5">
      <div className="overflow-hidden group">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-2">
          <p className="text-sm font-medium truncate">{name}</p>
          <p className="text-sm font-semibold">{currency}{price}</p>
        </div>
    </Link>
  );
};

export default ProductItem;
