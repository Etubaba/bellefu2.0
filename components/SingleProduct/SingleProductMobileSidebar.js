import React, { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import { BsFillPersonFill } from "react-icons/bs";
import {
  RiMessage2Fill,
  RiCloseFill,
  RiShoppingCart2Fill,
} from "react-icons/ri";

import { IoIosCall } from "react-icons/io";
import { RiMessageFill } from "react-icons/ri";
import moment from "moment";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { login } from "../../features/bellefuSlice";
import { toast } from "react-toastify";
import { Rating } from "@mui/material";
import axios from "axios";

import { apiData, UserAvataUrl } from "../../constant";

const SingleProductMobileSidebar = ({ mobileDetails,verified }) => {
  const isLoggedIn = useSelector(login);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [message, setMessage] = useState("");
  const [reviewmsg, setReviewmsg] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(false);
  const [reportmsg, setReportmsg] = useState("");

  const receiverId = mobileDetails[0]?.userId;
  const senderId = useSelector((state) => state.bellefu?.profileDetails?.id);

  const actionMessage = () => {
    axios
      .post(`${apiData}monitor/user/action`, {
        userId: senderId,
        action: "message",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleMessage = () => {
    if (isLoggedIn) {
      setOpen(!open);
    } else {
      setOpen2(true);
      toast.info("please login to send message", { position: "top-center" });
    }
  };

  const handleCall = () => {
    if (isLoggedIn) {
      window.open(`tel:${mobileDetails[0]?.advertiserNumber}`);
    } else {
      setOpen3(true);
      toast.info("please login to contact seller", { position: "top-center" });
    }
  };

  const reviewOpen = () => {
    if (isLoggedIn) {
      setReview(true);
    } else {
      setOpen4(true);
      toast.info("please login to send a review", { position: "top-center" });
    }
  };

  const reportOpen = () => {
    if (isLoggedIn) {
      setOpen1(!open1);
    } else {
      setOpen5(true);
      toast.info("please login to report seller", { position: "top-center" });
    }
  };

  const handleReview = () => {
    if (rating === 0 || reviewmsg === "") {
      toast.error("Please all fields are required", { position: "top-right" });
    } else {
      axios
        .post(`${apiData}create/review`, {
          productId: mobileDetails[0]?.productId,
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

  const sendMessage = () => {
    if (message === "") {
      toast.error("You can not send an empty field", { position: "top-right" });
    } else {
      const formData = new FormData();
      formData.append("messageTo", receiverId);
      formData.append("messageFrom", senderId);
      formData.append("image", "");
      formData.append("message", message);
      axios({
        method: "POST",
        url: `${apiData}send/messages`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        if (res.data.status) {
          toast.success("Your message has been sent successfully.", {
            position: "top-right",
          });
          actionMessage();
          setMessage("");
        }
      });
    }
  };

  const handleReport = () => {
    if (reportmsg === "") {
      toast.error("Please all fields are required", { position: "top-right" });
    } else {
      axios
        .post(`${apiData}create/report`, {
          productId: mobileDetails[0]?.productId,
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
            setOpen1(false);
          }
        });
    }
  };


  return (
    <div className="bg-bellefuWhite">
      <div className="flex flex-col space-y-3">
        {/* section 1 */}
        <div className="w-full">
          <div className=" bg-bellefuBackground flex flex-col items-center justify-center py-2">
            <p className="text-sm text-bellefuBlack1">Product Price</p>{" "}
            <p className="font-bold text-bellefuTitleBlack text-sm">
              <span
                dangerouslySetInnerHTML={{
                  __html: mobileDetails[0]?.currencySymbol,
                }}
              />

              {mobileDetails[0]?.price}
            </p>
          </div>
          {/* border line */}
          <div className="border-b" />
          {/* user brief info */}
          <div className="mt-2 flex flex-col items-center justify-center">
            <div className="">
              <Image
                src={`${UserAvataUrl}${mobileDetails[0]?.avatar}`}
                alt="UserImage"
                width={70}
                height={70}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <p className="text-bellefuTitleBlack font-semibold">
                {" "}
                {mobileDetails[0]?.username}
              </p>
              <GoVerified
                className={
                  verified?.phone && !verified?.id && !verified?.kyc
                    ? "text-black/70 w-3 h-3"
                    : !verified?.kyc && verified?.id && verified?.phone
                      ? "w-3 h-3 text-bellefuOrange"
                      : verified?.id && verified?.phone && verified?.kyc
                        ? "w-3 h-3 text-bellefuGreen"
                        : "w-3 h-3 text-[#A6A6A6]"
                }

              />
            </div>
            <div className="flex items-center mt-1 space-x-2">
              <p className="text-sm text-gray-400 font-medium">Registered :</p>
              <p className="text-xs text-bellefuBlack1 font-medium tracking-wider">
                {" "}
                {moment(mobileDetails[0]?.joined).format("MMM Do YYYY")}
              </p>
            </div>
          </div>

          {/* call and message */}
          <div className="flex flex-col">
            {/* message */}
            {senderId !== receiverId && (
              <div
                className="flex items-center mt-3 border w-full py-2 space-x-3 rounded-md bg-bellefuOrange justify-center cursor-pointer"
                onClick={handleMessage}
              >
                <RiMessage2Fill className="w-4 h-4 text-white" />{" "}
                <p className="text-white font-medium text-sm">Messages</p>
              </div>
            )}

            {/* message box */}
            {open === true && (
              <div className="border bg-bellefuBackground divide-y w-full border-orange-200 rounded-md">
                <div className="flex items-center py-1">
                  <div className="flex items-center w-full space-x-3 rounded-md justify-end">
                    <RiMessage2Fill className="w-4 h-4 text-gray-500" />{" "}
                    <p className="text-gray-400 font-normal text-sm">
                      Messages
                    </p>
                  </div>
                  <RiCloseFill
                    className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>

                <textarea
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent px-3 outline-none text-xs"
                />
                <div className="flex items-center justify-center py-2">
                  <button
                    onClick={sendMessage}
                    className="text-white bg-bellefuOrange/60 hover:bg-bellefuOrange duration-200 transition ease-in px-4 rounded-md capitalize"
                  >
                    send
                  </button>
                </div>
              </div>
            )}
            {/* end of message box */}
            {/* not logged in */}
            {open2 === true && (
              <div className="w-full flex items-center justify-between mt-1">
                <h1 className="text-bellefuGreen capitalize">
                  Please{" "}
                  <span
                    onClick={() => router.push("/login")}
                    className="text-bellefuOrange font-bold"
                  >
                    login
                  </span>{" "}
                  to send message
                </h1>
                <RiCloseFill
                  className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                  onClick={() => setOpen2(false)}
                />
              </div>
            )}

            {/* call */}
            {senderId !== receiverId && (
              <div
                onClick={handleCall}
                className="flex items-center mt-3 border w-full py-2 space-x-3 rounded-md bg-bellefuGreen justify-center"
              >
                <IoIosCall className="w-4 h-4 text-white" />
                <p className="text-white font-medium text-sm">Call</p>
              </div>
            )}
            {open3 === true && (
              <div className="w-full flex items-center justify-between mt-1">
                <h1 className="text-bellefuGreen capitalize">
                  Please{" "}
                  <span
                    onClick={() => router.push("/login")}
                    className="text-bellefuOrange font-bold"
                  >
                    login
                  </span>{" "}
                  to contact user
                </h1>
                <RiCloseFill
                  className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                  onClick={() => setOpen3(false)}
                />
              </div>
            )}
            {/* my shop */}
            <div
              onClick={() => router.push(`/shop/${mobileDetails[0]?.userId}`)}
              className="flex items-center mt-3 border w-full py-2 space-x-3 rounded-md bg-gradient-to-r from-bellefuGreen to-bellefuOrange justify-center cursor-pointer"
            >
              <RiShoppingCart2Fill className="w-4 h-4 text-white" />
              <p className="text-white font-medium text-sm">Shop</p>
            </div>
          </div>
        </div>

        {/* section 2 */}
        <div className="w-full ">
          <div className="space-y-3">
            {/* view profile */}
            <div className="flex items-center border w-full py-2 space-x-3 rounded-md bg-bellefuWhite justify-center">
              {" "}
              <BsFillPersonFill className="w-5 h-5 text-gray-500" />
              <p className="text-gray-400 font-medium">View Profile</p>
            </div>
            {/* view reviews */}
            <div
              onClick={reviewOpen}
              className="flex items-center border w-full py-2 space-x-3 rounded-md bg-bellefuWhite justify-center"
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
            {open4 === true && (
              <div className="w-full flex items-center justify-between">
                <h1 className="text-bellefuGreen capitalize">
                  Please{" "}
                  <span
                    onClick={() => router.push("/login")}
                    className="text-bellefuOrange font-bold"
                  >
                    login
                  </span>{" "}
                  to send a review
                </h1>
                <RiCloseFill
                  className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                  onClick={() => setOpen4(false)}
                />
              </div>
            )}

            {/* end of reviews */}

            {/* report seller */}
            <div className="mt-5">
              <div className="border rounded-md px-2 flex flex-col items-center justify-center py-3 bg-bellefuBackground ">
                <p className="text-sm text-center text-bellefuBlack1">
                  Did you noticed any illegal activities from this seller
                </p>
                <div
                  className="flex items-center mt-5 border w-full py-2 space-x-3 rounded-md bg-bellefuWhite justify-center"
                  onClick={reportOpen}
                >
                  {" "}
                  <RiMessageFill className="w-5 h-5 text-red-500" />
                  <p className="text-gray-400 font-normal text-xs cursor-pointer">
                    Report Seller
                  </p>
                </div>
                {/* report box */}
                {open1 === true && (
                  <div className="border -mt-10 bg-bellefuBackground divide-y w-full border-orange-200 rounded-md">
                    <div className="flex items-center py-1">
                      <div className="flex items-center w-full space-x-3 rounded-md justify-end">
                        <RiMessageFill className="w-4 h-4 text-red-500" />{" "}
                        <p className="text-gray-400 font-normal text-sm">
                          Report
                        </p>
                      </div>
                      <RiCloseFill
                        className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                        onClick={() => setOpen1(false)}
                      />
                    </div>

                    <textarea
                      rows="5"
                      className="w-full bg-transparent px-3 outline-none text-xs"
                    ></textarea>
                    <div className="flex items-center justify-center py-2">
                      <button
                        onClick={handleReport}
                        className="text-white bg-bellefuOrange/60 hover:bg-bellefuOrange duration-200 transition ease-in px-8 py-1 rounded-md text-sm capitalize"
                      >
                        send
                      </button>
                    </div>
                  </div>
                )}
                {/* end of report box */}
                {open5 === true && (
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-bellefuGreen capitalize">
                      Please{" "}
                      <span
                        onClick={() => router.push("/login")}
                        className="text-bellefuOrange font-bold"
                      >
                        login
                      </span>{" "}
                      to report seller
                    </h1>
                    <RiCloseFill
                      className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                      onClick={() => setOpen5(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductMobileSidebar;
