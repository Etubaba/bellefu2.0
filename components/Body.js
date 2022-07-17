import React from "react";
import Slider from "./mainPageComponents/slider/Slider";
import ProductComponent from "./mainPageComponents/ProductComponent";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import Head from "next/head";

const Body = ({ productsData, slider, currency, location, currencyCode }) => {
  const products = productsData;
  const [loading, setLoading] = useState(false);

  const search = useSelector((state) => state.bellefu?.searchFilter);
  const stateSelected = useSelector((state) => state.bellefu?.stateSelected);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  // console.log("The products here :", products);

  return (
    <div className="">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bellefu is a agricultural products site and connection between farmers and buyers that offers a wide"
        />
        <title>Bellefu</title>
      </Head>

      {stateSelected === null && search === "" ? (
        <div className="mb-2">
          {loading ? (
            <div className="hidden md:block lg:block">
              <Slider slider={slider} />
            </div>
          ) : (
            <Skeleton
              className="rounded my-3"
              variant="rectangular"
              animation="wave"
              width={"100%"}
              height={320}
            />
          )}
        </div>
      ) : null}
      {/* product component session */}

      <ProductComponent
        currency={currency}
        currencyCode={currencyCode}
        location={location}
        products={products}
      />
    </div>
  );
};

export default Body;
