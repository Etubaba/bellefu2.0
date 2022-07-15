import { useState, useRef } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { profileDetails } from "../../features/bellefuSlice";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { toast } from "react-toastify";
import axios from "axios";
import { apiData } from "../../constant";
import { useRouter } from "next/router";

const AddMoney = () => {
  const [totalPrice, setTotalPrice] = useState("");
  const [hasPaid, setHasPaid] = useState({});
  const [convert, setConvert] = useState(false);
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
      title: "Add money",
      description: "Add money to your wallet",
      logo: "https://www.linkpicture.com/q/bellefuApplogo.jpg",
    },
  };

  const handleConvert = () => {
    const amount = Number(totalPrice) * 100;
    setRate(amount);
    setConvert(true);
  };

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
            <div className="bg-[#F8FDF2] hover:cursor-pointer mb-2 md:mr-12 py-8 rounded-lg border-2">
              <div className="items-center mb-10 justify-center px-7 md:px-24 flex space-y-3 flex-col ">
                <label className="font-semibold">
                  Enter Amount ({""} $ {""})
                </label>
                <input
                  type="number"
                  className="w-full rounded-xl py-3 pl-5 outline outline-gray-300 focus:outline-bellefuOrange"
                  value={totalPrice}
                  onChange={(e) => {
                    setTotalPrice(e.target.value);
                    setRate(Number(e.target.value * 100));
                  }}
                />
              </div>

              <div className="flex justify-center items-center  font-semibold space-x-6 my-10">
                <p>100 Bellicoin</p>
                <p>=</p>
                <p>$1</p>
              </div>
              {/* {(totalPrice !== '' && convert) && */}
              <div className="flex justify-center items-center  font-semibold space-x-6 my-5">
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
                  {""} Bellicoin
                </p>
              </div>

              {/* <div className="flex justify-center items-center my-5 ">
                <button
                  onClick={handleConvert}
                  className="bg-bellefuOrange hover:bg-orange-400 rounded-xl text-white md:py-4 py-2 px-12 md:px-28"
                >
                  {" "}
                  Convert
                </button>
              </div> */}

              <div className="w-full">
                <div>
                  <div className="flex px-8">
                    <div className=" mx-auto my-7 justify-center items-center flex flex-col md:space-x-72 space-y-5 md:space-y-0 md:flex-row">
                      <div className="md:mr-auto hover:bg-white">
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
                                  setTotalPrice("");
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
                      <div className="hover:bg-white">
                        <button className="flex items-center outline outline-[#0192D0] rounded-lg px-3 ">
                          <img
                            src="/Paypal.png"
                            className="w-40"
                            alt="paypl card"
                          />
                          {/* <span className="pl-4 md:text-base text-sm">Pay with Paypal</span> */}
                        </button>
                      </div>
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
