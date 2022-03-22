import React from "react";
import ProductList from "./ProductList";
import { productData } from "../productData";
import Slider from "./slider/Slider";

const Body = () => {
  return (
    <div className=" overflow-y-scroll">
      <div className="mb-2">
        <Slider />
      </div>
      {/* product title header section */}
      <div></div>
      {/* product list */}
      <div className="bg-bellefuBackground mt-3 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 ">
        {productData.map((product) => (
          <ProductList key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Body;
