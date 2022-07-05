import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Modal, Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { MdLocationOn, MdOutlineCancel } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { BsHeart, BsSuitHeartFill } from "react-icons/bs";
import { CgArrowsExchange } from "react-icons/cg";
import { MdOutlineMessage, MdCall } from "react-icons/md";
import { useRouter } from "next/router";
import axios from "axios";
import { apiData, productImageUrl } from "../../constant";
import { login, msgScroll } from "../../features/bellefuSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import Loader from "../../constant";

const ProductList = ({
  product,
  currency,
  currencyCode,
  fav,
  favdata,
  view,
}) => {
  const [newPrice, setNewPrice] = useState(null);
  const [converter, setConverter] = useState(false);
  const [fav2, setFav2] = useState(false);
  const [productId, setProductId] = useState([]);
  const [open, setOpen] = useState(false);
  const [clean, setClean] = useState(fav);
  const [loading, setLoading] = useState(false)

  const router = useRouter();
  const dispatch = useDispatch();
  const getIsLoggedIn = useSelector(login);





  if (loading) {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  const handleMessage = () => {
    if (getIsLoggedIn) {
      router.push(`/product/${product.productId}`);
      setLoading(true)
      dispatch(msgScroll(1));
    } else {
      // router.push("/login");
      setOpen(true);
      toast.info("Please login to contact seller", { position: "top-center" });
    }
  };



  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);

  // console.log(productId)

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 250,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 2,
  };



  const actionFav = () => {
    axios.post(`${apiData}monitor/user/action`, {
      userId: userId,
      action: 'favorite',
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const actionCall = () => {
    axios.post(`${apiData}monitor/user/action`, {
      userId: userId,
      action: 'call',
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }





  const handleCall = () => {
    if (getIsLoggedIn) {
      window.open(`tel:${product.phone}`);
      actionCall();

    } else {
      setOpen(true);
      toast.info("please login to contact seller", { position: "top-center" });
    }
  };






  return (
    <div className="bg-bellefuWhite p-2 rounded-b-md">
      {loading && <Loader isLoading={loading} />}
      {product?.inStock ? (
        <>
          <div onClick={() => { router.push(`/product/${product.productId}`); setLoading(true) }}>
            <img
              src={`${productImageUrl}${product?.images[0]}`}
              className="rounded-md w-full h-44 hover:opacity-50 object-cover cursor-pointer"
            />
          </div>
          <p className="capitalize text-sm">
            {view
               ?product.title.length>14? product.title.substring(0, 14) + "..":product.title
              : product.title.substring(0, 20) + ".."}
          </p>
          <div className="flex items-center space-x-1">
            <MdLocationOn className="w-4 h-4 text-bellefuBlack1" />
            <div className="flex items-center space-x-1">
              <p className="text-bellefuBlack1 text-sm md:text-base capitalize">
                {view&&product.stateName.length>5?product.stateName.substring(0, 8)+"..":product.stateName}
              </p>
              <p className="text-bellefuBlack1 text-sm md:text-base capitalize">
                {!view
                  ? product.countryName
                  : product.countryName.length>10? product.countryName.substring(0, 10) + "..":product.countryName}
              </p>
            </div>
          </div>
          <div className="flex items items-center justify-between">
            <p
              className="text-bellefuGreen flex font-poppins font-semibold"
              translate="no"
            >
              {product.currency_code && !converter ? (
                <p
                  className="mr-1"
                  dangerouslySetInnerHTML={{ __html: product.currencySymbol }}
                />
              ) : (
                <p
                  className="mr-1"
                  dangerouslySetInnerHTML={{ __html: currency }}
                />
              )}

              {!converter ? (
                (product.price).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'usd'
                }).slice(1)
              ) : newPrice === null ? (
                <div className="p-[2px]" translate="no">
                  <CircularProgress size="1rem" color="success" />
                </div>
              ) : (

                (newPrice).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'usd'
                }).slice(1)

              )}
              {product.currency_code ? (
                <span
                  translate="no"
                  onClick={(e) => {
                    e.stopPropagation();
                    axios
                      .post(`${apiData}convert/currency`, {
                        amount: product.price,
                        to: currencyCode,
                        from: product.currency_code,
                      })
                      .then((res) => {
                        setNewPrice(res.data.data.result);
                      });

                    setConverter(true);
                  }}
                  className="ml-5"
                >
                  <Tooltip title="Convert">
                    <CgArrowsExchange className="text-2xl" />
                  </Tooltip>
                </span>
              ) : null}
            </p>
            {fav2 || (fav?.includes(product.productId) && getIsLoggedIn) ? (
              <span
                onClick={(e) => {
                  axios
                    .post(`${apiData}delete/favorite/webindex`, {
                      productId: product.productId,
                      userId: userId,
                    })
                    .then((res) => {
                      if (res.data.status) {
                        setFav2(!fav2);
                        const cleanArr = fav.filter(
                          (items) => items !== product.productId
                        );
                        setClean(cleanArr);
                        toast.error(
                          `${product.title.substring(
                            0,
                            20
                          )} removed from favorite product`,
                          {
                            position: "top-right",
                          }
                        );
                      }
                    });
                }}
              >
                <BsSuitHeartFill className="w-4 h-4 text-bellefuOrange cursor-pointer" />
              </span>
            ) : (
              <BsHeart
                onClick={(e) => {
                  e.stopPropagation();
                  if (getIsLoggedIn) {
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
                            `${product.title.substring(
                              0,
                              20
                            )} added to favourite`
                          );
                          actionFav()
                        }
                      });
                  } else {
                    toast.error("Login to add favorite product");
                    setOpen(true);
                  }
                }}
                className="w-4 h-4 text-bellefuOrange cursor-pointer"
              />
            )}
          </div>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          // sx={{ opacity: 0.5 }}
          >
            <Box sx={style}>
              {/* <div className="flex flex-col items-center justify-center mx-auto mt-10 translate-y-1/2 translate-x-1/2  rounded-lg shadow-md p-10 h-[300px]   w-[410px] md:w-[500px] lg:w-[44%] md:h-auto bg-bellefuWhite "> */}
              {/* <div> <MdOutlineCancel onClick={() => setOpen(false)} className='relative text-3xl text-gray-300 justify-end top-0 left-[100%] ' /></div> */}
              <strong className="ml-4 mb-8 text-sm md:text-md">
                {" "}
                Sign in{" "}
              </strong>

              <div className="flex space-x-3 justify-center items-center my-4">
                <button className=" flex py-3 px-4 md:px-10 border-2 hover:bg-gray-200  rounded-lg  ">
                  <FcGoogle className="md:text-3xl text-xl mr-2 md:mr-5" />{" "}
                  <strong className="text-[#303A4B] text-sm md:text-xl">
                    Google
                  </strong>
                </button>
                <button className="hover:bg-blue-700 flex py-3 px-4 md:px-10 bg-[#3B5998] rounded-lg ">
                  <ImFacebook className="md:text-3xl text-xl text-white mr-2 md:mr-5 " />
                  <strong className="text-white text-sm md:text-xl">
                    Facebook
                  </strong>
                </button>
              </div>
              <div className="flex justify-center items-center">
                <button
                  onClick={() => router.push("/login")}
                  className="py-3 text-xs md:text-md px-7  lg:px-40 mb-4  rounded-md text-white hover:bg-green-600 bg-bellefuGreen "
                >
                  Email or Phone
                </button>
              </div>

              <p className="flex justify-center items-center text-xs md:text-base">
                Do not have an account?{" "}
                <stong
                  onClick={() => router.push("/register")}
                  className="text-bellefuGreen hover:text-green-700  ml-2"
                >
                  Register
                </stong>
              </p>
            </Box>
          </Modal>

          <div className="flex items-center mt-2 space-x-3">
            <button
              onClick={handleMessage}
              className="bg-bellefuOrange rounded-md w-full flex items-center justify-center py-4"
            >
              <MdOutlineMessage className="!text-white" />
            </button>
            <button
              onClick={handleCall}
              className="bg-bellefuGreen  rounded-md w-full flex items-center justify-center py-4"
            >
              <MdCall className="text-white " />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="opacity-60 relative">
            <div className="absolute bg-bellefuGreen/90 px-3 py-1 rounded-br-md">
              <p className="uppercase text-sm   tracking-wider opacity-100 font-bold text-white">
                Product not in stock
              </p>
            </div>
            <div>
              <img
                src={`${productImageUrl}${product?.images[0]}`}
                className="rounded-md w-full h-44 object-cover "
                alt={product.title}
              />
            </div>
            <p className="capitalize text-medium">
              {product.title.substring(0, 20)}
            </p>
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
            <div className="flex items items-center justify-between">
              <p className="text-bellefuGreen flex font-poppins font-semibold">
                {product.currency_code && !converter ? (
                  <p
                    className="mr-1"
                    dangerouslySetInnerHTML={{ __html: product.currencySymbol }}
                  />
                ) : (
                  <p
                    className="mr-1"
                    dangerouslySetInnerHTML={{ __html: currency }}
                  />
                )}

                {!converter ? product.price : newPrice?.toFixed(2)}
                {product.currency_code ? (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      axios
                        .post(`${apiData}convert/currency`, {
                          amount: product?.price,
                          to: currencyCode,
                          from: product?.currency_code,
                        })
                        .then((res) => {
                          setNewPrice(res.data.data.result);
                        });

                      setConverter(true);
                    }}
                    className="ml-5"
                  >
                    <Tooltip title="Convert">
                      <CgArrowsExchange className="text-2xl" />
                    </Tooltip>
                  </span>
                ) : null}
              </p>
              {fav2 || (fav?.includes(product.productId) && getIsLoggedIn) ? (
                <span>
                  <BsSuitHeartFill className="w-4 h-4 text-bellefuOrange cursor-pointer" />
                </span>
              ) : (
                <BsHeart className="w-4 h-4 text-bellefuOrange cursor-pointer" />
              )}
            </div>

            <div className="flex items-center mt-2 space-x-3">
              <button className="bg-bellefuOrange rounded-md w-full flex items-center justify-center py-4">
                <MdOutlineMessage className="!text-white" />
              </button>
              <button className="bg-bellefuGreen  rounded-md w-full flex items-center justify-center py-4">
                <MdCall className="text-white " />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
