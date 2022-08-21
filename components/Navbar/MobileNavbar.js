import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdNotifications, IoMdAddCircleOutline } from "react-icons/io";
import { RiLogoutBoxFill, RiLogoutBoxLine } from "react-icons/ri";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlineLogin,
} from "react-icons/ai";
import { FiRadio } from "react-icons/fi";
import { GoLaw } from "react-icons/go";
import { FaBloggerB } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  MdShoppingCart,
  MdDashboard,
  MdDevices,
  MdOutlinePrivacyTip,
  MdOutlineHome,
} from "react-icons/md";
import { isLoggedIn, login, profileDetails } from "../../features/bellefuSlice";
import axios from "axios";
import Loader, { apiData, shopApi, UserAvataUrl } from "../../constant";
import { BsShop, BsNewspaper, BsFillPersonPlusFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

const MobileNavbar = ({ setLoading, isOpen, setIsOpen, username, msgRead }) => {
  const [userShop, setUserShop] = useState(false);
  const getIsLoggedIn = useSelector(login);
  const verify = useSelector((state) => state.bellefu?.verificationStatus);

  const router = useRouter();
  const dispatch = useDispatch();
  const [cartCount, setCartCount] = useState(0);
  const [unseen, setUnseen] = useState(0);
  const [unread, setUnread] = useState(0);

  //notification method
  const handleNotify = () => {
    if (getIsLoggedIn) {
      router.push("/users/notification");
      setLoading(true);
      setIsOpen(false);
      axios
        .post(`${apiData}change/notification/read`, { userId: username?.id })
        .then((res) => {
          if (res.data.status) {
            console.log("na lie ");
          }
        });
    } else {
      toast.info("Login to view notification", { position: "top-right" });
    }
  };

  const cartCheck = useSelector((state) => state.bellefu?.favLoad);

  // new message
  useEffect(() => {
    axios
      .get(`${apiData}unseen/messages/count/${username?.id}`)
      .then((res) => setUnseen(res.data.unseen));
  }, [msgRead]);

  //new notification
  useEffect(() => {
    axios
      .get(`${apiData}notification/count/${username?.id}`)
      .then((res) => setUnread(res.data.unread));
  }, []);

  useEffect(() => {
    axios.get(`${shopApi}list/cart/item/${username?.id}`).then((res) => {
      setCartCount(res.data.data);
    });
  }, [cartCheck]);

  const currentPath = router.pathname;

  // does a user have a shop ?
  const shopOwner = useSelector((state) => state.bellefu?.shop);
  useEffect(() => {
    if (getIsLoggedIn) {
      axios.get(`${shopApi}get/user/shop/${username?.id}`).then((res) => {
        setUserShop(res.data.status);
      });
    }
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bg-[#ffffff] w-72 space-y-3 px-2 pt-2 pb-5 top-0 -left-1 h-[100vh] font-semibold text-gray-700 lg:hidden shadow-md animate-slide-in"
    >
      <div
        className="-mb-2 flex items-center justify-end"
        onClick={() => setIsOpen(false)}
      >
        {isOpen && <AiOutlineClose className="w-6 h-6 text-black" />}
      </div>

      {/* avatar for mobile */}
      {getIsLoggedIn && (
        <>
          <div
            onClick={() => {
              router.push("/users/messages");
              setLoading(true);
              setIsOpen(false);
            }}
            className="cursor-pointer items-center justify-center flex"
          >
            <img
              // src={username?.avatar ? `https://bellefu.inmotionhub.xyz/get/user/images/${username?.avatar}` : "https://img.freepik.com/free-photo/organic-food-farm_342744-1362.jpg"}
              src={`${UserAvataUrl}${username?.avatar}`}
              // width={100}
              // height={100}
              className="rounded-full w-24 h-24 object-cover"
            />
            {unseen !== 0 ? (
              <p className="bg-orange-400 -mt-20 ml-14 h-8 w-8 absolute flex items-center justify-center rounded-full">
                <span className="text-gray-700 text-base text-left font-semibold">
                  {unseen}
                </span>
              </p>
            ) : null}
          </div>
          <div className="w-3/5 mx-auto flex justify-between">
            <p className="text-lg font-bold text-gray-700 tracking-wide ">
              {username?.username}
            </p>

            {currentPath === "/shops" ||
            currentPath === "/shopproduct/product" ||
            currentPath === "/shop/[slug]" ||
            currentPath === "/shop/cart" ||
            currentPath === "/shop/checkout" ? (
              <div
                className="relative cursor-pointer ml-10"
                onClick={() => {
                  router.push("/shop/cart");
                  setLoading(true);
                  setIsOpen(false);
                }}
              >
                <MdShoppingCart
                  className={
                    cartCount.length !== 0
                      ? "text-gray-700 w-6 h-6 animate-shake"
                      : "text-gray-700 w-6 h-6"
                  }
                />

                {cartCount.length !== 0 ? (
                  <p className=" bg-bellefuOrange -top-2 left-4 h-4 w-4 absolute flex items-center justify-center rounded-full">
                    <span className="text-gray-700 text-[10px] text-left ">
                      {cartCount.length}
                    </span>
                  </p>
                ) : null}
              </div>
            ) : null}

            <div className="relative cursor-pointer" onClick={handleNotify}>
              <IoMdNotifications
                className={
                  unread !== 0
                    ? "text-gray-700 w-6 h-6 animate-shake"
                    : "text-gray-700 w-6 h-6"
                }
              />

              {unread !== 0 ? (
                <p className=" bg-orange-400 -top-1 left-3 h-4 w-4 absolute flex items-center justify-center rounded-full">
                  <span className="text-gray-700 text-sm text-left ">
                    {unread}
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        </>
      )}

      {/* end of avatar for mobile */}

      <div className="space-y-4  text-gray-700">
        {getIsLoggedIn && (
          <div
            className=" bg-gray-100 font-bold tracking-wider flex p-2 text-left rounded text-sm"
            onClick={() => {
              router.push("/users");
              setIsOpen(false);
              setLoading(true);
            }}
          >
            <MdDashboard className="w-6 h-6 mr-2 text-gradient-to-r from-yellow-200 via-green-200 to-green-500" />
            <p>Dashboard</p>
          </div>
        )}
        {!getIsLoggedIn && (
          <span
            className="bg-gray-100 my-4 flex font-bold tracking-wider p-2 text-left rounded text-sm"
            onClick={() => {
              setIsOpen(false);
              router.push("/");
            }}
          >
            <MdOutlineHome className="w-6 h-6 mr-2  text-gradient-to-r from-yellow-200 via-green-200 to-green-500" />
            <p>Home</p>
          </span>
        )}
        <a className="" href="https://webinar.bellefu.com/" target="_blank">
          <span
            className="bg-gray-100 my-4 flex font-bold tracking-wider p-2 text-left rounded text-sm"
            onClick={() => setIsOpen(false)}
          >
            <MdDevices className="w-6 h-6 mr-2  text-gradient-to-r from-yellow-200 via-green-200 to-green-500" />
            <p>Webinar</p>
          </span>{" "}
        </a>
        <a href="https://blog.bellefu.com/" target="_blank">
          <span
            className="bg-gray-100 flex mb-4 font-bold tracking-wider p-2 text-left rounded text-sm"
            onClick={() => setIsOpen(false)}
          >
            <BsNewspaper className="w-6 h-6 mr-2   text-gradient-to-r from-yellow-200 via-green-200 to-green-500" />
            <p>Blog</p>
          </span>{" "}
        </a>
        {!getIsLoggedIn && (
          <>
            <span
              className="mb-4 bg-gray-100 font-bold tracking-wider flex p-2 text-left rounded text-sm"
              onClick={() => {
                router.push("/login"), setIsOpen(false), setLoading(true);
              }}
            >
              <AiOutlineLogin className="w-6 h-6 mr-2 mt-1  " />

              <p className="bg-gray-100 font-bold tracking-wider p-2 text-left rounded text-sm">
                Login
              </p>
            </span>
            <span
              className="mb-4 bg-gray-100  font-bold tracking-wider flex p-2 text-left rounded text-sm"
              onClick={() => (
                router.push("/register"), setIsOpen(false), setLoading(true)
              )}
            >
              <BsFillPersonPlusFill className="w-6 h-6 mr-2 mt-1   " />
              <p className="bg-gray-100 font-bold tracking-wider p-2 text-left rounded text-sm">
                Register
              </p>
            </span>

            <a href="https://about.bellefu.com/" target="_blank">
              <span
                className="bg-gray-100 flex my-4 font-bold tracking-wider p-2 text-left rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                <AiOutlineInfoCircle className="w-6 h-6 mr-2   text-gradient-to-r from-yellow-200 via-green-200 to-green-500" />
                <p>About us</p>
              </span>{" "}
            </a>

            <a href="https://radio.bellefu.com/" target="_blank">
              {" "}
              <p
                className=" bg-gray-100 flex mb-4 font-bold tracking-wider p-2 text-left rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                <FiRadio className="w-6 h-6 mr-2" />
                <p>Bellefu Radio</p>
              </p>
            </a>

            <span
              className="flex mb-4 bg-gray-100 p-2 text-left rounded"
              onClick={() => (
                router.push("/policy"), setIsOpen(false), setLoading(true)
              )}
            >
              <MdOutlinePrivacyTip className="w-6 h-6 mr-2   " />
              <p className=" mt-1 font-bold tracking-wider    text-sm">
                Privacy Policy
              </p>
            </span>
            {/* <span
              className="flex mb-4"
              onClick={() => (
                router.push("/register"), setIsOpen(false), setLoading(true)
              )}
            >
              <BsFillPersonPlusFill className="w-6 h-6 mr-2   " />
              <p className="bg-gray-100 mt-1 font-bold tracking-wider p-2 text-left rounded text-sm">
                Register
              </p>
            </span> */}
          </>
        )}
        <span
          className="flex mb-4 bg-gray-100 p-2 text-left rounded"
          onClick={() => (
            router.push("/terms-and-conditions"),
            setIsOpen(false),
            setLoading(true)
          )}
        >
          <GoLaw className="w-6 h-6 mr-2   " />
          <p className=" mt-1 font-bold tracking-wider    text-sm">
            Terms and Conditions
          </p>
        </span>

        {getIsLoggedIn &&
          (!userShop ? (
            <div
              className=" bg-gray-100 font-bold tracking-wider p-2 justify-left rounded text-sm flex items-left space-x-2"
              onClick={() => {
                router.push("/createShop");
                setIsOpen(false);
                setLoading(true);
              }}
            >
              <div className="flex" onClick={() => router.push("/createShop")}>
                <BsShop className="w-6 mr-2 h-6" />
                Create Shop
              </div>
              <div onClick={() => router.push("/createShop")} />
            </div>
          ) : (
            <div
              className=" bg-gray-100 font-bold tracking-wider p-2 justify-left rounded text-sm flex items-left space-x-2"
              onClick={() => {
                router.push("/users/shop");
                // setIsOpen(false);
                setLoading(true);
              }}
            >
              <div className="flex" onClick={() => router.push("/users/shop")}>
                <BsShop className="w-6 mr-2 h-6" />
                Manage Shop
              </div>
              <div onClick={() => router.push("/users/shop")} />
            </div>
          ))}
        <div
          className=" bg-gray-100 font-bold tracking-wider p-2 justify-left rounded text-sm flex items-left space-x-2"
          onClick={() => {
            router.push("/shops");
            setIsOpen(false);
            setLoading(true);
          }}
        >
          <BsShop className="w-6 mr-2 h-6" />
          Shops
          <div onClick={() => router.push("/shops")} />
        </div>
        {getIsLoggedIn && (
          <div className="w-2/5 mx-auto mb-6 pt-2">
            <div
              className="flex items-left justify-left space-x-1 px-2 py-1  bg-gray-100 font-bold tracking-wider rounded"
              onClick={() => {
                dispatch(isLoggedIn(false));
                localStorage.clear();
                router.push("/login");
                setIsOpen(false);
                toast.info("You have logged out successfully", {
                  position: "top-center",
                });
              }}
            >
              <RiLogoutBoxLine className="text-gray-700 mt-[3px] w-5 h-5" />
              <p className="text-sm capitalize py-1">Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
