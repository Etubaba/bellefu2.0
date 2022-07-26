import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { BsHeart } from "react-icons/bs";
import { AiFillEye, AiOutlineMail, AiFillLinkedin } from "react-icons/ai";
import { BsClockFill } from "react-icons/bs";
import { Modal, Box } from "@mui/material";
import { FcGoogle, FcVideoCall } from "react-icons/fc";
import { ImFacebook } from "react-icons/im";
import { TiLocation } from "react-icons/ti";
import { MdCall } from "react-icons/md";
import { RiMessage2Fill, RiMessageFill, RiCloseFill } from "react-icons/ri";
import {
  BsFacebook,
  BsTwitter,
  BsWhatsapp,
  BsFillFlagFill,
  BsInstagram,
  BsSuitHeartFill,
  BsFillCheckSquareFill,
} from "react-icons/bs";
import {
  EmailShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";
import SingleProductMobileSidebar from "./SingleProductMobileSidebar";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login, userFav, msgScroll } from "../../features/bellefuSlice";
import axios from "axios";
import {
  apiData,
  imageBaseUrl,
  productImageUrl,
  videoUrl,
} from "../../constant";
import { toast } from "react-toastify";

const SingleProductDescription = ({ productDetails, verified }) => {
  const [open, setOpen] = useState(true);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [fav, setFav] = useState([]);
  const [favStatus, setFavStatus] = useState(false);
  const [report, setReport] = useState("");
  const [watch, setWatch] = useState(false);

  const receiverId = productDetails[0]?.userId;
  const userId = useSelector((state) => state.bellefu?.profileDetails?.id);
  const userPhone = useSelector(
    (state) => state.bellefu?.profileDetails?.phone
  );
  const isLoggedIn = useSelector(login);
  const dispatch = useDispatch();
  const scroll = useSelector((state) => state.bellefu?.msgScroll);
  const ref = useRef(null);
  // const scrollToTop = (ref) => window.scrollTo(0, ref.current.offsetTop);

  // scroll to message
  useEffect(() => {
    if (scroll !== 0) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      dispatch(msgScroll(0));
    }
  }, [scroll]);

  const actionMessage = () => {
    axios
      .post(`${apiData}monitor/user/action`, {
        userId: userId,
        action: "message",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //action on favourite and call

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

  // handle message open
  const handleMessage = () => {
    if (isLoggedIn) {
      setOpen4(!open4);
    } else {
      setModalOpen(true);
    }
  };

  //handle sending messages
  const sendMessage = () => {
    if (message === "") {
      toast.error("You can not send an empty field", { position: "top-right" });
    } else {
      const formData = new FormData();
      formData.append("messageTo", receiverId);
      formData.append("messageFrom", userId);
      formData.append("image", "");
      formData.append("message", message);
      axios({
        method: "POST",
        url: `${apiData}send/messages`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        if (res.data.status) {
          toast.success("Your message has been sent successfully.", {
            position: "top-right",
          });
          router.push("/users/messages");
          actionMessage();
        }
      });
    }
  };

  const handleReport = () => {
    if (report === "") {
      toast.error("Please all fields are required", { position: "top-right" });
    } else {
      axios
        .post(`${apiData}create/report`, {
          productId: productDetails[0]?.productId,
          userId: userId,
          message: report,
          title: "Report Product",
        })
        .then((res) => {
          if (res.data.status) {
            toast.success("Your report is under review.", {
              position: "top-right",
            });
            setReport("");
            setOpen3(false);
          }
        });
    }
  };

  useEffect(() => {
    const getFav = async () => {
      await axios
        .get(`${apiData}get/user/favorite/${userId}`)
        .then((res) => setFav(res.data.data))
        .catch((err) => console.log(err));
    };
    getFav();
  }, []);

  const favArr = fav?.map((item) => item.productId);

  if (favArr && isLoggedIn) {
    dispatch(userFav(favArr));
  }

  const [clean, setClean] = useState(favArr);

  const router = useRouter();

  const handleCall = () => {
    if (isLoggedIn) {
      window.open(`tel:${productDetails[0]?.advertiserNumber}`);
      actionCall();
    } else {
      setModalOpen(true);
      toast.info("please login to contact seller", { position: "top-center" });
    }
  };

  const addFav = () => {
    if (isLoggedIn) {
      axios
        .post(`${apiData}add/favorite`, {
          userId: userId,
          productId: productDetails[0]?.productId,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            setFavStatus(!favStatus);
            toast.success(
              `${productDetails[0]?.title.substring(0, 20)} added to favourite`
            );
            actionFav();
          }
        });
    } else {
      toast.error("Login to add favorite product");
      setOpen(true);
    }
  };

  const removeFav = () => {
    axios
      .post(`${apiData}delete/favorite/webindex`, {
        productId: productDetails[0]?.productId,
        userId: userId,
      })
      .then((res) => {
        if (res.data.status) {
          setFavStatus(!favStatus);

          const cleanArr = favArr.filter(
            (items) => items !== productDetails[0]?.productId
          );
          setClean(cleanArr);
          toast.error(
            `${productDetails[0]?.title.substring(
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

  // PARSE PRODUCT DESCRIPTION
  const parser = new DOMParser();
  const doc = parser.parseFromString(
    `${productDetails[0]?.description}`,
    "text/html"
  );
  //console.log(doc);
  const paras = doc.getElementsByTagName("p");
  //console.log(paras);

  let description = "";

  if (paras.length) {
    for (let index = 0; index < paras.length; index++) {
      description += `${paras[index]?.firstChild?.nodeValue} `;
    }
  } else {
    description = doc?.body?.firstChild?.nodeValue;
  }

  //console.log(description)

  const title = `${productDetails[0]?.title}`;
  // const shareUrl = `https://bellefu30web.herokuapp.com/shared?image=${productDetails[0]?.images[0]}&name=${productDetails[0]?.title}&description=${description}&type=image&id=${productDetails[0]?.productId}`;
  const image = `${window.location.href}?mage=${
    productDetails[0]?.images[0]
  }&title=${title}&description=${description?.trim()}&type=image`;

  const video = `${imageBaseUrl}/get/video/`;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 2,
  };
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    height: "50%",
    borderRadius: 3,
    boxShadow: 24,
    p: 2,
  };

  return (
    <>
      <Head>
        <title>{productDetails[0]?.title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={productDetails[0]?.title} />
        <meta name="og:description" content={description} />
        <meta
          name="og:image"
          content={`${productImageUrl}${productDetails[0]?.images[0]}`}
        />
      </Head>
      <div className="bg-bellefuWhite rounded-t-md">
        {/* title section */}
        <div className="flex items-center justify-between lg:px-7 px-3">
          <p className="text-xl lg:text-3xl text-bellefuTitleBlack font-semibold">
            {productDetails[0]?.title}
          </p>
          {favStatus ||
          (clean?.includes(productDetails[0]?.productId) &&
            favArr?.includes(productDetails[0]?.productId)) ? (
            <BsSuitHeartFill
              onClick={removeFav}
              className="lg:w-6 lg:h-6 text-bellefuOrange cursor-pointer"
            />
          ) : (
            <BsHeart
              className="lg:w-6 lg:h-6 text-bellefuOrange"
              onClick={addFav}
            />
          )}
        </div>

        {/* tag section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:px-7 lg:mt-4 px-3 mt-2 space-y-2">
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-x-8 lg:items-center">
            <div className="flex items-center space-x-1 lg:mt-2">
              <BsClockFill className="w-4 h-4 text-gray-500" />
              <p className="text-bellefuBlack1 text-sm">
                Posted on{" "}
                {moment(productDetails[0]?.productPostedOn).format(
                  "MMM Do YYYY"
                )}
              </p>
            </div>
            <div className="flex items-center space-x-2 -ml-1">
              <TiLocation className="w-4 h-4 text-gray-500 ml-1" />
              <p className="text-bellefuBlack1 text-sm">
                {productDetails[0]?.lgaName}, {productDetails[0]?.stateName},
                {productDetails[0]?.countryName}.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <AiFillEye className="w-4 h-4 text-gray-500 " />
            <p className="text-bellefuBlack1 text-sm">
              {productDetails[0]?.inorganicViews} Views
            </p>
          </div>
        </div>

        {/* description section */}
        <div>
          <div className="flex justify-between">
            <p className="lg:px-7 px-3 mt-4 lg:mt-6 text-xl lg:text-2xl text-bellefuBlack1 font-medium">
              Ads Description
            </p>
            {productDetails[0]?.video !== null && (
              <FcVideoCall
                onClick={() => setWatch(true)}
                className="md:text-5xl text-3xl m-3 "
              />
            )}
          </div>
          <div className="border-b lg:mt-6 mt-4" />
          <p
            className="lg:px-7 px-3 text-justify lg:mt-5 mt-3 text-gray-500 text-sm lg:text-lg mb-4 capitalize"
            dangerouslySetInnerHTML={{
              __html: productDetails[0]?.description,
            }}
          />
        </div>
        {/* product owner profile details */}

        <div className="py-3 px-3 lg:hidden">
          <div ref={ref} />
          <SingleProductMobileSidebar
            verified={verified}
            mobileDetails={productDetails}
          />
        </div>

        {/* end of product owner details */}
        {/* contact section */}
        <div>
          <p className="lg:px-7 px-3 text-2xl text-bellefuBlack1 font-medium hidden lg:block">
            Contact
          </p>
          <div ref={ref} />
          {/* divider */}
          <div className="border-b mt-6" />

          <div className=" hidden lg:block px-40 mt-12">
            <div className="flex items-center flex-col justify-center border py-20 rounded-md bg-bellefuBackground space-y-14">
              <p className="text-2xl text-bellefuBlack1">Contact The Seller</p>

              <div className="flex items-center mt-2 w-full space-x-10 justify-center">
                <div
                  onClick={handleMessage}
                  className="bg-bellefuOrange px-8 py-3 rounded-md flex items-center space-x-2 cursor-pointer"
                >
                  <RiMessage2Fill className="text-white" />
                  <p className="text-white">Message</p>
                </div>

                <div
                  onClick={handleCall}
                  className="bg-bellefuGreen px-12 py-3 rounded-md flex items-center cursor-pointer space-x-2"
                >
                  <MdCall className="text-white" />
                  <p className="text-white">Call</p>
                </div>

                {/* Watching video modal  */}

                <Modal
                  open={watch}
                  onClose={() => setWatch(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box style={style2}>
                    <video width="650" height="540" controls>
                      <source
                        src={`${videoUrl}get/video/${productDetails[0]?.video}`}
                        type="video/mp4"
                      />
                      <source src="movie.ogg" type="video/ogg" />
                      Your browser does not support the video.
                    </video>
                  </Box>
                </Modal>

                {/* When user is not login modal */}
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  // sx={{ opacity: 0.5 }}
                >
                  <Box sx={style}>
                    {/* <div> <MdOutlineCancel onClick={() => setOpen(false)} className='relative text-3xl text-gray-300 justify-end top-0 left-[100%] ' /></div> */}
                    <strong className="ml-4 mb-8 text-sm md:text-md">
                      {" "}
                      Sign in{" "}
                    </strong>

                    <div className="flex space-x-4 justify-center items-center my-4">
                      <button className=" flex py-3 px-8 md:px-10 border-2 hover:bg-gray-200  rounded-lg  ">
                        <FcGoogle className="md:text-3xl text-xl mr-5" />{" "}
                        <strong className="text-[#303A4B] text-sm md:text-xl">
                          Google
                        </strong>
                      </button>
                      <button className="hover:bg-blue-700 flex py-3 px-7 md:px-10 bg-[#3B5998] rounded-lg ">
                        <ImFacebook className="md:text-3xl text-xl text-white mr-5 " />
                        <strong className="text-white text-sm md:text-xl">
                          Facebook
                        </strong>
                      </button>
                    </div>

                    <button
                      onClick={() => router.push("/login")}
                      className="py-3 text-xs md:text-md px-8  lg:px-44 mb-4  rounded-md text-white hover:bg-green-600 bg-bellefuGreen "
                    >
                      Email or Phone
                    </button>

                    <p className="flex justify-center items-center">
                      Do not have an account?{" "}
                      <stong
                        onClick={() => router.push("/register")}
                        className="text-bellefuGreen hover:text-green-700 text-sm md:text-lg ml-2"
                      >
                        Register
                      </stong>
                    </p>
                  </Box>
                </Modal>
              </div>
              {/* message box */}
              {open4 && (
                <div className="border bg-bellefuBackground divide-y w-[30rem] border-orange-200 rounded-md">
                  <div className="flex justify-between py-1">
                    <div className="flex items-center w-full space-x-3 rounded-md justify-end">
                      <RiMessage2Fill className="w-4 h-4 text-gray-500" />{" "}
                      <p className="text-gray-400 font-normal text-sm cursor-pointer">
                        Messages
                      </p>
                    </div>
                    <RiCloseFill
                      className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                      onClick={() => setOpen4(!open4)}
                    />
                  </div>
                  <div className="overflow-x-scroll w-full  text-sm flex space-x-5">
                    <pre
                      onClick={() => setMessage("Hello")}
                      className="border  border-bellefuOrange px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-300 text-center"
                    >
                      Hello
                    </pre>
                    <pre
                      onClick={() => setMessage("Is this available")}
                      className="border   border-bellefuOrange px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-300 text-center"
                    >
                      Is this available
                    </pre>
                    <pre
                      onClick={() => setMessage("Nice Product")}
                      className="border  border-bellefuOrange px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-300 text-center"
                    >
                      Nice Product
                    </pre>
                    <pre
                      onClick={() => setMessage(`contact me ${userPhone}`)}
                      className="border  border-bellefuOrange px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-300 text-center"
                    >
                      contact me
                    </pre>
                    <pre
                      onClick={() => setMessage("I want to order")}
                      className="border  border-bellefuOrange px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-300 text-center"
                    >
                      I want to order
                    </pre>
                    <pre
                      onClick={() => setMessage("What is the actual price")}
                      className="border  border-bellefuOrange px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-300 text-center"
                    >
                      {" "}
                      Actual price
                    </pre>
                  </div>

                  <textarea
                    rows="5"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent px-3 outline-none text-xs pt-1"
                  />
                  <div className="flex items-center justify-center py-2">
                    <button
                      onClick={sendMessage}
                      className="text-white text-sm lg:text-lg bg-bellefuOrange/60 hover:bg-bellefuOrange duration-200 transition ease-in px-6 py-1 rounded-md capitalize"
                    >
                      send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* safety tips, share product, report product */}
          <div className="lg:px-7 lg:mt-6 px-3 mt-4">
            <div className="flex items-center justify-between">
              <button
                className=" text-sm lg:text-lg font-medium capitalize text-gray-400 active:text-bellefuTitleBlack cursor-pointer"
                onClick={() => (
                  setOpen(!open), setOpen1(false), setOpen2(false)
                )}
              >
                Safety tips
              </button>
              <button
                className="text-sm lg:text-lg font-medium text-gray-400 capitalize active:text-bellefuTitleBlack cursor-pointer"
                onClick={() => (
                  setOpen1(!open1), setOpen(false), setOpen2(false)
                )}
              >
                Share Product
              </button>
              <button
                className="text-sm lg:text-lg font-medium text-gray-400 capitalize active:text-bellefuTitleBlack cursor-pointer"
                onClick={() => (
                  setOpen2(!open2), setOpen(false), setOpen1(false)
                )}
              >
                Report Product
              </button>
            </div>
          </div>
          {/* divider */}
          <div className="border-b lg:mt-6 mt-3" />
          {/* safety tips => details */}
          {open && (
            <div className=" px-3 lg:px-7 mt-4 pb-4 space-y-2">
              <div className="flex items-center space-x-4">
                <BsFillCheckSquareFill className="w-3 h-3 text-bellefuOrange rounded-sm" />
                <p className="text-xs sm:text-sm">
                  Ensure quality/quantity of Products/Services.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <BsFillCheckSquareFill className="w-3 h-3 text-bellefuOrange rounded-sm" />
                <p className="text-xs sm:text-sm">
                  Ensure meeting in a secured place if the need arise.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <BsFillCheckSquareFill className="lg:w-3 lg:h-3 w-3 h-3 text-bellefuOrange rounded-sm" />
                <p className="text-xs sm:text-sm whitespace-pre-wrap">
                  Contact support@bellefu.com if you require verification of
                  buyer or seller (Terms & Conditions apply)
                </p>
              </div>
              <p
                onClick={() => router.push("/tips")}
                className="hover:text-orange-500 cursor-pointer text-bellefuOrange mt-4"
              >
                Read More...
              </p>
            </div>
          )}

          {/* share product => details */}
          {open1 && (
            <div className="px-3 lg:px-7 lg:pb-4 pb-2">
              <div className="flex flex-col lg:items-center py-4 space-y-2 lg:space-x-16">
                <p className="text-xs sm:text-sm lg:text-lg font-medium text-bellefuBlack1">
                  Share this product on social media :
                </p>
                <div className="flex items-center justify-center border lg:px-24 px-14 lg:py-6 py-3 rounded-md space-x-4 lg:space-x-7 bg-bellefuBackground ">
                  <FacebookShareButton
                    url={image}
                    quote={title}
                    className="Demo_some-network_share-button"
                  >
                    <BsFacebook className="w-7 h-7 text-[#4267B2] cursor-pointer" />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={image}
                    title={title}
                    hashtags={["bellefu", "Agriculture", "Agribusiness"]}
                    className="Demo_some-network_share-button"
                  >
                    <BsTwitter className="w-7 h-7 text-[#1DA1F2] cursor-pointer" />
                  </TwitterShareButton>

                  <WhatsappShareButton
                    url={image}
                    title={title}
                    className="Demo_some-network_share-button"
                  >
                    <BsWhatsapp className="w-7 h-7 text-[#25D366] cursor-pointer" />
                  </WhatsappShareButton>

                  <EmailShareButton
                    subject={`Check out ${productDetails[0]?.title} from`}
                    url={image}
                    body={`Check out ${productDetails[0]?.title} from`}
                    className="Demo_some-network_share-button"
                  >
                    <AiOutlineMail className="w-7 h-7 text-[#F5222D] cursor-pointer" />
                  </EmailShareButton>
                </div>
              </div>
            </div>
          )}

          {/* report product => details */}
          {open2 && (
            <div className="lg:px-7 px-3 lg:mt-5 mt-2 lg:pb-4 pb-2">
              <div className="flex flex-col lg:items-center lg:py-4 py-2 lg:space-x-16 space-y-2">
                <p className="text-xs sm:text-sm lg:text-lg font-medium text-bellefuBlack1">
                  Did you think this product is not original/scam?
                </p>
                <div
                  className="flex items-center border px-14 cursor-pointer border-bellefuOrange lg:py-3 py-2 rounded-md space-x-3 bg-bellefuBackground "
                  onClick={() => setOpen3(!open3)}
                >
                  <BsFillFlagFill className="lg:w-7 lg:h-7 w-4 h-4 text-orange-600" />
                  <p className="text-md lg:text-lg">Flag this product</p>
                </div>
                {/* report box */}
                {open3 && (
                  <div className="border -mt-10 bg-bellefuBackground divide-y lg:w-72 border-orange-200 rounded-md">
                    <div className="flex items-center py-1">
                      <div className="flex items-center w-full space-x-3 rounded-md justify-end">
                        <RiMessageFill className="w-4 h-4 text-red-500" />{" "}
                        <p className="text-gray-400 font-normal text-sm">
                          Report
                        </p>
                      </div>
                      <RiCloseFill
                        className="ml-12 w-7 h-7 text-gray-400 pr-1 cursor-pointer"
                        onClick={() => setOpen3(false)}
                      />
                    </div>

                    <textarea
                      onChange={(e) => setReport(e.target.value)}
                      value={report}
                      rows="5"
                      className="w-full bg-transparent px-3 outline-none text-xs"
                    ></textarea>
                    <div className="flex items-center justify-center py-2">
                      <button
                        onClick={handleReport}
                        className="text-white bg-bellefuOrange/60 hover:bg-bellefuOrange duration-200 transition ease-in py-1 px-6 rounded-md capitalize"
                      >
                        send
                      </button>
                    </div>
                  </div>
                )}

                {/* end of report box */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleProductDescription;
