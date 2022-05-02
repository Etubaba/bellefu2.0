import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiOutlineInstagram
  // AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { useRouter } from "next/router";
import NewsletterSub from "./NewsletterSub";

function Mobilefooter() {

  const router = useRouter();
  return (
    <div className="bg-[#191A19] lg:hidden mt-3 md:mt-7 md:px-7 px-2 w-full h-auto relative bottom-0 pb-3 ">
      <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:items-center md:justify-between">
        <div className="-mt-1 md:-mt-0">
          <img
            alt="logo"
            src="https://www.linkpicture.com/q/bellefulogo_1_-removebg-preview.png"
            className="w-full mt-5 h-10 object-contain cursor-pointer"
          />
        </div>



        <NewsletterSub />


      </div>

      <div className="flex justify-evenly md:justify-between md:items-center space-x-3 mb-3">
        <p className="text-[#D4D7D1] hidden w-1/3 md:inline-block text-justify font-light text-base">
          Bellefu.com is a dynamic online marketplace dedicated to
          agriculture-related activities ensuring farmers, buyers, and sellers
          of agricultural products have direct contact with other agro-allied
          providers and manufacturing industries around the world. Bellefu is
          designed to make searching for agro products available at your
          fingertips.
        </p>
        <div className="space-y-2 flex flex-col items-center justify-center">
          <p className="text-[#F9FDF5] text-center">
            <strong>Resources</strong>
          </p>

          <ul className="list-none space-y-2  font-light text-[#D4D7D1] text-sm">
            <li><a href="https://www.radio.bellefu.com ">Online Radio</a></li>
            <li href="https://chat.whatsapp.com/IJW6VM4aVnG6AOASxx9VIV">Training Group</li>
            <li href="https://www.webinar.bellefu.com">Webinar</li>
            <li href="https://www.blog.bellefu.com ">Blog</li>
          </ul>
        </div>

        <div className="space-y-2 lex flex-col items-center justify-center">
          <p className="text-[#F9FDF5] text-center">
            <strong>Information</strong>
          </p>

          <ul className="list-none  font-light space-y-2 text-[#D4D7D1] text-sm">
            <li> <a href='https://linktr.ee/bellefu'>linktree</a></li>
            <li onClick={() => router.push('/policy')}>Legal</li>
            <li onClick={() => router.push('/feedback')}>Feedback</li>
            <li onClick={() => router.push('/contact')}>Contact</li>
          </ul>
        </div>

        <div className="space-y-2 lex flex-col items-center justify-center">
          <p className="text-[#F9FDF5] text-center">
            <strong>Head Office</strong>
          </p>

          <ul className="list-none space-y-2  font-light  text-[#D4D7D1] text-sm">
            <li> 9550 Forest Lane</li>
            <li>Dallas TX, 75243,</li>
            <li>United State</li>
          </ul>
        </div>
      </div>

      <hr className="" />

      <div className=" flex items-center space-x-2 justify-center mb-4 mt-3">
        <a href='https://play.google.com/store/apps/details?id=com.bellefu_farmers_market.bellefu'>
          <img
            alt="error"
            src="https://www.linkpicture.com/q/play-removebg-preview-1.png"
            className="w-28 h-8 object-contain"
          />
        </a>
        <a href='https://apps.apple.com/us/app/bellefu/id1556135856'>
          <img
            alt="error"
            src="https://www.linkpicture.com/q/ios-removebg-preview.png"
            className="w-28 h-8 object-contain"
          />
        </a>

      </div>

      <div className="flex items-center justify-center mb-4 space-x-8">
        <a href='https://web.facebook.com/Bellefu.official'>
          <BsFacebook className="text-[#4267B2] text-2xl" />
        </a>
        <a href='https://twitter.com/Bellefuofficial'>
          <AiFillTwitterCircle className="text-[#00acee] text-2xl" />
        </a>
        <a href='https://www.linkedin.com/company/67955966/'>
          <FaLinkedin className="text-[#0e76a8] text-2xl" />
        </a>
        <a href=" https://www.instagram.com/bellefu_official/">
          <AiOutlineInstagram className=" text-[#DF4A8E]   text-2xl" />
        </a>
        <a href="https://www.youtube.com/channel/UCOmmJSiICuspcEjyj4nFx0Q">
          <BsYoutube className=" text-red-600   text-2xl" />
        </a>


      </div>

      <p className="flex text-[#9c9c9c] items-center justify-center text-base md:text-sm m-3 space-x-3">
        {/* <AiOutlineCopyrightCircle className="text-xl mr-2" /> */}© 2022
        Bellefu Digital Agriculture LLC. All rights reserved.
      </p>
    </div>
  );
}

export default Mobilefooter;
