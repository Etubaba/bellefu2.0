import React, { useState } from "react";
import Layout from "../../components/Layout";
import { MdPending } from "react-icons/md"
import MyAds from "../../components/layoutComponents/adsComponents/MyAds";;






const pendingads = () => {
  const [pend, setPend] = useState(true)
  return (
    <div className="ml-6 rounded-lg mt-5 bg-bellefuWhite h-auto w-auto pb-2">

      <div className='text-xl ml-4 self p-2'>
        Pending Ads
      </div>
      <hr />

      {!pend ? <div className="h-full ">
        <div className="border mx-auto my-10  rounded-xl    w-7/12 h-11/12 ">
          <div className="flex flex-col justify-center mt-24 mb-24 items-center">
            <MdPending className="text-4xl mb-5 text-gray-600" />
            <p className="text-lg text-gray-600">
              You do not have any pending products
            </p>
          </div>
        </div>
      </div> : (
        <div className='bg-bellefuWhite mt-5 rounded-b-md overflow-y-scroll h-screen'>

          <MyAds />


        </div>
      )}


    </div>



  )
};

pendingads.Layout = Layout;

export default pendingads;
