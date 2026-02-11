import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitems from "./Productitems";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const bestseller = useMemo(() => {
    if (!products || products.length === 0) return [];

    return products
      .filter((item) => item.bestseller === true)
      .slice(0, 5);
  }, [products]);
  
  

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLER"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our best-selling products, loved by customers for their quality and style.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((item) => (
          <Productitems
            key={item._id}
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

export default BestSeller;
