import React, { useState } from "react";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiOutlineInstagram,
  AiOutlineCopyrightCircle,
} from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";
import { useRouter } from "next/router";
import NewsletterSub from "./NewsletterSub";

function Footer() {
  const router = useRouter();

  const [openComm, setOpenComm] = useState(false);
  const [openAcademy, setOpenAcademy] = useState(false);

  const action =
    "https://bellefu.us7.list-manage.com/subscribe/post?u=500989ddbb1252dfed8f35378&amp;id=bad07acb72";

  return (
    <div className="bg-[#191A19] hidden lg:inline-block px-12 w-full h-auto z-40 relative mt-12 bottom-0 pb-6 pt-12">
      <div className="flex justify-evenly space-x-10 mb-12">
        <div className="flex flex-col space-y-3 w-80">
          <img
            className="h-10 w-32"
            alt="About US"
            src="https://www.linkpicture.com/q/bellefulogo_1_-removebg-preview.png"
          />
          <p className="text-[#D4D7D1] text-justify font-light text-sm">
            Bellefu.com is a dynamic online marketplace dedicated to
            agriculture-related activities ensuring farmers, buyers, and sellers
            of agricultural products have direct contact with other agro-allied
            providers and manufacturing industries around the world. Bellefu is
            designed to make searching for agro products available at your
            fingertips.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[#F9FDF5]">
            <strong>Resources</strong>
          </p>

          <ul className="list-none space-y-2  font-light text-[#D4D7D1] text-sm">
            {/* communication starts here */}
            <li
              className="flex items-center cursor-pointer"
              onClick={() => setOpenComm(!openComm)}
            >
              <span className="link ">Communication</span>
              {!openComm ? (
                <MdKeyboardArrowRight className="w-6 h-6 text-gray-500 " />
              ) : (
                <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-500 " />
              )}
            </li>
            {openComm && (
              <ul className="ml-2 -mt-2 space-y-1">
                <li>
                  <a
                    target="_blank"
                    href="https://www.radio.bellefu.com "
                    className="link "
                  >
                    Online Radio
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.blog.bellefu.com"
                    className="link"
                  >
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
              <span className="link ">Academy</span>
              {!openAcademy ? (
                <MdKeyboardArrowRight className="w-6 h-6 text-gray-500 " />
              ) : (
                <MdOutlineKeyboardArrowDown className="w-6 h-6 text-gray-500 " />
              )}
            </li>
            {openAcademy && (
              <ul className="ml-2 -mt-2 space-y-1">
                <li>
                  <a
                    target="_blank"
                    href="https://www.webinar.bellefu.com"
                    className="link"
                  >
                    Webinar
                  </a>{" "}
                </li>
                <li>
                  <a
                    target="_blank"
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

        <div className="space-y-2">
          <p className="text-[#F9FDF5]">
            <strong>Help & Support</strong>
          </p>

          <ul className="list-none  font-light space-y-2 text-[#D4D7D1] text-sm">
            <li onClick={() => router.push("/Feedback")} className="link">
              Feedback
            </li>

            <li>
              <a
                className="link"
                href="mailto:hr@bellefu.com?subject=Application"
              >
                Submit CV
              </a>
            </li>
            <li className="link" onClick={() => router.push("/contact")}>
              Contact
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.youtube.com/channel/UCOmmJSiICuspcEjyj4nFx0Q"
                className="link"
              >
                Documentary
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-[#F9FDF5]">
            <strong>Information</strong>
          </p>

          <ul className="list-none  font-light space-y-2 text-[#D4D7D1] text-sm">
            <li>
              <a
                target="_blank"
                className="link"
                href="https://linktr.ee/bellefu"
              >
                Linktree
              </a>
            </li>
            <li>
              <a
                target="_blank"
                className="link"
                href="https://about.bellefu.com/"
              >
                About us
              </a>
            </li>
            <li
              onClick={() => router.push("/policy")}
              className="link cursor-pointer"
            >
              Legal
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-[#F9FDF5]">
            <strong>Contact Phones</strong>
          </p>

          <ul className="list-none  font-light space-y-2 text-[#D4D7D1] text-sm">
            <li>+1 (254) 221-3007 USA</li>
            <li>+(234) 813 668 6060 Nigeria</li>
            <li>+(27) 62 579 5507 South Africa</li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-[#F9FDF5]">
            <strong>Head Office</strong>
          </p>

          <ul className="list-none space-y-2  font-light text-[#D4D7D1] text-sm">
            <li> 9550 Forest Lane</li>
            <li>Dallas TX, 75243,</li>
            <li>United State</li>
          </ul>
        </div>
      </div>

      <NewsletterSub action={action} />
      {/* <div className=" flex flex-col space-y-2 items-center justify-center">
        <p className="text-[#D4D7D1] text-xs">
          Subscribe to our newsletter to get updates and amazing tips
        </p>
        <div className="flex">
          <input
            className="w-96 text-white rounded-sm bg-[#2C2C2C] mr-2 p-4 outline-none "
            type="email"
            placeholder="Enter your email here"
          />
          <button className="bg-bellefuOrange rounded-sm py-4  px-8 text-white">
            Send
          </button>
        </div>
      </div> */}

      <hr className="my-2 mx-4 bg-[#767873] " />

      <div className="flex justify-between mt-10 mx-5 items-center space-x-3 ">
        <div className="space-x-4 flex justify-evenly">
          <a target="_blank" href="https://web.facebook.com/Bellefu.official">
            <BsFacebook className=" hover:text-gray-500   text-[#d4d7d1] link text-2xl" />
          </a>

          <a target="_blank" href="https://twitter.com/Bellefuofficial">
            <AiFillTwitterCircle className="text-[#d4d7d1] hover:text-gray-500  text-3xl" />
          </a>
          <a
            target="_blank"
            href=" https://www.instagram.com/bellefu_official/"
          >
            <AiOutlineInstagram className="text-[#d4d7d1] hover:text-gray-500  text-3xl" />
          </a>
          <a target="_blank" href="https://www.linkedin.com/company/67955966/">
            <FaLinkedin className="text-[#d4d7d1] hover:text-gray-500  mt-1 text-2xl" />
          </a>
          <a
            target="_blank"
            href="https://www.youtube.com/channel/UCOmmJSiICuspcEjyj4nFx0Q"
          >
            <BsYoutube className=" hover:text-gray-500  mt-[3px] text-[#d4d7d1] link text-3xl" />
          </a>
        </div>

        <div className=" flex">
          <a
            target="_blank"
            href="https://play.google.com/store/apps/details?id=com.bellefu_farmers_market.bellefu"
          >
            <img
              alt="error"
              src="https://www.linkpicture.com/q/play-removebg-preview-1.png"
              className="w-40 h-10 mr-6"
            />
          </a>
          <a
            target="_blank"
            href="https://apps.apple.com/us/app/bellefu/id1556135856"
          >
            <img
              alt="error"
              src="https://www.linkpicture.com/q/ios-removebg-preview.png"
              className="w-40 h-10"
            />
          </a>
        </div>

        <p className="flex text-[#9c9c9c] space-x-3">
          <AiOutlineCopyrightCircle className="text-xl mr-2" />
          2022 Bellefu Digital Agriculture LLC. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Footer;
