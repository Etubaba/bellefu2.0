import React, { useState } from "react";
import { MdLocationOn, MdOutlineWarningAmber } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { apiData, productImageUrl } from "../../../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { favUpdated } from "../../../features/bellefuSlice";
import { Box } from "@mui/system";
import { Button, Modal } from "@mui/material";

const MyAd = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const details = useSelector((state) => state.bellefu?.indexData);
  const dispatch = useDispatch();
  const deleteProduct = () => {
    axios
      .post(`${apiData}user/delete/product`, { productId: product.productId })
      .then((res) => {
        if (res.data.status) {
          toast.success("Product deleted successfully", {
            position: "bottom-left",
          });
          dispatch(favUpdated());
          setDeleteOpen(!deleteOpen);
        }
      });
  };

  const edit = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 350,
    height: 200,
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: 3,
    paddingTop: 2,
    margin: "0 auto",
  };
  return (
    <div className="">
      <div className="bg-bellefuWhite p-3 rounded-md border border-[#dfdfdf]">
        <img
          src={`${productImageUrl}${product?.images[0]}`}
          className="rounded-md w-full h-44 object-cover"
        />
        <p className="capitalize text-medium">{product.title}</p>
        <div className="flex items-center space-x-2">
          <MdLocationOn className="w-4 h-4 text-bellefuBlack1" />
          <div className="flex items-center space-x-1">
            <p className="text-bellefuBlack1 text-sm capitalize">
              {product?.stateName},
            </p>
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
            {/* ₦ */}
            {product.price}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-[#767873] capitalize italic text-xs font-medium">
            pending
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
            {/* <div className="flex items-center space-x-4 mb-2 bg-bellefuBackground px-2 rounded-md py-1">
              <BsFillEyeFill className="w-4 h-4 text-bellefuOrange" />
              <p className="text-xs text-bellefuBlack1 font-normal whitespace-nowrap">
                Popular Products
              </p>
            </div> */}
            <li className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
              <GrEdit className="w-3 h-3 text-[#767873]" />
              <span className="text-xs text-bellefuBlack1">Edit</span>
            </li>
            <li
              onClick={() => setDeleteOpen(!deleteOpen)}
              className="px-2 py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded"
            >
              <RiDeleteBin6Line className="w-3 h-3 text-[#767873]" />
              <span className="text-xs text-bellefuBlack1">Delete</span>
            </li>
          </ul>
        </div>
      ) : null}
      {/* dropdown end */}

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        opacity={6}
        // sx={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box sx={edit}>
          <div className="flex justify-center items-center">
            {/* <WarningAmberIcon sx={{ fontSize: 50 }} /> */}
            <MdOutlineWarningAmber className="md:text-5xl text-5xl mb-1 md:mb-2" />
          </div>
          <hr className="mb-4 md:mb-3" />

          <p className="p-1 mx-3 mb-2 md:mb-2 ">
            {" "}
            Do you want to delete this Product ?{" "}
          </p>

          <hr className="mb-2 mt-2" />
          <div className="flex mt-3 space-x-20 justify-around">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md shadow  text-white "
              onClick={() => setDeleteOpen(false)}
            >
              <p className="text-xs md:text-[15px]">Cancel</p>
            </button>
            <button
              className="bg-red-600 px-4 py-2 rounded-md shadow  text-white"
              onClick={deleteProduct}
            >
              <p className="text-xs md:text-[15px]">Delete</p>
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MyAd;
