import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { useSelector, useDispatch } from "react-redux";
import { FaCamera } from "react-icons/fa";

import Image from "next/image";

import { useDropzone } from "react-dropzone";

import axios from "axios";
import { toast } from "react-toastify";
import GovId from "../components/GovId";
// import Skeleton from "@mui/material/Skeleton";
import { useRouter } from "next/router";
import { shopApi } from "../constant";
import Payment from "../components/paymentComponent/Payment";
import { payment, shopCreated, shopId } from "../features/bellefuSlice";
import Head from "next/head";
import classNames from "classnames";

export default function CreateShop() {
  const [checkpass, setCheckPass] = useState(false);
  const [terms, setTerms] = useState(false);
  const [modalopen, setModalOpen] = useState(false);
  const [shopname, setShopName] = useState(null);
  const [bankname, setBankName] = useState(null);
  const [accountname, setAccountName] = useState(null);
  const [accountnumber, setAccountNumber] = useState(null);
  const [accounttype, setAccountType] = useState(null);
  const [nextofkin, setNextOfKin] = useState(null);
  const [description, setDescription] = useState(null);
  const [address, setAddress] = useState(null);
  const [files, setFiles] = useState(null);
  const [files2, setFiles2] = useState(null);
  const [govid, setGovid] = useState([]);
  const [paymentModal, setPaymentModal] = useState(false);
  const [subType, setSubType] = useState(25);
  const [fee, setFee] = useState(null);

  const router = useRouter();

  const dispatch = useDispatch();
  const userThings = useSelector((state) => state.bellefu.profileDetails);
  //const userThings = useSelector((state) => state.bellefu.userDetails);

  const hasPaid = useSelector((state) => state.bellefu?.hasPaid);
  const idchecker = useSelector((state) => state.bellefu.verificationStatus);

  const handleGovid = (event) => {
    setGovid(event);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(URL.createObjectURL(acceptedFiles[0]));

      for (let i = 0; i < acceptedFiles.length; i++) {
        let loopedFile = acceptedFiles[i];

        setFiles2(loopedFile);
      }
    },
  });

  const handleShopNameCheck = () => {
    axios
      .post(`${shopApi}name/checker`, {
        shopName: shopname,
      })
      .then((res) => {
        if (res.data.status === true) {
          setCheckPass(true);
          toast.error("Shop Name Alreay exist", {
            position: "top-center",
          });
        } else {
          setCheckPass(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if (hasPaid) setPaymentModal(false)

  const handleCreate = (sub) => {
    //e.preventDefault();
    // if (sub) {
    //   console.log(sub);
    //   return;
    // }
    if (hasPaid) {
      const formData = new FormData();
      formData.append("userId", userThings?.id);
      formData.append("shopName", shopname);
      formData.append("description", description);
      formData.append("countryCode", userThings?.country_code);
      formData.append("countryCode", userThings?.country_code);
      formData.append("stateCode", userThings?.state);
      formData.append("address", address);
      formData.append("subType", sub === "25" ? "monthly" : "yearly");
      formData.append("accountNumber", accountnumber);
      formData.append("accountType", accounttype);
      formData.append("accountName", accountname);
      formData.append("bankName", bankname);
      formData.append("nextOfKin", nextofkin);
      formData.append("subscriptionAmount", 100);
      formData.append("image", files2 === null ? "" : files2);
      if (idchecker?.id === false) {
        formData.append("file1", govid[0] === undefined ? "" : govid[0]);
        formData.append("file2", govid[1] === undefined ? "" : govid[1]);
      } else {
        null;
      }

      if (
        shopname === null ||
        bankname === null ||
        accountname === null ||
        accountnumber === null ||
        accounttype === null ||
        nextofkin === null ||
        description === null ||
        address === null ||
        files2 === null
          ? toast.error("Shop Logo is required", {
              position: "top-center",
            })
          : null || terms === false
          ? toast.error("Accept Terms and Condition", {
              position: "top-center",
            })
          : null || idchecker === false
          ? govid.length === 0
            ? toast.error("Govt. Issued ID id required", {
                position: "top-center",
              })
            : null
          : null
      ) {
        toast.error("All fields are required", {
          position: "top-center",
        });
      } else {
        axios({
          method: "POST",
          url: `${shopApi}create`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            if (res.data.status) {
              dispatch(payment(false));
              dispatch(shopCreated(true));
              dispatch(shopId(res.data.data.id));
              localStorage.removeItem("coin");
              setModalOpen(true);
              setTerms(false);
              setShopName("");
              setBankName("");
              setAccountName("");
              setAccountNumber("");
              setAccountType("");
              setNextOfKin("");
              setDescription("");

              setAddress("");
              setFiles(null);
              setFiles2(null);
              setGovid([]);
            } else {
              toast.error(`${res.data.msg}`, {
                position: "top-center",
              });
            }
          })
          .catch((err) => {
            toast.error(`${err}`, {
              position: "top-center",
            });
          });
      }
    } else {
      toast.error("Complete payment to create shop");
      setPaymentModal(true);
    }
  };

  useEffect(() => {
    const getSub = async () => {
      axios
        .get(`${shopApi}get/subscription/fee`)
        .then((res) => setFee(res.data.data));
    };

    getSub();
  }, []);

  return (
    <>
      <Head>
        <title>Bellefu Digital Agro Connect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bellefu is a agricultural products site and connection between farmers and buyers that offers a wide. We are into food products, agricultural machinery,farmers"
        />

        <link
          rel="icon"
          href="https://www.linkpicture.com/q/bellefuApplogo.jpg"
        />
      </Head>
      <Modal
        open={modalopen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', justifyContent: 'center', alignItems: 'center' }}
      >
        <div
          className="flex flex-col items-center justify-center mx-auto mt-52 pt-2  rounded-lg shadow-md   bg-bellefuWhite w-[80%] md:w-[60%] lg:w-[40%]"
          // sx={edit}
        >
          <div className="flex justify-center items-center">
            {/* <WarningAmberIcon sx={{ fontSize: 50 }} /> */}
            <IoMdCheckmarkCircleOutline className="md:text-6xl text-bellefuGreen text-6xl mt-4 md:mb-3" />
          </div>
          {/* <hr className="mb-4" /> */}

          <p className="p-1 mx-3 mb-2 md:mb-6 text-center ">
            {" "}
            Congratulations!!! Your shop creation was successful
          </p>
          <div onClick={() => router.push(`/shop/upload-product`)}>
            <button
              onClick={() => router.push(`/shop/upload-product`)}
              className="py-1 lg:py-1.5 hover:bg-orange-400 mb-5 px-1.5 lg:px-3 rounded-xl bg-bellefuOrange text-white text-sm lg:text-sm"
            >
              Add product
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={paymentModal}
        onClose={() => setPaymentModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{overflow: "auto"}}
      >
        <div className="flex flex-col items-center justify-center mx-auto h-auto pt-2 mt-40 rounded-lg shadow-md   w-[70%] md:w-[70%] lg:w-[70%]">
          <Payment sub={setSubType} modal={setPaymentModal} handleCreate={handleCreate} />
        </div>
      </Modal>

      <div className="flex justify-center items-center mt-[10%] md:mt-[5%] lg:mt-0">
        <div className="w-[90%] lg:w-[60%] mt-[10%]">
          <div className="bg-[#f8f8f8]   rounded-md border border-[#bbb9bb]  mb-5">
            <div className="p-5 flex  items-center justify-between">
              <p className="text-lg text-gray-700 font-semibold tracking-wider">
                Create Shop
              </p>
              <p className="text-lg text-gray-700 font-semibold tracking-wider">
                ${fee?.monthly}/monthly & ${fee?.yearly}/yearly
              </p>
            </div>
            <hr style={{ backgroundColor: "#343434" }} />
            <div className="  p-5 mt-7 ">
              <div className="justify-center items-center flex ">
                <div className="flex justify-center">
                  <Image
                    width="120"
                    height="110"
                    className="  object-contain  rounded-full ring-2 ring-crystamolPink"
                    // src={`https://crystamol.paddyhosting.com/api/images/user/${user?.avatar}`}
                    src={files === null ? "/869432.png" : files}
                    alt="Logo"
                  />
                  <div className="mt-14 -ml-5 z-30 cursor-pointer bg-slate-400 rounded-full w-8 h-8 hover:bg-slate-300 flex justify-center items-center p-3">
                    <label for="fileupload">
                      <div className=" flex cursor-pointer justify-center items-center">
                        <FaCamera className="w-4 h-4 cursor-pointer" />
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        id="fileupload"
                        {...getInputProps()}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <form action="#" method="POST">
                  <div className=" overflow-hidden sm:rounded-md">
                    <div className=" sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label className=" text-sm font-medium text-gray-700 flex justify-between">
                            <p>
                              Shop Name{" "}
                              <strong className="text-red-500">*</strong>
                            </p>
                            {checkpass ? (
                              <p className="text-red-600 relative right-3">
                                Name Already exist ❌
                              </p>
                            ) : null}
                          </label>
                          <input
                            onBlur={handleShopNameCheck}
                            value={shopname}
                            onChange={(e) => setShopName(e.target.value)}
                            type="text"
                            className="  bg-[white] p-[12px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block  text-sm font-medium text-gray-700">
                            Store description{" "}
                            <strong className="text-red-500">*</strong>
                          </label>
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className=" h-12  bg-[white] p-[12px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block  text-sm font-medium text-gray-700">
                            Next of Kin{" "}
                            <strong className="text-red-500">*</strong>
                          </label>
                          <input
                            value={nextofkin}
                            type="text"
                            onChange={(e) => setNextOfKin(e.target.value)}
                            autoComplete
                            className="  h-12  bg-[white] p-[12px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label className="block  text-sm font-medium text-gray-700">
                            Address <strong className="text-red-500">*</strong>
                          </label>
                          <input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            type="text"
                            autoComplete
                            className="  h-12  bg-[white] p-[12px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            for="last-name"
                            className="block  text-sm font-medium text-gray-700"
                          >
                            Bank name{" "}
                            <strong className="text-red-500">*</strong>
                          </label>
                          <input
                            value={bankname}
                            type="text"
                            onChange={(e) => setBankName(e.target.value)}
                            className="  bg-[white] p-[12px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            for="last-name"
                            className="block  text-sm font-medium text-gray-700"
                          >
                            Account name{" "}
                            <strong className="text-red-500">*</strong>
                          </label>
                          <input
                            value={accountname}
                            type="text"
                            onChange={(e) => setAccountName(e.target.value)}
                            className="  h-12  bg-[white] p-[12px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Account number{" "}
                            <strong className="text-red-500">*</strong>
                          </label>
                          <input
                            value={accountnumber}
                            type="number"
                            onChange={(e) => setAccountNumber(e.target.value)}
                            className="  h-12  bg-[white] p-[12px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label className="block text-sm font-medium text-gray-700">
                            Account Type{" "}
                            <strong className="text-red-500">*</strong>
                          </label>
                          <input
                            value={accounttype}
                            placeHolder="e.g savings"
                            type="text"
                            onChange={(e) => setAccountType(e.target.value)}
                            className="  h-12  bg-[white] p-[12px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                          />
                        </div>
                      </div>
                      {!idchecker?.id && (
                        <div className="col-span-3 sm:col-span-3 w-full">
                          <label className="block  text-sm font-medium mt-3 text-gray-700">
                            Upload Govt. Issued ID{" "}
                            <strong className="text-red-500">*</strong>
                          </label>

                          <GovId handleGovid={handleGovid} />
                        </div>
                      )}
                      <div className="flex items-center space-x-3 col-span-6 sm:col-span-3">
                        <input
                          onClick={() => setTerms(!terms)}
                          type="checkbox"
                          className="w-5 h-5"
                          checked={terms}
                        />
                        <label
                          onClick={() => router.push("/policy")}
                          className="block hover:text-orange-300 underline text-sm font-medium mb-2 text-bellefuOrange"
                        >
                          Terms & Conditions{" "}
                          <strong className="text-red-500">*</strong>
                        </label>
                      </div>
                    </div>
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        setPaymentModal(true);
                      }}
                      className="flex justify-end items-end  "
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setPaymentModal(true);
                        }}
                        className={classNames("bg-bellefuGreen rounded-lg text-white px-12 md:px-20 md:py-3 py-2 ", {"bg-bellefuGreenWithOpacity hover:cursor-not-allowed": !terms})}
                        disabled={!terms}
                      >
                        Proceed To Payment
                      </button>
                    </div>

                    {/* <button
                      onClick={handleCreate}
                      class="flex justify-center items-centerw-[19vw]  w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 mt-5"
                    >
                      Submit
                    </button> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
