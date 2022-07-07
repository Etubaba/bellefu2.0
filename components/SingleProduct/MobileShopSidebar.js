import React, { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import { RiMessage2Fill, RiCloseFill } from "react-icons/ri";
import { IoIosCall } from "react-icons/io";
import { GrStar } from "react-icons/gr";
import { RiMessageFill } from "react-icons/ri";
import moment from "moment";
import { Rating } from "@mui/material";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import { apiData } from "../../constant";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { login } from "../../features/bellefuSlice";
import axios from "axios";

const PRODUCT_IMAGE_URL = "https://bellefu.inmotionhub.xyz/get/store/image/";

const MobileShopSideBar = ({ userDetails }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [message, setMessage] = useState("");
  const [reportmsg, setReportmsg] = useState("");
  const [reviewmsg, setReviewmsg] = useState("");
  const [review, setReview] = useState(false);
  const [rating, setRating] = useState(0);

  const senderId = useSelector((state) => state.bellefu?.profileDetails?.id);

  const isLoggedIn = useSelector(login);

  const openReport = () => {
    if (isLoggedIn) {
      setOpen1(!open1);
    } else {
      toast.error("Please login to submit report");
    }
  };

  const handleReport = () => {
    if (reportmsg === "") {
      toast.error("Please all fields are required", { position: "top-right" });
    } else {
      axios
        .post(`${apiData}create/report`, {
          productId: userDetails?.productId,
          userId: senderId,
          message: reportmsg,
          title: "Report Product",
        })
        .then((res) => {
          if (res.data.status) {
            toast.success("Your report is under review. Thank you", {
              position: "top-right",
            });
            setReportmsg("");
          }
        });
    }
  };

  const handleReview = (e) => {
    e.preventDefault();
    if (rating === 0 || reviewmsg === "") {
      toast.error("Please all fields are required", { position: "top-right" });
    } else {
      axios
        .post(`${apiData}create/review`, {
          productId: userDetails?.productId,
          userId: senderId,
          rating: rating,
          message: reviewmsg,
        })
        .then((res) => {
          if (res.data.status) {
            toast.success("Your review has been sent. ", {
              position: "top-right",
            });
            setRating(0);
            setReviewmsg("");
            setReview(false);
          }
        });
    }
  };

  return (
    <div className="bg-bellefuWhite rounded-md flex flex-col pb-5 w-full lg:hidden mt-4">
      {/* user brief info */}
      <div className="mt-5 flex flex-col items-center justify-center">
        <img
          src={`${PRODUCT_IMAGE_URL}${userDetails?.logo}`}
          // width={150}
          // height={150}
          alt=""
          className="rounded-full w-20 h-20 object-cover"
        />
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-bellefuTitleBlack font-semibold">
            {userDetails?.shopName}
          </p>
          <GoVerified className="w-3 h-3 text-bellefuGreen" />
        </div>
        <div className="flex items-center mt-2 space-x-2">
          <p className="text-sm text-gray-400 font-medium">Registered :</p>
          <p className="text-xs text-bellefuBlack1 font-medium tracking-wider">
            {" "}
            {moment(userDetails?.joined).format("MMM Do YYYY")}
          </p>
        </div>
      </div>

      {/* border line */}
      <div className="border-b mt-5" />

      {/* view Reviews */}
      <div className="px-5">
        <div
          onClick={() => setReview(true)}
          className="flex items-center mt-5 border w-full py-2 space-x-3 rounded-md bg-bellefuWhite justify-center"
        >
          {" "}
          <BsFillPersonFill className="w-5 h-5 text-bellefuOrange" />
          <p className="text-gray-400 font-normal text-xs">Give Reviews</p>
        </div>
        {review && (
          <div className="border mt-2 bg-bellefuBackground divide-y w-full border-orange-200 rounded-md">
            <div className="flex items-center py-1">
              <div className="flex items-center w-full space-x-3 rounded-md justify-end">
                <GrStar className="w-4 h-4 text-yellow-300 text-4xl" />{" "}
                <p className="text-gray-400 font-normal text-sm">Review</p>
              </div>
              <div onClick={() => setReview(false)}>
                <RiCloseFill className="ml-12 w-7 h-7 text-red-500 pr-1 cursor-pointer" />
              </div>
            </div>

            <textarea
              value={reviewmsg}
              onChange={(e) => setReviewmsg(e.target.value)}
              rows="5"
              className="w-full bg-transparent px-3 outline-none text-xs"
            ></textarea>

            <div className=" flex justify-center items-center py-2">
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>

            <div className="flex items-center justify-center py-2">
              <button
                onClick={handleReview}
                className="text-white bg-bellefuOrange/60 hover:bg-bellefuOrange duration-200 transition ease-in px-4 rounded-md capitalize"
              >
                send
              </button>
            </div>
          </div>
        )}
      </div>

      {/* report seller */}
      <div className="px-5 mt-5">
        <div className="border rounded-md px-3 flex flex-col items-center justify-center py-7 bg-bellefuBackground ">
          <p className="text-sm text-center text-bellefuBlack1">
            Did you noticed any illegal activities from this seller
          </p>
          <div
            className="flex items-center mt-5 border w-full py-2 space-x-3 rounded-md bg-bellefuWhite justify-center"
            onClick={openReport}
          >
            {" "}
            <RiMessageFill className="w-5 h-5 text-red-500" />
            <p className="text-gray-400 font-normal text-xs cursor-pointer">
              Report Seller
            </p>
          </div>
          {/* report box */}
          {open1 && (
            <div className="border -mt-10 bg-bellefuBackground divide-y w-full border-orange-200 rounded-md">
              <div className="flex items-center py-1">
                <div className="flex items-center w-full space-x-3 rounded-md justify-end">
                  <RiMessageFill className="w-4 h-4 text-red-500" />{" "}
                  <p className="text-gray-400 font-normal text-sm">Report</p>
                </div>
                <RiCloseFill
                  className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                  onClick={() => setOpen1(false)}
                />
              </div>

              <textarea
                rows="5"
                value={reportmsg}
                onChange={(event) => setReportmsg(event.target.value)}
                className="w-full bg-transparent px-3 outline-none text-xs"
              ></textarea>
              <div className="flex items-center justify-center py-2">
                <button
                  onClick={handleReport}
                  className="text-white bg-bellefuOrange/60 hover:bg-bellefuOrange duration-200 transition ease-in px-4 rounded-md capitalize"
                >
                  send
                </button>
              </div>
            </div>
          )}

          {/* end of report box */}
        </div>
      </div>
    </div>
  );
};

export default MobileShopSideBar;
