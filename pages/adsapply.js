import React from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { apiData } from "../constant";
//   import {handleCatUpdate} from "../../features/bellefuSlice";
//   import { useSelector, useDispatch } from "react-redux";

export default function Custom() {
  const [loading, setLoading] = useState(false);

  const [fname, setFname] = useState("");
  const [emaile, setEmaile] = useState("");
  const [phone, setPhone] = useState("");
  const [comments, setComments] = useState("");

  const [sampleimagefile, setSampleImageFile] = useState([]);

  const handleSubmit = (e) => {
    if (fname === "" || emaile === "" || phone === "" || comments === "") {
      toast.error("Please fill all the fields");
    } else {
      e.preventDefault();
      const formdata = new FormData();

      formdata.append("fullname", fname);
      formdata.append("email", emaile);
      formdata.append("number", phone);
      formdata.append("comment", comments);

      axios({
        method: "POST",
        url: `${apiData}create/custom/request`,
        data: formdata,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Request submitted successfully");
          setFname("");
          setEmaile("");
          setPhone("");
          setComments("");
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
    <div className="justify-center align-middle flex">
      {loading ? (
        <div className=" shadow bg-bellefuWhite lg:w-[50%] m-5 rounded-md mt-32  p-5">
          <div className="justify-center align-middle text-center">
            <h2 className="text-2xl font-bold">Custom Advert</h2>
            <p>
              Do you wish to promote your brand? Please use the form below to
              let us know about it.
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
                          Full-Name
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
                          for="email"
                          className="block my-2 text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          onChange={(e) => setEmaile(e.target.value)}
                          value={emaile}
                          // onChange={handleLocation}
                          className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block my-2 text-sm font-medium text-gray-700">
                          Phone
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
                        <label
                          for="email"
                          className="block text-sm my-2 font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <textarea
                          onChange={(e) => setComments(e.target.value)}
                          value={comments}
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
