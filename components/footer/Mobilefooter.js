import React, { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiOutlineInstagram,
  // AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { useRouter } from "next/router";
import NewsletterSub from "./NewsletterSub";

function Mobilefooter() {
  const router = useRouter();

  const [openComm, setOpenComm] = useState(false);
  const [openAcademy, setOpenAcademy] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);

  return (
    <div className="bg-[#191A19] lg:hidden mt-3 md:mt-7 md:px-7 px-2 w-full h-auto relative bottom-0 pb-24 ">
      <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 mt-3">
        <div className="hidden md:inline-block">
          <div className="-mt-1  md:-mt-0 md:w-2/5 flex items-center justify-center md:justify-start">
            <img
              alt="logo"
              src="https://www.linkpicture.com/q/bellefulogo_1_-removebg-preview.png"
              className=" mt-2 h-10 object-contain cursor-pointer "
            />
          </div>
        </div>

        <NewsletterSub />
      </div>

      <div className="flex space-x-3 mb-3">
        <p className="text-[#D4D7D1] hidden w-3/5 md:inline-block text-justify font-light text-base">
          Bellefu.com is a dynamic online marketplace dedicated to
          agriculture-related activities ensuring farmers, buyers, and sellers
          of agricultural products have direct contact with other agro-allied
          providers and manufacturing industries around the world. Bellefu is
          designed to make searching for agro products available at your
          fingertips.
        </p>

        <div className="flex justify-evenly w-full mt-7">
          <div className="space-y-2 flex flex-col  ">
            <p className="text-[#F9FDF5] ">
              <strong>Resources</strong>
            </p>
            <ul className="list-none space-y-2  font-light text-[#D4D7D1] text-sm">
              {/* communication starts here */}
              <li
                className="flex items-center cursor-pointer"
                onClick={() => setOpenComm(!openComm)}
              >
                <span className="link">Communication</span>
                <span>
                  {!openComm ? (
                    <MdKeyboardArrowRight className="w-6 h-6 text-gray-500 " />
                  ) : (
                    <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-500 " />
                  )}
                </span>
              </li>
              {openComm && (
                <ul className=" ml-2 -mt-2 space-y-1">
                  <li>
                    <a href="https://www.radio.bellefu.com " className="">
                      Online Radio
                    </a>
                  </li>
                  <li>
                    <a href="https://www.blog.bellefu.com" className="">
                      Blog
                    </a>
                  </li>
                </ul>
              )}

              {/* academy starts here */}
              <li
                className="flex items-center cursor-pointer"
                onClick={() => setOpenAcademy(!openAcademy)}
              >
                <span className="link">Academy</span>
                {!openAcademy ? (
                  <MdKeyboardArrowRight className="w-6 h-6 text-gray-500 " />
                ) : (
                  <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-500 " />
                )}
              </li>
              {openAcademy && (
                <ul className="ml-2 -mt-2 space-y-1">
                  <li>
                    <a href="https://www.webinar.bellefu.com" className="link">
                      Webinar
                    </a>{" "}
                  </li>
                  <li>
                    <a
                      href="https://chat.whatsapp.com/IJW6VM4aVnG6AOASxx9VIV"
                      className="link"
                    >
                      Training Group
                    </a>{" "}
                  </li>
                </ul>
              )}
            </ul>
          </div>

          <div className="space-y-2 flex flex-col ">
            <p className="text-[#F9FDF5]">
              <strong>Information</strong>
            </p>
            <li
              className="flex items-center cursor-pointer"
              onClick={() => setOpenInfo(!openInfo)}
            >
              <span className="link text-gray-300">Info</span>
              <span>
                {!openInfo ? (
                  <MdKeyboardArrowRight className="w-6 h-6 text-gray-500 " />
                ) : (
                  <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-500 " />
                )}
              </span>
            </li>
            <li className="link text-gray-300">
              <a tabIndex="_blank" href="https://about.bellefu.com/">
                About
              </a>
            </li>

            {openInfo && (
              <ul className="list-none  font-light space-y-2 text-[#D4D7D1] text-sm ml-2">
                <li>
                  {" "}
                  <a href="https://linktr.ee/bellefu">linktree</a>
                </li>
                <li onClick={() => router.push("/policy")}>Legal</li>
                <li onClick={() => router.push("/feedback")}>Feedback</li>
                <li onClick={() => router.push("/contact")}>Contact</li>
              </ul>
            )}
          </div>

          <div className="space-y-2 flex flex-col ">
            <p className="text-[#F9FDF5]">
              <strong>Head Office</strong>
            </p>
            <li
              className="flex items-center cursor-pointer"
              onClick={() => setOpenAddress(!openAddress)}
            >
              <span className="link text-gray-300">Address</span>
              <span>
                {!openAddress ? (
                  <MdKeyboardArrowRight className="w-6 h-6 text-gray-500 " />
                ) : (
                  <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-500 " />
                )}
              </span>
            </li>
            {openAddress && (
              <ul className="list-none space-y-2  font-light  text-[#D4D7D1] text-sm ">
                <li> 9550 Forest Lane</li>
                <li>Dallas TX, 75243,</li>
                <li>United State</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      <hr className="" />

      <div className=" flex items-center space-x-2 justify-center mb-4 mt-3">
        <a href="https://play.google.com/store/apps/details?id=com.bellefu_farmers_market.bellefu">
          <img
            alt="error"
            src="https://www.linkpicture.com/q/play-removebg-preview-1.png"
            className="w-28 h-8 object-contain"
          />
        </a>
        <a href="https://apps.apple.com/us/app/bellefu/id1556135856">
          <img
            alt="error"
            src="https://www.linkpicture.com/q/ios-removebg-preview.png"
            className="w-28 h-8 object-contain"
          />
        </a>
      </div>

      <div className="flex items-center justify-center mb-4 space-x-8">
        <a href="https://web.facebook.com/Bellefu.official">
          <BsFacebook className="text-[#d4d7d1] text-2xl" />
        </a>
        <a href="https://twitter.com/Bellefuofficial">
          <AiFillTwitterCircle className="text-[#d4d7d1] text-2xl" />
        </a>
        <a href="https://www.linkedin.com/company/67955966/">
          <FaLinkedin className="text-[#d4d7d1] text-2xl" />
        </a>
        <a href=" https://www.instagram.com/bellefu_official/">
          <AiOutlineInstagram className=" text-[#d4d7d1]   text-2xl" />
        </a>
        <a href="https://www.youtube.com/channel/UCOmmJSiICuspcEjyj4nFx0Q">
          <BsYoutube className=" text-[#d4d7d1]   text-2xl" />
        </a>
      </div>

      <p className="flex text-[#9c9c9c] items-center justify-center text-xs md:text-sm m-3 space-x-3">
        {/* <AiOutlineCopyrightCircle className="text-xl mr-2" /> */}© 2022
        Bellefu Digital Agriculture LLC. All rights reserved.
      </p>
    </div>
  );
}

export default Mobilefooter;
