import { CircularProgress } from "@mui/material";
import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { shopApi } from "../../constant";
import { favUpdated, login } from "../../features/bellefuSlice";

const ShopProductDescription = ({ productDetails }) => {
  const [wait, setWait] = useState(false);

  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);
  const currency = useSelector(
    (state) => state.bellefu?.indexData?.defaultCurrency
  );
  const isLoggedIn = useSelector(login);
  const dispatch = useDispatch();

  const addToCart = () => {
    setWait(true);
    if (isLoggedIn) {
      axios
        .post(`${shopApi}add/cart/item`, {
          productId: productDetails.productId,
          userId: userId,
        })
        .then((res) => {
          if (res.data.status) {
            setWait(false);
            toast.success(
              `${productDetails.title.substring(0, 20)} added to cart`
            );
            dispatch(favUpdated());
          }
        });
    } else {
      toast.info("Login to add to cart", { position: "bottom-left" });
    }
  };
  return (
    <div className="bg-bellefuWhite rounded-t-md">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bellefu is a agricultural products site,for organic farm products, and connection between farmers and buyers "
        />
        <title>{productDetails?.title}</title>
      </Head>
      {/* title section */}
      <div className="flex items-center justify-between lg:px-7 px-3">
        <p className="text-xl lg:text-3xl text-bellefuTitleBlack font-semibold">
          {productDetails?.title}
        </p>

        <button
          onClick={addToCart}
          className={
            wait
              ? "bg-bellefuOrange hover:bg-orange-500 text-white rounded-xl cursor-not-allowed flex py-1 px-8"
              : "bg-bellefuOrange cursor-pointer hover:bg-orange-500 text-white rounded-xl flex py-1 px-4"
          }
        >
          {wait ? (
            <div className="p-[2px]" translate="no">
              <CircularProgress size="1rem" sx={{ color: "white" }} />
            </div>
          ) : (
            <>
              <BsCart3 className=" text-lg mr-2 mt-1" />{" "}
              <span className="text-lg">Add to cart</span>
            </>
          )}
        </button>
      </div>
      <div className="border-b my-5" />
      <div className="flex text-2xl text-bellefuGreen ml-7 space-x-5">
        <strong>Price :</strong>
        <span className="flex">
          <p className="mr-1" dangerouslySetInnerHTML={{ __html: currency }} />
          {productDetails?.price}
        </span>
      </div>

      <div className="border-b my-5" />
      <p className="ml-7 mb-3 text-xl">Description :</p>
      <p className="ml-7 pb-7">{productDetails?.description}</p>
    </div>
  );
};

export default ShopProductDescription;
