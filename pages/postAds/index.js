import React from "react";
import Head from "next/head";
// import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/postAdsComponent/Layout";
import UnstyledSelectSimple1 from "../../components/postAdsComponent/CatInput";
import UnstyledSelectSimple2 from "../../components/postAdsComponent/SubCatInput";
import UnstyledSelectSimple3 from "../../components/postAdsComponent/CountrySelect";
import UnstyledSelectSimple4 from "../../components/postAdsComponent/State";
import UnstyledSelectSimple5 from "../../components/postAdsComponent/City";
import { useDispatch } from "react-redux";
import { handleLocationUpdate } from "../../features/bellefuSlice";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { webApi } from "../../constant";

function Index({ data1, data2 }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [subcat, setSubcat] = useState([]);
  const [checker, setChecker] = useState("");
  const [states, setStates] = useState([]);
  const [checker2, setChecker2] = useState("");
  const [lga, setLga] = useState([]);
  const [checker3, setChecker3] = useState("");
  const [address, setAddress] = useState("");
  const [symbolcatcher, setSymbolcatcher] = useState("");

  const handleCatching = (e, e2) => {
    console.log(e);
    console.log(e2);
    setSubcat(e);
    setChecker(e2);
  };
  const handleStateCatch = (e, e2, e3) => {
    console.log(e);
    console.log(e2);
    console.log(e3);
    setStates(e);
    setChecker2(e2);
    setSymbolcatcher(e3);
  };
  const handleLgacatch = (localgvt, e2) => {
    console.log(localgvt + "lga is here");
    console.log(e2);
    setLga(localgvt);
    setChecker3(e2);
  };

  const handleLocation = (e) => {
    setAddress(e.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (address !== "") {
      dispatch(handleLocationUpdate(address));
      router.push("/postAds/Details");
    } else {
      toast.error("All fields are required", {
        position: "top-center",
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
    <div>
      <Head>
        <title>Bellefu</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no,user-scalable=0;" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Overall container */}
      {loading ? (
        <div className=" shadow bg-bellefuWhite rounded-md  p-5">
          <div className="border  p-5 mt-7 ">
            <div>
              <form action="#" method="POST">
                <div className=" overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3  bg-white">
                        <label
                          for="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Category <strong className="text-red-500">*</strong>
                        </label>
                        <UnstyledSelectSimple1
                          category={data2}
                          subcatCatcher={handleCatching}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 ">
                        <label
                          for="last-name"
                          className="block  text-sm font-medium text-gray-700"
                        >
                          Sub-Category <strong className="text-red-500">*</strong>
                        </label>
                        <UnstyledSelectSimple2
                          subCategory={subcat}
                          checker={checker}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 ">
                        <label
                          for="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country <strong className="text-red-500">*</strong>
                        </label>
                        <UnstyledSelectSimple3
                          countryStuffs={data1}
                          catchState={handleStateCatch}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 ">
                        <label
                          for="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          State <strong className="text-red-500">*</strong>
                        </label>
                        <UnstyledSelectSimple4
                          countryStuffs={data1}
                          catchLgas={handleLgacatch}
                          states={states}
                          checker2={checker2}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 ">
                        <label
                          for="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Lga/City <strong className="text-red-500">*</strong>
                        </label>
                        <UnstyledSelectSimple5 lga={lga} checker3={checker3} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location <strong className="text-red-500">*</strong>
                        </label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          onChange={handleLocation}
                          className="  p-[7px] mt-4 bg-gray-200 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm  rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex justify-between">
                  <button
                    type="submit"
                    class="flex justify-center items-center w-[19vw] lg:w-[15vw] py-2 px-4  shadow-sm text-sm font-medium rounded-md text-[black] bg-bellefuWhite  border hover:bg-[#e4e4e4] focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Cancel
                  </button>
                  {/* <Link href="/postAds/Details"> */}
                  <button
                    // disabled={address===""?true:false}
                    type="submit"
                    onClick={handleSubmit}
                    class="flex justify-center items-center w-[19vw] lg:w-[15vw] py-2 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  >
                    Continue
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
export async function getServerSideProps() {
  const [data1Res, data2Res] = await Promise.all([
    fetch(`${webApi}get/postadd`),
    fetch(`${webApi}get/web/index`),
  ]);

  const [data1, data2] = await Promise.all([data1Res.json(), data2Res.json()]);
  //  console.log(data);
  return {
    props: {
      data1,
      data2,
    },
  };
}



Index.Layout = Layout;
export default Index;
