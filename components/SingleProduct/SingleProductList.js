import React from "react";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { BsHeart, BsSuitHeartFill } from "react-icons/bs";
import { MdOutlineMessage, MdCall } from "react-icons/md";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { login, msgScroll } from "../../features/bellefuSlice";
import { apiData, productImageUrl } from "../../constant";

const SingleProductList = ({ similarProductDetail }) => {
  const [fav2, setFav2] = useState(false);

  const isLoggedIn = useSelector(login);
  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);
  const favArr = useSelector((state) => state.bellefu?.favArr);
  const router = useRouter();
  const dispatch = useDispatch();

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
  const actionCall = () => {
    axios
      .post(`${apiData}monitor/user/action`, {
        userId: userId,
        action: "call",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFav = () => {
    axios
      .post(`${apiData}delete/favorite/webindex`, {
        productId: similarProductDetail.productId,
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
            `${similarProductDetail.title.substring(
              0,
              20
            )} removed from favorite product`,
            {
              position: "top-right",
            }
          );
        }
      });
  };

  const addFav = (e) => {
    e.stopPropagation();
    if (isLoggedIn) {
      axios
        .post(`${apiData}add/favorite`, {
          userId: userId,
          productId: similarProductDetail.productId,
        })
        .then((res) => {
          if (res.data.status) {
            setFav2(!fav2);
            toast.success(
              `${similarProductDetail.title.substring(
                0,
                20
              )} added to favourite`
            );
            actionFav();
          }
        });
    }
  };

  return (
    <div className="bg-bellefuWhite shadow-md mb-2 p-3 rounded-b-md">
      <img
        onClick={() =>
          router.push(`/product/${similarProductDetail.productId}`)
        }
        src={`${productImageUrl}${similarProductDetail?.images[0]}`}
        className="rounded-md w-full h-44 object-cover cursor-pointer"
      />
      <p className="capitalize text-medium">
        {similarProductDetail.title.length > 16
          ? similarProductDetail.title.substring(0, 16) + "..."
          : similarProductDetail.title}
      </p>
      <div className="flex items-center space-x-2">
        <MdLocationOn className="w-4 h-4 text-bellefuBlack1" />
        <div className="flex items-center space-x-1">
          <p className="text-bellefuBlack1 text-sm capitalize">
            {similarProductDetail.stateName},
          </p>
          <p className="text-bellefuBlack1 text-sm capitalize">
            {similarProductDetail.countryName}
          </p>
        </div>
      </div>
      <div className="flex items justify-between">
        <p className="text-bellefuGreen flex font-poppins font-semibold">
          <p className="mr-1">$</p>
          {similarProductDetail.price}
        </p>
        {fav2 || favArr?.includes(similarProductDetail.productId) ? (
          <div onClick={removeFav} className="cursor-pointer">
            <BsSuitHeartFill className="w-4 h-4 text-bellefuOrange" />
          </div>
        ) : (
          <div onClick={addFav} className="cursor-pointer">
            <BsHeart className="w-4 h-4 text-bellefuOrange" />
          </div>
        )}
      </div>
      {/* <div className="flex items-center mt-2 space-x-3">
        <button
          onClick={() => {
            if (isLoggedIn) {
              router.push(`/product/${similarProductDetail.productId}`);
              dispatch(msgScroll(1));
            } else {
              toast.error("Please login to contact seller", {
                position: "top-right",
              });
            }
          }}
          className="bg-bellefuOrange rounded-md w-full flex items-center justify-center py-4 cursor-pointer"
        >
          <MdOutlineMessage className="!text-white" />
        </button>
        <button
          onClick={() => {
            if (isLoggedIn) {
              window.open(`tel:${similarProductDetail.phone}`);
              actionCall();
            } else {
              toast.error("Please login to contact seller", {
                position: "top-right",
              });
            }
          }}
          className="bg-bellefuGreen  rounded-md w-full flex items-center justify-center py-4 cursor-pointer"
        >
          <MdCall className="text-white " />
        </button>
      </div> */}
    </div>
  );
};

export default SingleProductList;
