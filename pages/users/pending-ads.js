import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { MdPending } from "react-icons/md";
import MyAds from "../../components/layoutComponents/adsComponents/MyAds";
import { apiData } from "../../constant";
import { useSelector } from "react-redux";
import axios from "axios";

const pendingads = () => {
  const [pend, setPend] = useState([]);

  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);

  const test = 1285;
  const favCheck = useSelector((state) => state.bellefu?.favLoad);

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `${apiData}list/user/product/${userId}/pending`
      );
      setPend(res.data.data.data);
    };

    getProduct();
  }, [favCheck]);

  return (
    <div className=" rounded-lg mt-2 lg:mt-5 bg-bellefuWhite h-auto w-auto pb-2">
      <div className="text-sm lg:text-xl ml-1 lg:ml-4 self p-2">
        Pending Ads
      </div>
      <hr />

      {pend.length === 0 ? (
        <div className="h-full px-2 ">
          <div className="border mx-auto my-10 rounded-xl w-full lg:w-7/12 h-11/12 ">
            <div className="flex flex-col justify-center mt-24 mb-24 items-center">
              <MdPending className="text-5xl lg:text-6xl mb-5 text-gray-600" />
              <p className="text-sm capitalize lg:text-lg text-gray-600 text-center px-2">
                You do not have any pending products
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-bellefuWhite mt-5 rounded-b-md overflow-y-scroll h-screen">
          <MyAds products={pend} />
        </div>
      )}
    </div>
  );
};

pendingads.Layout = Layout;

export default pendingads;
