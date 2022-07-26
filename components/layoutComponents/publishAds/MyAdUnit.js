import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { FcApproval } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { apiData, productImageUrl } from "../../../constant";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { favUpdated } from "../../../features/bellefuSlice";

const MyAd = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [modalopen, setModalOpen] = useState(false);
  const [price, setPrice] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const details = useSelector((state) => state.bellefu?.indexData);

  const handleOut = () => {
    setOpen(!open);
    axios
      .post(`${apiData}change/stock`, {
        productId: product.id,
        stockStatus: 0,
      })
      .then((res) => {
        if (res.data.status) {
          toast.info(`${product.title} is out of stock`, {
            position: "top-right",
          });
          dispatch(favUpdated());
        }
      });
  };

  const handleIn = () => {
    setOpen(!open);
    axios
      .post(`${apiData}change/stock`, {
        productId: product.id,
        stockStatus: 1,
      })
      .then((res) => {
        if (res.data.status) {
          toast.success(` ${product.title} is now in stock`, {
            position: "top-right",
          });
          dispatch(favUpdated());
        }
      });
  };

  const updatePrice = () => {
    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("price", price);
    axios({
      url: `${apiData}change/product/price`,
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          toast.success(`${product.title} price updated`, {
            position: "top-right",
          });
          dispatch(favUpdated());
          setModalOpen(false);
        } else {
          toast.error(`something went wrong try again.`, {
            position: "top-right",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full">
      <div className="bg-bellefuWhite p-3 rounded-md border border-[#dfdfdf]">
        <img
          onClick={() => router.push(`/product/${product.id}`)}
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
            {product.inStock ? "In stock" : "Out of stock"}
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
      {open ? (
        <div className="w-full mt-1 bg-bellefuWhite rounded border transition duration-300 ease-in z-40 shadow-lg">
          <ul className="rounded px-2 py-3 space-y-2">
            <div
              onClick={() => {
                setOpen(!open);
                router.push(`/product/${product.id}`);
              }}
              className="flex items-center space-x-4 mb-2 hover:bg-bellefuBackground px-2 rounded-md py-1"
            >
              <BsFillEyeFill className="w-4 h-4 text-bellefuOrange" />
              <p className="text-xs text-bellefuBlack1 font-normal whitespace-nowrap">
                View Products
              </p>
            </div>
            <li
              onClick={() => {
                setOpen(!open);
                setModalOpen(true);
              }}
              className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
            >
              <GrEdit className="w-3 h-3 text-[#767873]" />
              <span className="text-xs text-bellefuBlack1">update price</span>
            </li>

            {product.inStock ? (
              <li
                onClick={handleOut}
                className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
              >
                <RiDeleteBin6Line className="w-3 h-3 text-[#767873]" />
                <span className="text-xs text-bellefuBlack1">
                  Put out of stock
                </span>
              </li>
            ) : (
              <li
                onClick={handleIn}
                className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
              >
                <FcApproval className="w-3 h-3 text-[#767873]" />
                <span className="text-xs text-bellefuBlack1">Put in stock</span>
              </li>
            )}
          </ul>
        </div>
      ) : null}
      {/* dropdown end */}
      {/* price modal  */}
      <Modal
        open={modalopen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          className="flex flex-col items-center justify-center mx-auto mt-52 pt-2  rounded-lg shadow-md   bg-bellefuWhite w-[80%] md:w-[60%] lg:w-[40%]"
          // sx={edit}
        >
          <div className="grid grid-cols-6 gap-3  my-5">
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>Product Name</p>
              </label>
              <input
                disabled={true}
                // onChange={(e) => setProductsName(e.target.value)}
                defaultValue={product.title}
                type="text"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 flex-row justify-between">
                <p>price</p>
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={product.price}
                type="number"
                className="  bg-gray-100 p-[7px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex my-4 md:w-[60%] lg:w-[60%] space-x-20 justify-between">
            <button
              className=" bg-gray-400 rounded-md py-2 px-5"
              onClick={() => setModalOpen(false)}
            >
              <p className="text-xs text-white md:text-[15px]">Cancel</p>
            </button>
            <button
              className="bg-bellefuOrange rounded-md py-2 px-5"
              onClick={updatePrice}
            >
              <p className="text-xs text-white md:text-[15px]">save </p>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyAd;
