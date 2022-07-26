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


const order = () => {
  const router = useRouter();

  const user = useSelector(profileDetails);
  const currencyLogo = useSelector(homeData);
  const [orderhistory, setOrderHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPrice, setPrice] = useState(null);
  const [currencyCode, setCurrencyCode] = useState(null);

  useEffect(() => {
    axios
      .get(`${shopApi}list/order/${user?.id}`)
      .then((res) => {
        setOrderHistory(res.data.data);
      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: "top-center",
        });
      });
  }, []);
  //   console.log(orderhistory);
  return (
    <div className="rounded-lg md:mt-5 mt-2 bg-bellefuWhite   h-auto w-full md:w-auto">
      <div className="flex justify-between  px-10 md:py-6 py-2 border-b">
        <h1 className="font-semibold">My Order Details</h1>
      </div>
      <div className="px-2 md:px-5 lg:px-10 py-6 ">
        {orderhistory?.length === 0 ? <div className="h-full px-2 lg:px-0 ">
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
        </div> : orderhistory?.map((order, index) => (
          <div
            key={index}
            className="block md:flex sm:flex lg:flex border rounded-3xl bg-[#F8F8F8] p-4 my-5 ml-5 justify-between "
          >
            <div className="block sm:flex md:flex lg:flex ">
              <img
                alt="order"
                src={`${productImageUrl}${order?.images === null
                    ? "6256e0e3bc1dd.9RgvW1Z21649860835.jpg"
                    : order?.images[0]
                  }`}
                className="object-cover  flex  sm:w-40 sm:h-40 md:w-40 md:h-32 lg:h-32  lg:w-40 mr-5  rounded-md"
              />
              <div className=" ">
                <h3 className="text-md sm:text-xl   md:text-2xl  mb-2">
                  {order?.title}
                </h3>

                <p className="md:mb-7 mb-3 text-xs   md:text-lg ">
                  Qty:{order?.product_quantity}
                </p>
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

                  <span className=" md:hidden lg:hidden flex">
                    <p className=" font-semibold">Total:</p>
                    <p
                      className="mr-1 font-semibold "
                      dangerouslySetInnerHTML={{
                        __html: currencyLogo?.defaultCurrency,
                      }}
                    />
                    <p className="font-semibold">
                      {order?.product_quantity * order?.price}
                    </p>
                  </span>
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
                  <span className="text-sm md:text-lg">{order?.orderTime}</span>
                </p>
                <div>
                  <button
                    className={classNames("bg-bellefuGreen hover:bg-green-400 flex flex-col justify-center items-center md:hidden text-center text-white w-full sm:w-auto md:w-auto lg:w-auto rounded-full mt-3", {"bg-bellefuOrange hover:bg-orange-300":order?.status === "processing", "border-2 border-bellefuGreen bg-transparent": order?.status === "complete payment" })
                    }
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
                    className="mr-1 mt-1 text-lg font-semibold"
                    dangerouslySetInnerHTML={{
                      __html: currencyLogo?.defaultCurrency,
                    }}
                  />{" "}
                  <h1 className="text-crystamolPrice hidden  md:inline-block  text-lg md:text-2xl font-semibold">
                    {order?.price}{" "}
                  </h1>
                </span>

                <p className="font-semibold mt-1 flex">
                  {" "}
                  Total:
                  <p
                    className="mr-1 "
                    dangerouslySetInnerHTML={{
                      __html: currencyLogo?.defaultCurrency,
                    }}
                  />
                  {order?.product_quantity * order?.price}
                </p>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setPrice(order?.price);
                    setCurrencyCode(order?.currency_code);
                    //router.push("/profile/orderdetails");
                  }}
                  className={classNames("border-2 border-bellefuGreen bg-transparent px-5 md:text-md text-sm  md:px-7 py-2 text-black flex justify-center items-center rounded-full mt-3 md:mt-5", {"bg-bellefuOrange hover:bg-orange-30": order?.status === "processing"})
                  }
                >
                  <span className="flex space-x-4">
                    <span className="text-[8px] md:text-sm">
                      {/* {order?.status} */}
                      Make Payment
                    </span>
                    <span className="text-[8px] md:text-sm mt-1">
                      {order?.status === "processing" ? (
                        <MdHistoryToggleOff />
                      ) : order?.status === "make payment"?
                      <MdPayment />: (
                        <MdCheck />
                      )}{" "}
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}



      </div>
      <div>
        {showModal && currentPrice && <PaymentModal setShowModal={setShowModal} price={currentPrice} setPrice={setPrice} currency={currencyCode} />}
      </div>
    </div>
  );
};
order.Layout = Layout;

export default order;
