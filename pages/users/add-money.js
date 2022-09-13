import { useState, useRef } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { profileDetails } from "../../features/bellefuSlice";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import axios from "axios";
import { apiData } from "../../constant";
import { useRouter } from "next/router";

const AddMoney = () => {
  const [totalPrice, setTotalPrice] = useState("");
  const [hasPaid, setHasPaid] = useState({});
  const [amountEntered, setAmountEntered] = useState(false);
  const [rate, setRate] = useState(0);

  const userId = useSelector(profileDetails);
  const userFullName = userId?.first_name + " " + userId?.last_name;
  const userEmail = userId?.email;
  const phone = userId?.phone;
  const currency = userId?.currency_code;

  const config = {
    public_key: "FLWPUBK_TEST-d5182b3aba8527eb31fd5807e15bf23b-X",
    tx_ref: Date.now(),
    amount: totalPrice,
    currency: "USD",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userEmail,
      phonenumber: phone,
      name: userFullName,
    },
    customizations: {
      title: "Credit wallet money",
      description: "Add money your wallet",
      logo: "https://www.linkpicture.com/q/bellefuApplogo.jpg",
    },
  };

  // const handleConvert = () => {
  //   const amount = Number(totalPrice) * 100;
  //   setRate(amount);
  //   setConvert(true);
  // };

  const router = useRouter();

  const handleFlutterPayment = useFlutterwave(config);

  const handlePay = () => {
    if (hasPaid?.status == "successful") {
      toast.success("Payment completed successfully");
      setTotalPrice("");
      axios
        .post(`${apiData}fund/wallet`, {
          userId: userId?.id,
          amount: rate,
        })
        .then((res) => {
          if (res.data.status) {
            toast.success("Wallet updated successfully");
            router.push("/my-wallet");
          }
        });
    }
  };

  const createOrder = async (data, actions) => {
    // await totalPrice
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice,
            // value: "5",
          },
        },
      ],
    });
  };

  const formatedRate = rate
    .toLocaleString("en-US", {
      style: "currency",
      currency: "usd",
    })
    .slice(1);

  return (
    <>
      <Head>
        <title>Add Money</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-bellefuWhite rounded-md mt-5 ">
        <h1 className="px-8 py-4 font-bold">Fund My Wallet</h1>
        <hr />
        <div className="w-full md:w-auto mx-auto p-2 md:py-8 md:px-20">
          <h2 className="font-semibold mb-5 text-sm md:text-lg">
            Select Methods
          </h2>
          <div className="flex flex-col flex-auto mb-8">
            <div className="bg-[#F8FDF2] hover:cursor-pointer mb-2 px-16  md:mr-12 py-8 rounded-lg border-2">
              <div className=" mb-10  space-y-3 flex-col ">
                <label htmlFor="amount" className="font-semibold">
                  Enter Amount ({""} $ {""})
                </label>
                <input
                  type="number"
                  id="amount"
                  // onBlur={() => setAmountEntered(true)}
                  onFocus={() => setAmountEntered(false)}
                  className="w-full rounded-xl py-3 pl-5 outline outline-gray-300 focus:outline-bellefuOrange"
                  value={totalPrice}
                  onChange={(e) => {
                    setTotalPrice(e.target.value);
                    setRate(Number(e.target.value * 100));
                  }}
                />
              </div>

              <div className="flex   font-semibold space-x-6 my-10">
                <p>100 Bellicoin</p>
                <p>=</p>
                <p>$1</p>
              </div>
              {/* {(totalPrice !== '' && convert) && */}
              <div className="flex   font-semibold space-x-6 my-5">
                <p>
                  {" "}
                  $ {""}
                  {Number(totalPrice)
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "usd",
                    })
                    .slice(1)}
                </p>
                <p>=</p>
                <p>
                  {formatedRate}
                  {""} Bellecoin
                </p>
              </div>

              <div className="flex justify-end items-end my-5 ">
                {amountEntered ? (
                  <button
                    onClick={() => setAmountEntered(false)}
                    className="bg-bellefuOrange hover:bg-orange-400 rounded-md text-white md:py-2 py-2 px-3 md:px-4"
                  >
                    {" "}
                    Cancel
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (totalPrice !== "") {
                        setAmountEntered(true);
                      } else {
                        toast.error("Enter an amount to proceed", {
                          position: "top-right",
                        });
                      }
                    }}
                    className="bg-bellefuOrange hover:bg-orange-400 rounded-md text-white md:py-2 py-2 px-3 md:px-4"
                  >
                    {" "}
                    Proceed
                  </button>
                )}
              </div>

              <div className="w-full">
                <div>
                  <div className="flex px-8">
                    <div className=" mx-auto my-7 justify-center items-center flex  flex-col-reverse">
                      {amountEntered && (
                        <div className="md:mr-auto ml-3 my-4 hover:bg-white">
                          <button
                            onClick={() => {
                              handleFlutterPayment({
                                callback: (response) => {
                                  console.log(response);
                                  setHasPaid(response);
                                  closePaymentModal(); // this will close the modal programmatically
                                  if (response.status === "successful") {
                                    toast.success(
                                      "Payment completed successfully"
                                    );

                                    axios
                                      .post(`${apiData}fund/wallet`, {
                                        userId: userId?.id,
                                        amount: rate,
                                      })
                                      .then((res) => {
                                        if (res.data.status) {
                                          toast.success(
                                            "Wallet updated successfully"
                                          );
                                          setTotalPrice("");
                                          router.push("/users/my-wallet");
                                        }
                                      });
                                  }
                                },
                                onClose: () => {},
                              });
                            }}
                            className="flex items-center  outline outline-bellefuOrange rounded-lg px-3 py-2"
                          >
                            <img
                              src="/card.png"
                              className="w-40"
                              alt="visa card"
                            />
                            {/* <span className="pl-4 md:text-base text-sm">Pay with Card</span> */}
                          </button>
                        </div>
                      )}

                      {amountEntered && (
                        <div className="w-[70%] ">
                          <div className="flex w-full justify-center items-center ">
                            <PayPalButtons
                              createOrder={(data, actions) =>
                                createOrder(data, actions)
                              }
                              onApprove={async (data, actions) => {
                                return actions.order
                                  .capture()
                                  .then(async (details) => {
                                    if (details.status == "COMPLETED") {
                                      setTotalPrice("");
                                      toast.success(
                                        "Payment completed successfully",
                                        {
                                          position: "top-right",
                                        }
                                      );

                                     await axios
                                        .post(`${apiData}fund/wallet`, {
                                          userId: userId?.id,
                                          amount: rate,
                                        })
                                        .then((res) => {
                                          if (res.data.status) {
                                            toast.success(
                                              "Wallet updated successfully"
                                            );
                                            setTotalPrice("");
                                            router.push("/users/my-wallet");
                                          }
                                        });
                                    }
                                  });
                              }}
                              // onApprove={(data, actions) => onApprove(data, actions)}
                            />
                          </div>

                          {/* <div className="flex my-10 justify-center items-center">
                  {" "}
                  <Buttonchlps
                    className="md:text-base text-sm"
                    onClick={sendApplication}
                    text="Complete Application"
                  />
                </div> */}

                          {/* <button className=" outline   ">
                          <img
                            src="/Paypal.png"
                            className="w-40"
                            alt="paypl card"
                          />
                     
                        </button> */}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

AddMoney.Layout = Layout;
export default AddMoney;
