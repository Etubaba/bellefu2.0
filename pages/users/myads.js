import  { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import MyAds from "../../components/layoutComponents/adsComponents/MyAds";
import ExpiredAds from "../../components/layoutComponents/expiredComponents/ExpiredAds";
import PublishedAds from "../../components/layoutComponents/publishAds/PublishedAds";
import MyAdsHeader from "../../components/layoutComponents/adsComponents/MyAdsHeader";
import axios from "axios";
import { apiData } from "../../constant";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";



const Ads = () => {
  const [published, setPublished] = useState([]);
  const [pend, setPend] = useState([]);
  const [expired, setExpired] = useState([]);
const [loading, setLoading] = useState(false);

  const router = useRouter();
  const reload=useSelector((state)=>state.bellefu?.favLoad);

  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);
  const test = 1285;

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `${apiData}list/user/product/${userId}/approved`
      );
      setPublished(res.data.data.data);
    };

    getProduct();
  }, [reload]);

  console.log(published);

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `${apiData}list/user/product/${userId}/pending`
      );
      setPend(res.data.data.data);
    };

    getProduct();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(
        `${apiData}list/user/product/${userId}/expired`
      );
      setExpired(res.data.data.data);
    };

    getProduct();
  }, []);

  const combined = [...published, ...pend, ...expired];

  const all = combined.length > 4 ? combined.slice(0, 4) : combined;

  const pending=pend.length>4?pend.slice(0,4):pend;
  const publish=published.length>4?published.slice(0,4):published;
  const expire=expired.length>4?expired.slice(0,4):expired;




  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="lg:mt-5 mt-2">
{   loading?   <MyAdsHeader />:<Skeleton
          className="rounded mt-6 "
          variant="rectangular"
          animation="wave"
          width={"100%"}
          height={30}
        />
}      <div className=" bg-bellefuWhite divide-y space-y-1 lg:space-y-2 mt-1 rounded-b-md">
        <div className="">
          <div className="flex items-center px-2 lg:px-4 justify-between pt-3">
            <p className="text-sm lg:text-xl text-bellefuTitleBlack font-semibold tracking-wider">
              All Ads
            </p>
            <p className="text-bellefuOrange text-xs font-medium tracking-wider">
              View All
            </p>
          </div>
          <ExpiredAds product={all} />
        </div>
        <div className="">
          <div className="flex items-center px-2 lg:px-4 justify-between pt-3">
            <p className="text-sm lg:text-xl text-bellefuTitleBlack font-semibold tracking-wider">
              Published Ads
            </p>
            <p
              onClick={() => router.push("/users/published")}
              className="text-bellefuOrange hover:text-orange-300 text-xs font-medium tracking-wider"
            >
              View All
            </p>
          </div>
          <PublishedAds product={publish} />
        </div>
        <div className="">
          <div className="flex items-center px-2 lg:px-4 justify-between pt-3">
            <p className="text-sm lg:text-xl text-bellefuTitleBlack font-semibold tracking-wider">
              Pending Ads
            </p>
            <p
              onClick={() => router.push("/users/pending-ads")}
              className="text-bellefuOrange hover:text-orange-300 text-xs font-medium tracking-wider"
            >
              View All
            </p>
          </div>
          <MyAds products={pending} />
        </div>
        <div className="">
          <div className="flex items-center px-2 lg:px-4 justify-between pt-3">
            <p className="text-sm lg:text-xl text-bellefuTitleBlack font-semibold tracking-wider">
              Expired Ads
            </p>
            <p
              onClick={() => router.push("/users/expired-ads")}
              className="text-bellefuOrange hover:text-orange-300 text-xs font-medium tracking-wider"
            >
              View All
            </p>
          </div>
          <ExpiredAds products={expire} />
        </div>
      </div>
    </div>
  );
};

Ads.Layout = Layout;
export default Ads;
