import React from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import { apiData } from "../constant";
import Head from "next/head";
//   import {handleCatUpdate} from "../../features/bellefuSlice";
//   import { useSelector, useDispatch } from "react-redux";

const optionSelect = [
  { value: "Ads" },
  { value: "Customer service" },
  { value: "Custom request" },
  { value: " Feature request" },
  { value: "others" },
];

export default function Feedback() {
  const [loading, setLoading] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    if (
      fname === "" ||
      lname === "" ||
      email === "" ||
      phone === "" ||
      dept === null ||
      comment === ""
    ) {
      toast.error("Please fill all the fields");
    } else {
      e.preventDefault();
      const data = {
        firstname: fname,
        lastname: lname,
        email: email,
        phone: phone,
        department: dept,
        comment: comment,
      };
      fetch(`${apiData}send/feedback/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Feedback submitted successfully");
          setFname("");
          setLname("");
          setEmail("");
          setPhone("");
          setDept(null);
          setComment("");
        } else {
          toast.error("Something went wrong");
        }
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="justify-center align-middle flex mt-20">
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
      {loading ? (
        <div className=" shadow bg-bellefuWhite lg:w-[50%] m-5 rounded-md  p-5">
          <div className="justify-center align-middle text-center">
            <h2 className="text-2xl font-bold">FEEDBACK</h2>
            <p>
              Have a complaint or query about any of the products or ads on our
              website? Please use the form below to let us know about it.
            </p>
          </div>

          <div className="border  p-5 mt-7 ">
            <div>
              <form action="#" method="POST">
                <div className=" overflow-hidden sm:rounded-md">
                  <div className=" sm:p-6">
                    <div className="">
                      <div className="">
                        <label
                          for="first-name"
                          className="block my-2 text-sm font-medium text-gray-700"
                        >
                          First-Name
                        </label>
                        <input
                          type="text"
                          id="location"
                          onChange={(e) => setFname(e.target.value)}
                          value={fname}
                          className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="last-name"
                          className="block my-2 text-sm font-medium text-gray-700"
                        >
                          Last-Name
                        </label>
                        <input
                          type="text"
                          id="location"
                          onChange={(e) => setLname(e.target.value)}
                          value={lname}
                          // onChange={handleLocation}
                          className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="email"
                          className="block my-2 text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          // onChange={handleLocation}
                          className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="email"
                          className="block my-2 text-sm font-medium text-gray-700"
                        >
                          Number
                        </label>
                        <input
                          type="number"
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}
                          // onChange={handleLocation}
                          className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        {/* <label
                          for="email"
                          className="block my-2 text-sm font-medium text-gray-700"
                        >
                          Department
                        </label> */}
                        {/* <UnstyledSelectSimple1
                        />{" "} */}
                        <div className="w-full">
                          <div className="flex items-center mb-2 hover:bg-bellefuBackground p-3 rounded-md border mt-4 relative">
                            <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                              <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                                {dept === null ? " Select Department" : dept}
                              </h5>
                            </div>
                            {!open1 ? (
                              <div onClick={() => setOpen1(!open1)}>
                                <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                              </div>
                            ) : (
                              <div onClick={() => setOpen1(!open1)}>
                                <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                              </div>
                            )}
                          </div>
                          {open1 ? (
                            <div className="w-full bg-bellefuWhite rounded border transition duration-300 ease-in">
                              <ul className="rounded px-5 py-4">
                                {optionSelect?.map((item, index) => (
                                  <li
                                    onClick={() => {
                                      setOpen1(!open1);
                                      // setSubCatText(item.subCatName);
                                      setDept(item.value);
                                    }}
                                    key={index}
                                    className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                                  >
                                    <span>{item.value}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          for="email"
                          className="block text-sm my-2 font-medium text-gray-700"
                        >
                          Comment
                        </label>
                        <textarea
                          onChange={(e) => setComment(e.target.value)}
                          value={comment}
                          type="text"
                          col="4"
                          // onChange={handleLocation}
                          className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex justify-between">
                  {/* <Link href="/postAds/Details"> */}
                  <button
                    // disabled={address===""?true:false}
                    type="submit"
                    onClick={handleSubmit}
                    className="flex justify-center items-center  w-full py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Submit
                  </button>
                  {/* </Link> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton
          className="rounded "
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={1000}
        />
      )}
    </div>
  );
}
