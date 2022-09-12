import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";
import { BsHeart, BsSuitHeartFill, BsCart3 } from "react-icons/bs";
import { MdOutlineMessage, MdCall } from "react-icons/md";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Loader, { apiData, productImageUrl, shopApi } from "../../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { login, shop, favUpdated } from "../../features/bellefuSlice";
import { useDispatch } from "react-redux";

const ShopComponent = ({ product }) => {
  const [fav2, setFav2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wait, setWait] = useState(false);
  const router = useRouter();
  const favArr = useSelector((state) => state.bellefu?.favArr);
  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);
  const currency = useSelector(
    (state) => state.bellefu?.indexData?.defaultCurrency
  );
  const isLoggedIn = useSelector(login);
  const dispatch = useDispatch();

  // console.log("user", currency);

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  //action for favourite and call
  const actionFav = () => {
    axios
      .post(`${apiData}monitor/user/action`, {
        userId: userId,
        action: "favorite",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addFav = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      axios
        .post(`${apiData}add/favorite`, {
          userId: userId,
          productId: product.productId,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            setFav2(!fav2);
            toast.success(
              `${product.title.substring(0, 20)} added to favourite`
            );
            actionFav();
          }
        });
    } else {
      toast.info("Login to add to favourite", { position: "top-right" });
    }
  };

  const removeFav = () => {
    axios
      .post(`${apiData}delete/favorite/webindex`, {
        productId: product.productId,
        userId: userId,
      })
      .then((res) => {
        if (res.data.status) {
          setFav2(!fav2);
          // const cleanArr = fav.filter(
          //   (items) => items !== product.productId
          // );
          // setClean(cleanArr);
          toast.error(
            `${product.title.substring(0, 20)} removed from favorite product`,
            {
              position: "top-right",
            }
          );
        }
      });
  };

  const viewDetails = () => {
    dispatch(shop(`${product?.slug}/${product?.productSlug}`));
    router.push(`/shopproduct/product`);
    setLoading(true);
  };

  const addtocart = () => {
    setWait(true);
    if (isLoggedIn) {
      axios
        .post(`${shopApi}add/cart/item`, {
          productId: product.productId,
          userId: userId,
        })
        .then((res) => {
          if (res.data.status) {
            setWait(false);
            toast.success(`${product.title.substring(0, 20)} added to cart`, {
              position: "bottom-left",
            });

            dispatch(favUpdated());
          }
        });
    } else {
      toast.info("Login to add to cart", { position: "bottom-left" });
    }
  };

  return (
    <div className="bg-bellefuWhite p-3 rounded-b-md">
      <img
        onClick={viewDetails}
        src={`${productImageUrl}${product?.images[0]}`}
        className="rounded-md w-full h-40 object-cover hover:opacity-50"
        alt={product.title}
      />
      {loading && <Loader isLoading={loading} />}
      <p className="capitalize text-base">{product.title.substring(0, 15)}</p>
      <div className="flex items-center space-x-2">
        <MdLocationOn className="w-4 h-4 text-bellefuBlack1" />
        <div className="flex items-center space-x-1">
          <p className="text-bellefuBlack1 text-sm capitalize">
            {product.stateName},
          </p>
          <p className="text-bellefuBlack1 text-sm capitalize">
            {product.countryName}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-bellefuGreen flex font-poppins font-semibold">
          <p className="mr-1" dangerouslySetInnerHTML={{ __html: currency }} />{" "}
          {product.price}
        </span>
        {fav2 || favArr?.includes(product.productId) ? (
          <div onClick={removeFav} className="cursor-pointer">
            <BsSuitHeartFill className="w-4 h-4 text-bellefuOrange" />
          </div>
        ) : (
          <div onClick={addFav} className="cursor-pointer">
            <BsHeart className="w-4 h-4 text-bellefuOrange" />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-3 mt-2">
        <button
          onClick={addtocart}
          className="bg-bellefuOrange hover:bg-orange-300 text-white rounded-md w-full flex items-center justify-center py-2"
        >
          {wait ? (
            <div className="p-[2px]" translate="no">
              <CircularProgress size="1rem" color="success" />
            </div>
          ) : (
            <>
              <BsCart3 className="mr-2" /> <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ShopComponent;
