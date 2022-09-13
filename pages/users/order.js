import React from "react";
import classNames from "classnames";
import { MdHistoryToggleOff, MdCheck, MdPayment } from "react-icons/md";
import Layout from "../../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { profileDetails, homeData } from "../../features/bellefuSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GoListOrdered } from "react-icons/go";
import { useRouter } from "next/router";
import { productImageUrl, shopApi } from "../../constant";
import PaymentModal from "../../components/PaymentModal";
import Head from "next/head";
import moment from "moment";

const order = () => {
  const router = useRouter();

  const user = useSelector(profileDetails);
  const currencyLogo = useSelector(homeData);
  const [orderhistory, setOrderHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrderItem, setOrderItem] = useState(null);
  const [currentOrderItemIndex, setCurrentOrderItemIndex] = useState(-1);

  useEffect(() => {
    axios
      .get(`${shopApi}list/order/${user?.id}`)
      .then((res) => {
        setOrderHistory(res.data.data);
        //console.log(res.data.data);
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: "top-center",
        });
      });
  }, []);

  return (
    <div>
      <Head>
        <title>Bellefu: User Orders</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <div className="rounded-lg md:mt-5 mt-2 bg-bellefuWhite   h-auto w-full md:w-auto">
        <div className="flex justify-between  px-10 md:py-6 py-2 border-b">
          <h1 className="font-semibold">My Order Details</h1>
        </div>
        <div className="px-2 md:px-5 lg:px-10 py-6 ">
          {orderhistory?.length === 0 ? (
            <div className="h-full px-2 lg:px-0 ">
              <div className="border mx-auto mt-2 lg:my-5 rounded-xl w-full lg:w-7/12 h-11/12 ">
                <div className="flex flex-col justify-center mt-24 mb-24 items-center">
                  <GoListOrdered className="text-7xl lg:text-9xl mb-5 text-gray-600" />
                  <p className="text-sm capitalize lg:text-lg text-gray-600 px-2 text-center">
                    You do not have any order in your List
                  </p>
                  <div onClick={() => router.push(`/`)}>
                    {" "}
                    <button className="py-1 lg:py-3 hover:bg-orange-400 mt-16 px-8 lg:px-12 rounded-full bg-bellefuOrange text-white text-sm lg:text-lg">
                      shop now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            orderhistory?.map((order, index) => (
              <div
                key={index}
                className="block md:flex sm:flex lg:flex border rounded-3xl bg-[#F8F8F8] p-4 my-5 ml-5 justify-between "
              >
                <div className="block sm:flex md:flex lg:flex ">
                  <img
                    alt="order"
                    src={`${productImageUrl}${
                      order?.images === null
                        ? "6256e0e3bc1dd.9RgvW1Z21649860835.jpg"
                        : order?.images[0]
                    }`}
                    className="object-cover  flex  sm:w-40 sm:h-40 md:w-40 md:h-32 lg:h-32  lg:w-40 mr-5  rounded-md"
                  />
                  <div className=" ">
                    <h3 className="text-md sm:text-xl md:text-2xl  mb-2">
                      {order?.title}
                    </h3>

                    {/* <p className="mb-2 text-xs md:text-lg ">
                    Qty:{order?.product_quantity}
                  </p> */}

                    {/* REPLACING FIELD */}
                    <p className="mb-2 text-xs md:text-lg ">Quantity</p>
                    <p className="mb-2 text-xs md:text-lg">shipping Fee</p>
                    <p className="md:mb-7 mb-3 text-xs md:text-lg">
                      Total Price
                    </p>
                    {/* END OF REPLACEMENT */}

                    <div className="flex sm:block justify-between">
                      <span className="flex md:hidden lg:hidden">
                        <p
                          className="mr-1 font-semibold mt-0.5"
                          dangerouslySetInnerHTML={{
                            __html: currencyLogo?.defaultCurrency,
                          }}
                        />
                        <h1 className="text-crystamolPrice  text-lg  font-bold">
                          {order?.price}
                        </h1>
                      </span>
                      <div className="md:hidden font-bold">
                        {order?.product_quantity}
                      </div>

                      <span className=" md:hidden lg:hidden flex">
                        <div className="flex font-semibold">
                          <p
                            className="mr-1 font-semibold "
                            dangerouslySetInnerHTML={{
                              __html: currencyLogo?.defaultCurrency,
                            }}
                          />
                          <p className="font-semibold">
                            {order?.product_quantity * order?.price}
                          </p>
                        </div>
                        {/* <p className=" font-semibold">Total:</p>
                      <p
                        className="mr-1 font-semibold "
                        dangerouslySetInnerHTML={{
                          __html: currencyLogo?.defaultCurrency,
                        }}
                      />
                      <p className="font-semibold">
                        {order?.product_quantity * order?.price}
                      </p> */}
                        <p className="font-semibold text-bellefuOrange">
                          {order?.shipping_fee ? order.shipping_fee : "pending"}
                        </p>
                      </span>
                      <p className="font-semibold flex items-center md:hidden">
                        <span
                          className="mr-1 text-lg font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: currencyLogo?.defaultCurrency,
                          }}
                        />
                        <span className="">
                          {order?.product_quantity
                            ? order?.shipping_fee
                              ? order?.price * order?.product_quantity +
                                order?.shipping_fee
                              : `${
                                  order?.price * order?.product_quantity
                                } + shipping fee`
                            : 0}
                        </span>
                      </p>
                      {/* <p className="block md:hidden lg:hidden font-semibold">
                      Total:
                      <p
                        className="mr-1 "
                        dangerouslySetInnerHTML={{
                          __html: currencyLogo?.defaultCurrency,
                        }}
                      />
                      {order?.product_quantity * order?.price}
                    </p> */}
                    </div>

                    <p className="flex space-x-2 text-[#FF5F00]">
                      <span className="text-sm md:text-lg">
                        {moment(order?.orderTime).format("ll")}
                      </span>
                    </p>
                    <div>
                      <button
                        className={classNames(
                          "bg-bellefuGreen hover:bg-green-400 flex flex-col justify-center items-center md:hidden text-center text-white w-full sm:w-auto md:w-auto lg:w-auto rounded-full mt-3",
                          {
                            "bg-bellefuOrange hover:bg-orange-300":
                              order?.status === "processing",
                            "border-2 border-bellefuGreen bg-transparent":
                              order?.status === "complete payment",
                          }
                        )}
                      >
                        <span className="flex space-x-4">
                          <span className="text-xs">{order?.status}</span>
                          <span className="text-xs mt-1">
                            {order?.status === "processing" ? (
                              <MdHistoryToggleOff />
                            ) : (
                              <MdCheck />
                            )}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:inline-block">
                  <div className="  flex-col items-end justify-end ">
                    <span className="flex">
                      <p
                        className="mr-1 mt-1 text-xl font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: currencyLogo?.defaultCurrency,
                        }}
                      />{" "}
                      <h1 className="text-crystamolPrice hidden  md:inline-block  text-lg md:text-2xl font-semibold">
                        {order?.price}{" "}
                      </h1>
                    </span>
                    <div className="font-bold text-lg mt-2">
                      {order?.product_quantity}
                    </div>

                    {/* <p className="font-semibold mt-1 flex">
                    {" "}
                    Total:
                    <p
                      className="mr-1 "
                      dangerouslySetInnerHTML={{
                        __html: currencyLogo?.defaultCurrency,
                      }}
                    />
                    {order?.product_quantity * order?.price}
                  </p> */}
                    <p
                      className={classNames("font-semibold mt-2", {
                        "text-bellefuOrange": !order?.shipping_fee,
                      })}
                    >
                      {order?.shipping_fee ? order.shipping_fee : "pending"}
                    </p>
                    <p className="font-semibold mt-2 flex items-center">
                      <span
                        className="mr-1 text-lg font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: currencyLogo?.defaultCurrency,
                        }}
                      />
                      <span className="">
                        {order?.product_quantity
                          ? order?.shipping_fee
                            ? order?.price * order?.product_quantity +
                              order?.shipping_fee
                            : `${
                                order?.price * order?.product_quantity
                              } + shipping fee`
                          : 0}
                      </span>
                    </p>
                    <button
                      onClick={
                        order?.status === "ordered"
                          ? () => {}
                          : () => {
                              setShowModal(true);
                              setOrderItem(order);
                              setCurrentOrderItemIndex(index);
                              //setPrice(order?.price);
                              //setCurrencyCode(order?.currency_code);
                              //router.push("/profile/orderdetails");
                            }
                      }
                      className={classNames(
                        "border-2 border-bellefuGreen bg-transparent px-5 md:text-md text-sm  md:px-7 py-2 text-black flex justify-center items-center rounded-full mt-3 md:mt-5",
                        {
                          "bg-bellefuOrange hover:bg-orange-30":
                            order?.status === "processing",
                          "text-bellefuGreen tex-lg hover:cursor-default":
                            order?.status === "ordered",
                        }
                      )}
                    >
                      <span className="flex item-center space-x-4">
                        <span
                          className={classNames("text-[8px] md:text-sm", {
                            "text-bellefuGreen": order?.status === "ordered",
                          })}
                        >
                          {/* {order?.status === "processing"? "Make Payment": order?.status} */}
                          {order?.shipping_fee && order?.status === "pending"
                            ? "Pay Now!"
                            : order?.status}
                        </span>
                        <span className="text-[8px] md:text-sm mt-1">
                          {order?.status === "processing" ? (
                            <MdHistoryToggleOff />
                          ) : order?.status === "ordered" ? (
                            <MdCheck className="text-bellefuGreen text-2xl -mt-2" />
                          ) : (
                            <MdPayment />
                          )}{" "}
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div>
          {showModal && currentOrderItem && (
            <PaymentModal
              setShowModal={setShowModal}
              currentOrderItemIndex={currentOrderItemIndex}
              currentOrderItem={currentOrderItem}
              orderhistory={orderhistory}
              setOrderHistory={setOrderHistory}
            />
          )}
        </div>
      </div>
    </div>
  );
};
order.Layout = Layout;

export default order;
