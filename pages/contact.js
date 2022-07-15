import Head from "next/head";
import React, { useState } from "react";
import {
  BsFacebook,
  BsTwitter,
  BsWhatsapp,
  BsFillFlagFill,
  BsInstagram,
  BsSuitHeartFill,
  BsFillCheckSquareFill,
  BsYoutube,
} from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiData } from "../constant";

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    if (fullName === "" || email === "" || phone === "" || comment === "") {
      toast.error("Please fill all the fields", { position: "top-center" });
    } else {
      e.preventDefault();

      const data = {
        fullname: fullName,
        email: email,
        phone: phone,
        comment: comment,
      };

      fetch(`${apiData}send/contact/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Your message was submitted successfully");
          setFullName("");
          setEmail("");
          setPhone("");
          setComment("");
        } else {
          toast.error("Something went wrong");
        }
      });
    }
  };

  return (
    <div className="md:max-w-5xl md:mx-auto w-full flex flex-col md:flex-row space-y-3 md:space-x-10 bg-white mt-20 md:mt-20 md:p-5 p-2 rounded-sm">
      <Head>
        <title>Bellefu Digital Agro Connect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bellefu is a agricultural products site and connection between farmers and buyers that offers a wide. We are into food products, agricultural machinery,farmers"
        />

        <link
          rel="icon"
          href="https://www.linkpicture.com/q/bellefuApplogo.jpg"
        />
      </Head>
      {/* left side */}
      <div className="w-full md:w-[60%]">
        <h2 className="uppercase text-5xl font-semibold text-gray-700 tracking-wider mb-6">
          Contact Us
        </h2>
        <p className="text-lg mb-6 text-gray-500">
          Get in touch with us let us know how we can help.
        </p>

        <div className="flex flex-col space-y-3">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="border outline-none px-2 md:py-1 py-2 rounded focus:ring-bellefuOrange focus:ring-1 text-base md:text-lg"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enmail"
            className="border outline-none px-2 md:py-1 py-2 rounded focus:ring-bellefuOrange focus:ring-1 text-base md:text-lg"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone number"
            className="border outline-none px-2 md:py-1 py-2 rounded focus:ring-bellefuOrange focus:ring-1 text-base md:text-lg"
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className=" p-2 rounded shadow outline-none ring-yellow-500 focus:ring-1"
            placeholder="Comment"
            rows="5"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="bg-bellefuOrange px-6 py-1 text-white text-center font-bold rounded tracking-wider"
          >
            Submit
          </button>
        </div>
      </div>
      {/* right side */}
      <div className="w-full md:w-[40%]">
        <h3 className="font-bold tracking-wider mb-7 mt-3">Head Office</h3>
        <p className="font-bold text-gray-500 mb-8">
          9550 Forest Lane Dallas 75243, Dallas,TX, US
        </p>
        <div className="flex space-x-20 md:space-x-0 md:flex-col">
          <div className="flex flex-col">
            <h4 className="font-bold tracking-wider text-base mb-5">Phone</h4>
            <div className="flex flex-col space-y-3 text-gray-600 font-semibold mb-6">
              <p>+1 (254) 221-3007 USA</p>
              <p>+234-813 668 6060 Nigeria</p>
              <p>+(27) 62 579 5507 South Arica</p>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="font-bold tracking-wider text-base mb-5">Email</p>
            <p className="font-bold tracking-widest text-sm text-gray-500 mb-6">
              contact@bellefu.com
            </p>
            <div className="flex items-center space-x-5 text-xl">
              <a href="https://www.facebook.com/bellefu.official">
                <BsFacebook className="text-[#3b5998]" />
              </a>

              <a href="https://twitter.com/Bellefuofficial">
                <BsTwitter className="text-[#00acee]" />
              </a>
              <a href="https://www.linkedin.com/company/67955966/">
                <FaLinkedinIn className="text-[#0e76a8]" />
              </a>
              <a href=" https://www.instagram.com/bellefu_official/">
                <BsInstagram className="text-[#E1306C]" />
              </a>
              <a href="https://www.youtube.com/channel/UCOmmJSiICuspcEjyj4nFx0Q">
                <BsYoutube className="text-[#c4302b]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
