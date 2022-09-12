import Body from "../components/ecommerce/Body";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader, { indexAPI, shopApi } from "../constant";
import Slider from "../components/mainPageComponents/slider/Slider";
import HeaderSearch from "../components/HeaderSearch";
import MobileCategoryBar from "../components/MobileCategorybar/MobileCategoryBar";
import CategorySideBar from "../components/CategorySideBar";

const Shops = ({ shops }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(shops.data.last_page);
  const [newShop, setNewShop] = useState([]);
  const [currData, setCurrData] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const getCurrData = async () => {
      await axios
        .get(indexAPI)
        .then((res) => {
          setCurrData(res.data);
        })
        .catch((error) => {
          console.log(`Error fetching index data: ${error.message}`);
        });
    };

    getCurrData();
  }, []);

  useEffect(() => {
    if (page > 1) {
      axios.get(`${shopApi}view?page=${page}`).then((res) => {
        setTotalPage(res.data.data.last_page);
        setNewShop(res.data.data.data);
      });
    }
  }, [page]);

  const shop = newShop;

  const pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <Head>
        <title>Bellefu Digital Agro Connect</title>
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
      <main className="bg-bellefuBackground ">
        <div className="max-w-[95%] lg:max-w-[90%] mx-auto mt-28">
          {/* second nav bar */}
          <HeaderSearch
            dialet={currData.defaultLanguage}
            state={currData.countryStates}
            defaultCountry={currData.defaultCountryName}
            languages={currData.languages}
            countries={currData.countries}
            location={currData.defaultCountry}
          />

          {search === "" && (
            <div className="block  md:hidden lg:hidden mt-3">
              <Slider slider={currData.slider} />
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
              <CategorySideBar categories={currData.categories} />
            </div>
            {search === "" ? (
              <div className=" h-auto lg:hidden my-4 rounded-sm">
                <div>
                  <h3 className=" block lg:hidden font-bold text-[1rem] sm:text-[1rem] m-5 lg:text-[1.2rem]">
                    Search by categories
                  </h3>

                  <MobileCategoryBar categories={currData.categories} />
                </div>
              </div>
            ) : null}
            {/* list of products & slider */}
            <div className="flex-1">
              {/* <Body
                location={
                  isLocationReady
                    ? currData.defaultCountry
                    : data.defaultCountry
                }
                currency={
                  isLocationReady
                    ? currData.defaultCurrency
                    : data.defaultCurrency
                }
                currencyCode={
                  isLocationReady
                    ? currData.defaultCurrencyCode
                    : data.defaultCurrencyCode
                }
                productsData={
                  isLocationReady ? currData.products.data : data.products.data
                }
                slider={isLocationReady ? currData.slider : data.slider}
              /> */}
              <div className="px-2">
                <Body shops={shop} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {shop.length !== 0 && totalPage > 1 && (
        <div className="flex justify-center md:mb-0 mb-8 md:mt-10 mt-7 items-center w-full ">
          <button
            onClick={() => {
              if (page > 1) setPage((prev) => prev - 1);
            }}
            className="flex bg-bellefuOrange hover:bg-orange-500 text-white px-1 md:px-4 md:py-2 rounded-md md:rounded-lg md:space-x-2 space-x-1 py-1"
          >
            <MdOutlineArrowBackIosNew className="mt-1" /> <span> Prev</span>
          </button>

          <span className="justify-center items-center mx-2 md:mx-4 px-2 md:px-4 flex space-x-2 md:space-x-6">
            {pageNumber?.map((item, index) => (
              <p
                onClick={() => setPage(item)}
                className={
                  page === item
                    ? "bg-bellefuGreen p-1 px-2 rounded-full text-white"
                    : "cursor-pointer"
                }
                key={index}
              >
                {item}
              </p>
            ))}
          </span>

          {/* {shop.length === 32 && ( */}
          <button
            onClick={() => {
              if (page < totalPage) setPage((prev) => prev + 1);
            }}
            className="flex bg-bellefuGreen hover:bg-[#538b09] text-white px-1 md:px-4 md:py-2 rounded-md md:rounded-lg md:space-x-2 space-x-1 py-1"
          >
            <span> Next</span> <MdOutlineArrowForwardIos className="mt-1" />
          </button>
          {/* // )} */}
        </div>
      )}
    </div>
  );
};

export default Shops;

//get shop data from api
export async function getServerSideProps() {
  const res = await fetch(`${shopApi}list/goods`);
  // const res = await fetch(`${shopApi}view`);
  const shops = await res.json();

  return {
    props: {
      shops,
    },
  };
}
