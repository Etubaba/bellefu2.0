import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { BsClock } from "react-icons/bs";
import ExpiredAds from "../../components/layoutComponents/expiredComponents/ExpiredAds";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiData } from "../../constant";

const expiredads = () => {
  const [exp, setExp] = useState([]);

  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);

  const test = 1285;

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `${apiData}list/user/product/${userId}/expired`
      );
      setExp(res.data.data.data);
    };

    getProduct();
  }, []);

  return (
    <div className="rounded-lg mt-2 lg:mt-5 bg-bellefuWhite h-auto w-auto pb-2">
      <div className="text-sm lg:text-xl ml-1 lg:ml-4 self p-2">
        Expired Ads
      </div>
      <hr />

      {exp.length === 0 ? (
        <div className="h-full px-2">
          <div className="border mx-auto my-5 lg:my-10 rounded-xl w-full lg:w-7/12 h-11/12 ">
            <div className="flex flex-col justify-center mt-24 mb-24 items-center">
              <BsClock className="text-5xl lg:text-6xl mb-5 text-gray-600" />
              <p className="text-sm text-center capitalize lg:text-lg text-gray-600">
                You do not have any expired product
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-bellefuWhite mt-5 rounded-b-md overflow-y-scroll h-screen">
          <ExpiredAds product={exp} />
        </div>
      )}
    </div>
  );
};

expiredads.Layout = Layout;

export default expiredads;
