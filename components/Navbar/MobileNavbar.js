import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IoMdNotifications, IoMdAddCircleOutline } from "react-icons/io";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { MdShoppingCart } from "react-icons/md";
import { isLoggedIn, login, profileDetails } from "../../features/bellefuSlice";
import axios from "axios";
import Loader, { apiData, shopApi, UserAvataUrl } from "../../constant";
import { FcShop } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";

const MobileNavbar = ({ setLoading, isOpen, setIsOpen, username, msgRead }) => {
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

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bg-[#222222] w-72 space-y-3 px-2 pt-2 pb-5 top-0 -left-1 h-[100vh] font-semibold text-white lg:hidden shadow-md animate-slide-in"
    >
      <div
        className="-mb-2 flex items-center justify-end"
        onClick={() => setIsOpen(false)}
      >
        {isOpen && <AiOutlineClose className="w-6 h-6" />}
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
                <span className="text-white text-base text-center font-semibold">
                  {unseen}
                </span>
              </p>
            ) : null}
          </div>
          <div className="w-3/5 mx-auto flex justify-between">
            <p className="text-lg font-bold tracking-wide ">
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
                      ? "text-white w-6 h-6 animate-shake"
                      : "text-white w-6 h-6"
                  }
                />

                {cartCount.length !== 0 ? (
                  <p className=" bg-bellefuOrange -top-2 left-4 h-4 w-4 absolute flex items-center justify-center rounded-full">
                    <span className="text-white text-[10px] text-center ">
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
                    ? "text-white w-6 h-6 animate-shake"
                    : "text-white w-6 h-6"
                }
              />

              {unread !== 0 ? (
                <p className=" bg-orange-400 -top-1 left-3 h-4 w-4 absolute flex items-center justify-center rounded-full">
                  <span className="text-white text-sm text-center ">
                    {unread}
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        </>
      )}

      {/* end of avatar for mobile */}

      <div className="space-y-4 text-white">
        {getIsLoggedIn && (
          <div
            className=" bg-[#343a40] font-bold tracking-wider p-2 text-center rounded text-sm"
            onClick={() => {
              router.push("/users");
              setIsOpen(false);
              setLoading(true);
            }}
          >
            Dashboard
          </div>
        )}

        <a className="" href="https://webinar.bellefu.com/" target="_blank">
          <p
            className="bg-[#343a40] my-4 font-bold tracking-wider p-2 text-center rounded text-sm"
            onClick={() => setIsOpen(false)}
          >
            Webinar
          </p>{" "}
        </a>
        <a href="https://radio.bellefu.com/" target="_blank">
          {" "}
          <p
            className=" bg-[#343a40] mb-4 font-bold tracking-wider p-2 text-center rounded text-sm"
            onClick={() => setIsOpen(false)}
          >
            Bellefu Radio
          </p>
        </a>

        <a href="https://blog.bellefu.com/" target="_blank">
          <p
            className="bg-[#343a40] font-bold tracking-wider p-2 text-center rounded text-sm"
            onClick={() => setIsOpen(false)}
          >
            Blog
          </p>{" "}
        </a>
        {!getIsLoggedIn && (
          <>
            <p
              className="bg-[#343a40] font-bold tracking-wider p-2 text-center rounded text-sm"
              onClick={() => {
                router.push("/login"), setIsOpen(false), setLoading(true);
              }}
            >
              Login
            </p>
            <p
              className=" bg-[#343a40] font-bold tracking-wider p-2 text-center rounded text-sm"
              onClick={() => (
                router.push("/register"), setIsOpen(false), setLoading(true)
              )}
            >
              Register
            </p>
          </>
        )}
        {getIsLoggedIn &&
          (username?.shopId === null || username?.shopId === undefined ? (
            <div
              className=" bg-[#343a40] font-bold tracking-wider p-2 justify-center rounded text-sm flex items-center space-x-2"
              onClick={() => {
                router.push("/createShop");
                setIsOpen(false);
                setLoading(true);
              }}
            >
              <div className="flex" onClick={() => router.push("/createShop")}>
                <FcShop className="w-6 h-6" />
                Create Shop
              </div>
              <div onClick={() => router.push("/createShop")} />
            </div>
          ) : (
            <div
              className=" bg-[#343a40] font-bold tracking-wider p-2 justify-center rounded text-sm flex items-center space-x-2"
              onClick={() => {
                router.push("/users/shop");
                // setIsOpen(false);
                setLoading(true);
              }}
            >
              <div className="flex" onClick={() => router.push("/users/shop")}>
                <FcShop className="w-6 h-6" />
                Manage Shop
              </div>
              <div onClick={() => router.push("/users/shop")} />
            </div>
          ))}

        <div
          className=" bg-[#343a40] font-bold tracking-wider p-2 justify-center rounded text-sm flex items-center space-x-2"
          onClick={() => {
            router.push("/shops");
            setIsOpen(false);
            setLoading(true);
          }}
        >
          <FcShop className="w-6 h-6" />
          Shops
          <div onClick={() => router.push("/shops")} />
        </div>

        {getIsLoggedIn && (
          <div className="w-2/5 mx-auto pt-2">
            <div
              className="flex items-center justify-center space-x-1 px-2 py-1  bg-[#343a40] font-bold tracking-wider rounded"
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
              <RiLogoutBoxFill className="text-white w-5 h-5" />
              <p className="text-sm capitalize py-1">Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;
