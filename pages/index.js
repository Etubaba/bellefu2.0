import Head from "next/head";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { handleIndexApi } from "../features/bellefuSlice";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

import HeaderSearch from "../components/HeaderSearch";
import CategorySideBar from "../components/CategorySideBar";
// import axios from "axios";
import Body from "../components/Body";
import MobileCategoryBar from "../components/MobileCategorybar/MobileCategoryBar";
import MobileHeaderSearch from "../components/MobileHeaderSearch";
import { fetchData } from "../features/bellefuSlice";
import Slider from "../components/mainPageComponents/slider/Slider";
import { indexAPI } from "../constant";

export default function Home({ data }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const search = useSelector((state) => state.bellefu?.searchFilter);

  // if (data) {
  //   dispatch(fetchData(data));
  // }

  useEffect(() => {
    dispatch(fetchData(data));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Head>
        <title>Bellefu</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bellefu is a agricultural products site and connection between farmers and buyers that offers a wide. We are into food products, agricultural machinery,farmers"
        />

        <link
          rel="icon"
          href="https://www.linkpicture.com/q/bellefuApplogo.jpg"
        />
      </Head>
      {/* Overall container */}
      <main className="bg-bellefuBackground ">
        <div className="max-w-[95%] lg:max-w-[90%] mx-auto mt-28">
          {/* second nav bar */}
          <HeaderSearch
            dialet={data.defaultLanguage}
            state={data.countryStates}
            defaultCountry={data.defaultCountryName}
            languages={data.languages}
            countries={data.countries}
            location={data.defaultCountry}
          />

          {search === "" && (
            <div className="block  md:hidden lg:hidden mt-3">
              <Slider slider={data.slider} />
            </div>
          )}

          {/* mobile header search */}
          {/* <div className="md:hidden">
            <MobileHeaderSearch defaultCountry={data.defaultCountry} />
          </div> */}

          {/* main body */}
          <div className="flex flex-col lg:flex-row">
            {/* category side bar */}
            <div className=" hidden lg:inline w-[20%] h-auto rounded-md mr-3">
              <CategorySideBar categories={data.categories} />
            </div>
            {search === "" ? (
              <div className=" h-auto lg:hidden my-4 rounded-sm">
                <div>
                  <h3 className=" block lg:hidden font-bold text-[1rem] sm:text-[1rem] m-5 lg:text-[1.2rem]">
                    Search by categories
                  </h3>

                  <MobileCategoryBar categories={data.categories} />
                </div>
              </div>
            ) : null}
            {/* list of products & slider */}
            <div className="flex-1">
              <Body
                location={data.defaultCountry}
                currency={data.defaultCurrency}
                currencyCode={data.defaultCurrencyCode}
                productsData={data.products.data}
                slider={data.slider}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${indexAPI}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
