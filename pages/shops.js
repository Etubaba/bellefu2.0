import Body from "../components/ecommerce/Body";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader, { shopApi } from "../constant";

const Shops = ({ shops }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(shops.data.last_page);
  const [newShop, setNewShop] = useState([]);

  useEffect(() => {
    if (page > 1) {
      axios.get(`${shopApi}view?page=${page}`).then((res) => {
        setTotalPage(res.data.data.last_page);
        setNewShop(res.data.data.data);
      });
    }
  }, [page]);

  console.log("product", newShop);

  const shop = page === 1 ? shops.data.data : newShop;

  const pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <Head>
        <title>Bellefu Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-2">
        <Body shops={shop} />
      </div>

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
  const res = await fetch(`${shopApi}view`);
  const shops = await res.json();

  return {
    props: {
      shops,
    },
  };
}
