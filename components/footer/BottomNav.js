import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { login, profileDetails } from "../../features/bellefuSlice";
import { toast } from "react-toastify";
import Loader from "../../constant";

const BottomNav = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isLoggedIn = useSelector(login);
  const username = useSelector(profileDetails);
  const verify = useSelector((state) => state.bellefu?.verificationStatus);

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }
  const toPostAds = () => {
    if (isLoggedIn && verify?.phone && username?.avatar !== "useravatar.jpg") {
      router.push("/postAds");
      setLoading(true);
    } else if (!isLoggedIn) {
      toast.info("Login to post  Ads", {
        position: "top-right",
      });
      router.push("/login");
    } else if (!verify.phone) {
      toast.info("Verify your phone number to post Ads", {
        position: "top-right",
      });
      router.push("/users/verify-account");
    } else if (username.avatar === "useravatar.jpg") {
      toast.info("Update your profile details to post  Ads", {
        position: "top-right",
      });
      router.push("/users/profile");
      setLoading(true);
    }
  };

  const handlefav = () => {
    if (isLoggedIn) {
      router.push("/users/favourite-items");
      setLoading(true);
    } else {
      toast.error("You need to login first");
      router.push("/login");
    }
  };
  const handleMsg = () => {
    if (isLoggedIn) {
      router.push("/users/messages");
      setLoading(true);
    } else {
      toast.error("You need to login first");
      router.push("/login");
    }
  };
  const handleProfile = () => {
    if (isLoggedIn) {
      router.push("/users/profile");
      setLoading(true);
    } else {
      toast.error("You need to login first");
      router.push("/login");
    }
  };

  return (
    <div className="lg:hidden fixed z-[1000] bottom-0  bg-bellefuGreen w-full h-16 px-7 p-3 justify-center items-center flex  ">
      <div className="flex space-x-12 md:space-x-24 ">
        <AiFillHome
          className="text-2xl text-white"
          onClick={() => {
            router.push("/");
            window.location.reload();
          }}
        />
        <FaHeart className="text-white text-2xl" onClick={handlefav} />
      </div>
      {loading && <Loader isLoading={loading} />}
      <div className="relative flex -mt-4 justify-center items-center w-screen">
        <div
          className="h-12 w-24 bg-bellefuBackground 
                                   rounded-bl-full rounded-br-full "
        >
          <div
            onClick={toPostAds}
            className="w-[4.3rem] h-[4.3rem] shadow-lg -mt-8 mx-auto flex text-center justify-center leading-tight font-bold items-center text-base rounded-full bg-bellefuOrange text-semibold text-white"
          >
            {" "}
            Post
            <br /> Ads{" "}
          </div>
        </div>
      </div>

      <div className="flex space-x-12 md:space-x-24">
        <MdMessage className="text-white text-2xl" onClick={handleMsg} />
        <BsPersonFill className="text-white text-2xl" onClick={handleProfile} />
      </div>
    </div>
  );
};

export default BottomNav;
