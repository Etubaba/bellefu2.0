import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { productImageUrl } from "../../../constant";

const Expired = ({ product }) => {
  const [open, setOpen] = useState(false);

  const details = useSelector((state) => state.bellefu?.indexData);
  return (
    <div className="w-full">
      <div className="bg-bellefuWhite p-3 rounded-md border border-[#dfdfdf]">
        <img
          src={`${productImageUrl}${product.images[0]}`}
          className="rounded-md w-full h-44 object-cover"
        />
        <p className="capitalize text-medium">{product.title}</p>
        <div className="flex items-center space-x-2">
          <MdLocationOn className="w-4 h-4 text-bellefuBlack1" />
          <div className="flex items-center space-x-1">
            {/* <p className="text-bellefuBlack1 text-sm capitalize">
                            {product.state},
                        </p> */}
            <p className="text-bellefuBlack1 text-sm capitalize">
              {product.country}
            </p>
          </div>
        </div>
        <div className="flex items justify-between">
          <p className="text-bellefuGreen flex font-poppins font-semibold">
            <p
              className="mr-1"
              dangerouslySetInnerHTML={{ __html: details?.defaultCurrency }}
            />
            {product.price}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[#767873]  capitalize italic text-xs font-medium">
            Active
          </p>
          <div
            onClick={() => setOpen(!open)}
            className="relative focus:bg-black/30 focus:rounded-full focus:p-2"
          >
            <BiDotsHorizontalRounded className="text-bellefuOrange" />
          </div>
        </div>
      </div>

      {/* drop down beginning */}
      {/* {open ? (
        <div className="w-full mt-1 bg-bellefuWhite rounded border transition duration-300 ease-in z-40 shadow-lg">
          <ul className="rounded px-2 py-3 space-y-2">
            <div className="flex items-center space-x-4 mb-2 bg-bellefuBackground px-2 rounded-md py-1">
              <BsFillEyeFill className="w-4 h-4 text-bellefuOrange" />
              <p className="text-xs text-bellefuBlack1 font-normal whitespace-nowrap">
                View Products
              </p>
            </div>
            <li className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
              <GrEdit className="w-3 h-3 text-[#767873]" />
              <span className="text-xs text-bellefuBlack1">Acending</span>
            </li>
            <li className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
              <RiDeleteBin6Line className="w-3 h-3 text-[#767873]" />
              <span className="text-xs text-bellefuBlack1">
                Put out of stock
              </span>
            </li>
          </ul>
        </div>
      ) : null} */}
      {/* dropdown end */}
    </div>
  );
};

export default Expired;
