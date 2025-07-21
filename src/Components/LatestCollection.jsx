import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { ShopContext } from "../context/ShopContext";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [LatestCollection, setLatestCollection] = useState([]);

  

  useEffect(() => {
    setLatestCollection(products.slice(0, 10));
  }, [products]);

  return (
    <div className="w-full py-5">
      <Title title1={"LATEST"} title2={"COLLECTIONS"} />
      <p className="text-center">
        Step into the season with style — discover our latest collection made
        for bold, modern living.
      </p>
      {/* rendering products  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-3">
        {LatestCollection.map((item, index) => (
          <ProductItem
          key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
