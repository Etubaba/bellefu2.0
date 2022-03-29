import React from "react";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { BsHeart } from "react-icons/bs";
import { MdOutlineMessage, MdCall } from "react-icons/md";

const ProductList = ({ product }) => {
  return (
    <div className="bg-bellefuWhite p-3 rounded-b-md">
      <img src={product.Icon} className="rounded-md w-full h-44 object-cover" />
      <p className="capitalize text-medium">{product.title}</p>
      <div className="flex items-center space-x-2">
        <MdLocationOn className="w-4 h-4 text-bellefuBlack1" />
        <div className="flex items-center space-x-1">
          <p className="text-bellefuBlack1 text-sm capitalize">
            {product.state},
          </p>
          <p className="text-bellefuBlack1 text-sm capitalize">
            {product.country}
          </p>
        </div>
      </div>
      <div className="flex items justify-between">
        <p className="text-bellefuGreen font-poppins font-semibold">
          ₦ {product.price}
        </p>
        <BsHeart className="w-4 h-4 text-bellefuOrange" />
      </div>
      <div className="flex items-center mt-2 space-x-3">
        <button className="bg-bellefuOrange rounded-md w-full flex items-center justify-center py-4">
          <MdOutlineMessage className="!text-white" />
        </button>
        <button className="bg-bellefuGreen  rounded-md w-full flex items-center justify-center py-4">
          <MdCall className="text-white " />
        </button>
      </div>
    </div>
  );
};

export default ProductList;
