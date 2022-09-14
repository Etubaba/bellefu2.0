import React from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { apiData, flutterwaveKey, shopApi } from "../../constant";
import {
  AiOutlineCaretRight,
  AiOutlineCaretDown,
  AiOutlineClose,
} from "react-icons/ai";
import axios from "axios";
import { useState, useEffect } from "react";
import { payment, profileDetails, userDId } from "../../features/bellefuSlice";
import { toast } from "react-toastify";
import { setAutoFreeze } from "immer";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Payment({ modal, sub, handleCreate }) {
  const [wallet, setWallet] = useState(0);
  const [method, setMethod] = useState("card");
  const [voucher, setVoucher] = useState("");
  const [openCard, setOpenCard] = useState(false);
  const [dept, setDept] = useState("Select");
  const [reload, setReload] = useState(0);
  const [subType, setSubType] = useState("25");
  const [fee, setFee] = useState(null);
  const [voucherValue, setVoucherValue] = useState(0);

  const user = useSelector(profileDetails);

  const dispatch = useDispatch();
  // convert $25 to bellicoin $1 = 100bellicoin
  const createAmount = 25 * 100;

  const userFullName = user?.first_name + " " + user?.last_name;
  const userEmail = user?.email;
  const phone = user?.phone;

  //flutterwave configuration
  const config = {
    public_key: flutterwaveKey,

    tx_ref: Date.now(),
    amount: subType,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userEmail,
      phonenumber: phone,
      name: userFullName,
    },
    customizations: {
      title: "Shop creation",
      description: "Payment to create shop",
      logo: "https://www.linkpicture.com/q/bellefuApplogo.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  useEffect(() => {
    const getWallet = async () => {
      axios.get(`${apiData}get/wallet/balance/${user?.id}`).then((res) => {
        setWallet(res.data.data);
      });
    };
    getWallet();
  }, [reload]);

  const handlePayment = () => {
    if (method === "wallet") {
      //pay by wallet

      if (wallet >= createAmount) {
        axios
          .post(`${apiData}update/wallet/balance`, {
            deduction: createAmount,
            userId: user?.id,
            description: "Create shop payment",
          })
          .then((res) => {
            if (res.data.status) {
              //    setHasPaid(true);
              setReload((prev) => prev + 1);
              dispatch(payment(true));
              toast.success("Payment successful");
              sub(subType);
              modal(false);
            }
          });
      } else {
        toast.error("Insufficient wallet balance");
      }
    } else if (method === "voucher") {
      //pay by voucher
      if (voucher === "") toast.error("Please enter voucher code");
      const remainder = Number(voucherValue) - subType;
      console.log("remainder", subType);
      if (Number(voucherValue) > subType) {
        axios
          .post(`${apiData}use/voucher`, {
            userId: user?.id,
            voucherCode: voucher,
            remainder: remainder,
          })
          .then((res) => {
            if (!res.data.status) toast.error("Invalid voucher, try again");
            //   const voucherValue = res.data?.data.amount;
            if (res.data.status) {
              dispatch(payment(true));
              toast.success("Payment successful");
              sub(subType);
              modal(false);
            }
          });
      } else {
        toast.error("insufficient voucher balance");
      }
    } else if (method === "card") {
      //pay by card
    }
  };

  const createOrder = async (data, actions) => {
    console.log(data);
    // await totalPrice
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: subType,
            // value: "5",
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    console.log("onApprove => ", data);
    return actions.order.capture().then(async (res) => {
      // const { paypal } = res;
      if (res.status.toLowerCase() === "completed") {
        // enqueueSnackbar("Payment completed successfully", {
        //   variant: "success",
        // });
        // setOrderID(res);

        // axios
        //   .post(`${BASE_URL}post/transaction`, {
        //     amount: price,
        //     paymentType: membership,
        //     transactionId: res.id,
        //     userId: user._Id,
        //   })
        //   .then((res) => console.log(res));
        //await handleMakePayment(res.id, res.create_time);

        handleCreate(subType);
      }
    });
  };

  useEffect(() => {
    const getSub = async () => {
      axios
        .get(`${shopApi}get/subscription/fee`)
        .then((res) => setFee(res.data.data));
    };

    getSub();
  }, []);

  const voucherCheck = () => {
    axios.get(`${apiData}validate/voucher/${voucher}`).then((res) => {
      if (!res.data.status) toast.error("Invalid voucher, try again");
      if (res.data.status) setVoucherValue(res.data.data.amount);
    });
  };

  return (
    <>
      <div className=" w-full  lg:w-[93%] pb-7  rounded-lg bg-[#ffffff]">
        <div className="bg-bellefuGreen justify-between flex p-4 ">
          <h3 className="md:font-semibold md:text-xl ml-2 text-xs md:ml-4 text-white">
            CHOOSE PAYMENT METHOD
          </h3>
          <div
            onClick={() => modal(false)}
            className="flex bg-white hover:bg-slate-50  rounded-full justify-end items-end"
          >
            <AiOutlineClose className="text-red-600 md:text-2xl" />
          </div>
        </div>
        <div>
          <div
            onChange={(e) => setMethod(e.target.value)}
            className="m-7 sm:flex lg:flex justify-between"
          >
            <div className="flex my-4 lg:my-0">
              <input
                //  onClick={handlepay}
                checked={method === "wallet"}
                value="wallet"
                id="ads_plan"
                name="plans"
                type="radio"
                className="focus:ring-bellefuGreen mr-4 h-4 w-4 mt-[5px] text-bellefuGreen border-gray-300"
              />
              <h2 className="font-semibold ">WALLET:&nbsp;&nbsp;₿ {wallet}</h2>
            </div>
            <div className="col-span-6 sm:col-span-3 my-4 lg:my-0">
              <div className="flex">
                <input
                  checked={method === "voucher"}
                  value="voucher"
                  //   onClick={()=>{setBtnsumit(true);setCard(true)}}
                  id="ads_plan"
                  name="plans"
                  type="radio"
                  className="focus:ring-bellefuGreen mr-4 h-4 w-4 mt-[5px] text-bellefuGreen border-gray-300"
                />
                <h2 className="font-semibold ">VOUCHER</h2>
              </div>
              {method === "voucher" && (
                <input
                  type="text"
                  onClick={() => setMethod("voucher")}
                  onBlur={voucherCheck}
                  onChange={(e) => {
                    if (method === "voucher") setVoucher(e.target.value);
                  }}
                  className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full lg:w-[18vw] shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                />
              )}
            </div>
            <div className="col-span-6 sm:col-span-3 my-4 lg:my-0">
              <div className="flex">
                <input
                  checked={method === "card"}
                  //   onClick={()=>{setBtnsumit(false) ;setCard(false)}}
                  id="ads_plan"
                  name="plans"
                  value="card"
                  type="radio"
                  className="focus:ring-bellefuGreen mr-4 h-4 w-4 mt-[5px] text-bellefuGreen border-gray-300"
                />
                <h2 className="font-semibold ">CARD/ONLINE </h2>
              </div>

              {method === "card" && (
                <div className="w-full">
                  <div className="flex items-center mb-2 hover:bg-bellefuBackground p-3 rounded-md border mt-4 relative">
                    <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                      <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                        {dept}
                      </h5>
                    </div>
                    {!openCard ? (
                      <div
                        onClick={() =>
                          method === "card" ? setOpenCard(!openCard) : null
                        }
                      >
                        <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                      </div>
                    ) : (
                      <div onClick={() => setOpenCard(!openCard)}>
                        <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                      </div>
                    )}
                  </div>
                  {openCard ? (
                    <div className="w-full bg-bellefuWhite rounded border transition duration-300 ease-in">
                      <ul className="rounded  py-4">
                        <li
                          onClick={() => {
                            handleFlutterPayment({
                              callback: (response) => {
                                console.log(response);
                                closePaymentModal();
                                if (response.status === "successful") {
                                  dispatch(payment(true));
                                  toast.success("Payment completed Successful");
                                  sub(subType);
                                  modal(false);
                                  axios
                                    .post(`${apiData}card/payment`, {
                                      gateway: "flutterwave",
                                      amount: subType,
                                      transactionId: response.transaction_id,
                                      userId: user?.id,
                                    })
                                    .then((res) => console.log(res));
                                }
                                // this will close the modal programmatically
                              },
                              onClose: () => {},
                            });
                            setDept("Card");
                          }}
                          className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                        >
                          <img
                            src="/card.png"
                            className="w-24"
                            alt="visa card"
                          />
                        </li>
                        <li
                          onClick={() => {
                            setDept("Paypal");
                            setOpenCard(!openCard);
                          }}
                          className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                        >
                          <img
                            src="/Paypal.png"
                            className="w-24"
                            alt="visa card"
                          />
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          {dept === "Paypal" && (
            <div className="justify-center px-12 mb-8">
              <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
              />
            </div>
          )}
          <div className="p-5 flex justify-between">
            <div>
              <p className="text-lg font-semibold ">Select Duration</p>
              <div className="flex space-x-2">
                <input
                  onChange={(e) => setSubType(e.target.value)}
                  checked={subType === "25"}
                  id="subType"
                  name="sub"
                  value={25}
                  type="radio"
                  className="focus:ring-bellefuGreen mr-4 h-4 w-4 mt-[5px] text-bellefuGreen border-gray-300"
                />
                <h3 className="font-semibold ">Monthly </h3>

                <p>${fee?.monthly}</p>
              </div>
              <div className="flex space-x-2">
                <input
                  onChange={(e) => setSubType(e.target.value)}
                  id="subType"
                  name="sub"
                  value={300}
                  type="radio"
                  className="focus:ring-bellefuGreen mr-4 h-4 w-4 mt-[5px] text-bellefuGreen border-gray-300"
                />
                <h3 className="font-semibold ">Yearly</h3>

                <p>${fee?.yearly}</p>
              </div>
            </div>
            {method !== "card" && (
              <div>
                <button
                  // disabled={address===""?true:false}
                  type="submit"
                  onClick={handlePayment}
                  class="flex justify-center items-center py-2 px-4 md:px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange ml-7 hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 "
                >
                  Proceed
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
