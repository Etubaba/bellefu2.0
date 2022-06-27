import React, { useState } from "react";
import { useSelector } from "react-redux";
import ShopComponents from "../../components/shopComponents/ShopComponents";
import MobileShopSideBar from "../../components/SingleProduct/MobileShopSidebar";
import Head from "next/head";
import ShopSideBar from "../../components/SingleProduct/ShopSideBar";
import Loader, { shopApi } from "../../constant";

const Shop = ({ shopProducts }) => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const shopDetails = shopProducts.data[0];
  const ifProduct = shopProducts.data.length;

  const totalPage = shopProducts.last_page;

  const pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  return (
    <>
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={`goods or services for ${shopDetails?.shopName}`}
        />
        <title>{shopDetails?.shopName}</title>
      </Head>
      <div className="flex max-w-[95%] lg:max-w-[90%] mx-auto mt-28">
        {ifProduct > 0 && <ShopSideBar userDetails={shopDetails} />}
        <div className="flex-1">
          <ShopComponents products={shopProducts} />
          {ifProduct > 0 && <MobileShopSideBar userDetails={shopDetails} />}
        </div>

        {ifProduct !== 0 && totalPage > 1 && (
          <div className="flex justify-center md:mb-0 mb-8 md:mt-10 mt-7 items-center w-full ">
            <button
              onClick={() => {
                if (page > 1) {
                  setPage((prev) => prev - 1);
                }
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

            {ifProduct === 32 && (
              <button
                onClick={() => {
                  if (page < totalPage) {
                    {
                      setPage((prev) => prev + 1);
                    }
                  }
                }}
                className="flex bg-bellefuGreen hover:bg-green-400 text-white px-1 md:px-4 md:py-2 rounded-md md:rounded-lg md:space-x-2 space-x-1 py-1"
              >
                <span> Next</span> <MdOutlineArrowForwardIos className="mt-1" />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Shop;

//server side fetching of the full product details
export async function getServerSideProps(context) {
  const { slug } = context.query;

  const requests = await fetch(`${shopApi}view/single/${slug}`).then((res) =>
    res.json()
  );

  return {
    props: {
      shopProducts: requests,
    },
  };
}
