import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { BsBellFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { apiData } from "../../constant";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";

const notification = () => {
  const [notifyList, setNotifyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);

  const skeleMap = [
    <Skeleton
      className="rounded mt-6 "
      variant="rectangular"
      animation="wave"
      width={"100%"}
      height={40}
    />,
    <Skeleton
      className="rounded mt-6 "
      variant="rectangular"
      animation="wave"
      width={"100%"}
      height={40}
    />,
    <Skeleton
      className="rounded mt-6 "
      variant="rectangular"
      animation="wave"
      width={"100%"}
      height={40}
    />,
    <Skeleton
      className="rounded mt-6 "
      variant="rectangular"
      animation="wave"
      width={"100%"}
      height={40}
    />,
  ];

  useEffect(() => {
    const getNotify = async () => {
      axios
        .get(`${apiData}user/notification/${userId}`)
        .then((res) => setNotifyList(res.data.data));
    };

    getNotify();
  }, []);

  const deleteAll = () => {
    if (notifyList.length !== 0) {
      axios
        .post(`${apiData}notification/clear`, { userId: userId })
        .then((res) => {
          if (res.data.status) {
            toast.success("All notifications had been cleared", {
              position: "top-right",
            });
          }
        });
    } else {
      toast.error("You do not have notification to clear", {
        position: "top-right",
      });
    }
  };

  function isToday(dateParameter) {
    const today = new Date();

    return (
      dateParameter.getDate() == today.getDate() &&
      dateParameter.getMonth() == today.getMonth() &&
      dateParameter.getFullYear() == today.getFullYear()
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="  rounded-lg mt-5 bg-bellefuWhite h-auto  w-full lg:w-auto pb-2 ">
      {loading ? (
        <div className="flex text-center justify-between p-2">
          <div className="text-lg ml-3 font-bold ">Notifications</div>

          <div
            onClick={deleteAll}
            className="bg-bellefuBackground hover:text-orange-200 text-bellefuOrange rounded px-2  p-1"
          >
            Clear
          </div>
        </div>
      ) : (
        <Skeleton
          className="rounded mt-6 "
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={30}
        />
      )}
      <hr />

      {/* {notifyList.length === 0 ? (
       <>
        {loading?<div className="h-full">
        <div
          onClick={deleteAll}
          className="bg-bellefuBackground hover:text-orange-200 cursor-pointer text-bellefuOrange rounded px-2  p-1"
        >
          Clear
        </div>
      </div>
      <hr /> */}

      {notifyList?.length === 0 ? (
        <>
          {loading ? (
            <div className="h-full px-2 md:px-0">
              <div className="md:border mx-auto mt-10 rounded-xl w-full  md:w-7/12 md:h-11/12 ">
                <div className="flex flex-col justify-center mt-24 mb-24 items-center">
                  <BsBellFill className="text-4xl mb-5 text-gray-600" />
                  <p className="text-lg text-gray-600 text-center px-4">
                    You have not received any notification yet
                  </p>
                </div>
              </div>
              <span className="text-orange-300 justify-end mt-10 md:mt-28 mr-4  flex">
                <MdDeleteForever className="text-xl" /> Delete all notification
              </span>
            </div>
          ) : (
            <Skeleton
              className="rounded mt-6 "
              variant="rectangular"
              animation="wave"
              width={"100%"}
              height={500}
            />
          )}
        </>
      ) : (
        <>
          <div>
            {loading
              ? notifyList?.map((list, index) => (
                  <div key={index}>
                    <div className="lg:w-[93%] p-5 m-5 lg:m-10 border rounded-lg hover:bg-[#F9FDF5]  h-auto">
                      <div className="flex">
                        <img
                          src="https://www.linkpicture.com/q/bellefulogo.png"
                          className="w-11 h-8 lg:w-20 lg:h-10 mr-3 mt-1 lg:mr-4 rounded-full"
                          alt="Bellefu"
                        />
                        <div className="">
                          <p className="text-[#3F3F3F] mb-3 text-base  ">
                            {list.message}
                          </p>

                          <p className="text-[#9799AB] text-sm">
                            {isToday(new Date(list.created_at))
                              ? moment(list.created_at).format("LT")
                              : moment(list.created_at).format("ll")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : skeleMap.map((ske, index) => <div key={index}>{ske}</div>)}
            {/* {notifyList?.map((list, index) => (
              <div key={index}>
                <div className="lg:w-[93%] p-5 m-5 lg:m-10 border rounded-lg hover:bg-[#F9FDF5]  h-auto">
                  <div className="flex">
                    <img
                      src="https://www.linkpicture.com/q/bellefulogo.png"
                      className="w-11 h-8 lg:w-20 lg:h-10 mr-3 mt-1 lg:mr-4 rounded-full"
                      alt="Bellefu"
                    />
                    <div className="">
                      <p className="text-[#3F3F3F] mb-3 text-base  ">
                        {list.message}
                      </p>

                      <p className="text-[#9799AB] text-sm">
                        {isToday(new Date(list.created_at))
                          ? moment(list.created_at).format("LT")
                          : moment(list.created_at).format("ll")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
          </div>
        </>
      )}
    </div>
  );
};

notification.Layout = Layout;
export default notification;

// export async function getServerSideProps(context) {
//   // console.log(userid)
//   // const userid = useSelector((state) => state.bellefu?.profileDetails.id);

//   const res = await fetch(
//     `https://bellefu.inmotionhub.xyz/api/general/user/notification/${userid}`
//   );
//   // const data = await res.json();
//   // const userid=context.query;

//   return {
//     props: {
//       data,
//       userid,
//     },
//   };
// }
