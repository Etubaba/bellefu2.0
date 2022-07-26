import React, { useState, useEffect } from "react";
import { FcShop } from "react-icons/fc";
import Layout from "../../components/Layout";
import PublishedAds from "../../components/layoutComponents/publishAds/PublishedAds";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiData } from "../../constant";
import { toast } from "react-toastify";
import { profileDetails } from "../../features/bellefuSlice";
import { useRouter } from "next/router";

const Published = () => {
  const [pend, setPend] = useState(true);
  const [approvedProduct, setApprovedProduct] = useState([]);

  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);
  const verify = useSelector((state) => state.bellefu?.verificationStatus);
  const profile = useSelector(profileDetails);
  const router = useRouter();

  const reload = useSelector((state) => state.bellefu?.favLoad);
  const test = 1285;

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `${apiData}list/user/product/${userId}/approved`
      );
      setApprovedProduct(res.data.data.data);
    };

    getProduct();
  }, [reload]);

  console.log("ads", approvedProduct);
  const toPostAds = () => {
    if (verify.phone && profile.avatar !== "useravatar.jpg") {
      router.push("/postAds");
    } else if (!verify.phone) {
      toast.info("Verify your phone number to post Ads", {
        position: "top-right",
      });
      router.push("/users/verify-account");
    } else if (profile.avatar === "useravatar.jpg") {
      toast.info("Update your profile details to post  Ads", {
        position: "top-right",
      });
      router.push("/users/profile");
    }
  };

  return (
    <div className="rounded-lg mt-5 bg-bellefuWhite h-auto w-auto pb-2">
      <div className="text-sm lg:text-xl ml-1 lg:ml-4 self p-2">
        Published Ads
      </div>
      <hr />

      {approvedProduct.length === 0 ? (
        <div className="h-full px-2 lg:px-0 ">
          <div className="border mx-auto mt-2 lg:my-5 rounded-xl w-full lg:w-7/12 h-11/12 ">
            <div className="flex flex-col justify-center mt-24 mb-24 items-center">
              <FcShop className="text-7xl lg:text-9xl mb-5 text-gray-600" />
              <p className="text-sm capitalize lg:text-lg text-gray-600 px-2 text-center">
                You do not have any published product yet
              </p>

              <button
                onClick={toPostAds}
                className="py-1 lg:py-3 hover:bg-orange-200 mt-16 px-8 lg:px-12 rounded-lg bg-bellefuOrange text-white text-sm lg:text-lg"
              >
                Make your first post
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-bellefuWhite mt-5 rounded-b-md">
          <PublishedAds product={approvedProduct} />
        </div>
      )}
    </div>
  );
};

Published.Layout = Layout;

export default Published;
