import React from "react";
import Layout from "../../components/postAdsComponent/Layout";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { handleTitleUpdate,handleDescriptionUpdate,handleTagUpdate ,handlePriceUpdate} from "../../features/bellefuSlice";

// const PriceSymbol=()=>{
//   // const getCountry = useSelector((state) => state.bellefu.countrySelected);

//   return(
//     <div >
//     <p className="text-bellefuGreen flex font-poppins font-semibold">
//       <p className='mr-1' dangerouslySetInnerHTML={{ __html: symbolic }} />
//     </p>
//   </div>
//   )

// };
export default function Details() {
  const symb_olic = useSelector((state) => state.bellefu.postAddata.symbo);
  const router = useRouter();
  const dispatch = useDispatch();

  const [inputtxt, setInputTxt] = useState("");
  const [ inpt,  setInpt] = useState("");
  const [inputtxtarr, setinputTxtArr] = useState([]);
  const [disablertag, setDisablertag] = useState(false);

  const handleArrUpdate = (e) => {
    e.preventDefault();
    if (inputtxt === "" || inputtxtarr.length >= 5) {
      toast.error("Tags can't be more than 5", {
        position: 'top-center',
      })} else {
      setinputTxtArr((prevState) => [...prevState, inputtxt]);
      setInputTxt("");
    }
  };

  const handleRemovetag = (tags) => {
    const newArr = inputtxtarr.filter((tag) => tag !== tags);
    setinputTxtArr(newArr);
  };

  const handleTitle = (e) => {
    dispatch(handleTitleUpdate(e.target.value));
  };
  const handlePrice = (e) => {
    dispatch(handlePriceUpdate(e.target.value));
  };
  const handleText = (e) => {
    setInpt(e.target.value)
    dispatch(handleDescriptionUpdate(e.target.value));
  };

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmit =(e)=>{
    e.preventDefault();
    if( inpt!==""){
          dispatch(handleTagUpdate(inputtxtarr));
          router.push('/postAds/Images')
 
    }else{
      toast.error("All fields are required", {
        position: 'top-center',
      })    }
  }
  return (
    <div className=" shadow bg-bellefuWhite rounded-md  lg:p-5 p-2">
      <div className="border lg:p-5 p-1 lg:mt-7 mt-2 rounded-sm">
        <div>
          <form action="#" method="POST">
            <div className=" overflow-hidden sm:rounded-md">
              <div className="lg:px-4 px-2 py-2 lg:py-5 sm:p-3">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      for="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product title <strong className="text-red-500">*</strong>
                    </label>
                    <input
                      onChange={handleTitle}
                      type="text"
                      className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <div className="flex">
                    <label
                      for="last-name"
                      className="flex text-sm font-medium text-gray-700"
                    >
                      Product Price <strong className="text-red-500">*</strong>
                      
                    </label>
                    <div className=" relative bottom-[3px] pl-[7px]">
                      <p className="text-bellefuGreen flex font-poppins font-semibold">
                        <p
                          className="mr-1 text-bellefuGreen"
                          dangerouslySetInnerHTML={{ __html:symb_olic}}
                        />
                      </p>
                      </div>
                    </div>
                    <input
                      onChange={handlePrice}
                      type="number"
                      className=" bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen mb-10 focus:outline-0 block w-full shadow-sm sm:text-sm border-gray-300 border-2 rounded-md"
                    />
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <div className="flex justify-between">
                    <label
                      for="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      tags <strong className="text-red-500">*</strong>
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                      Maximum : {inputtxtarr.length}/5
                    </label>
                  </div>
                  <div className="border-gray-300 border-2 rounded-md">
                    <div className=" p-3 flex flex-wrap">
                      {inputtxtarr.length <= 7
                        ? inputtxtarr.map((tags, index) => (
                            <span key={index} className="flex bg-gray-300 p-[3px] justify-around lg:w-[6vw] rounded-md m-[2px]">
                              <p>{tags}</p>
                              <MdClose
                                onClick={() => handleRemovetag(tags)}
                                className="text-[28px] cursor-pointer hover:bg-gray-400 p-[3px] rounded-md mt-[2px]"
                              />
                            </span>
                          ))
                        : null}
                    </div>
                    <div className="flex">
                      <input
                        onChange={(e) => setInputTxt(e.target.value)}
                        type="text"
                        disabled={disablertag}
                        value={inputtxt}
                        className="  bg-[white] p-[8px] mt-1 focus:ring-bellefuGreen focus:outline-0 block w-[100%] shadow-sm sm:text-sm "
                      />
                      <button
                        onClick={(e) => handleArrUpdate(e)}
                        class="flex justify-center items-center lg:w-[4vw] m-[5px] py-[3px] px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 "
                      >
                        Enter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:p-5 p-2">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div className="mt-1">
                <textarea
                  onChange={handleText}
                  rows={4}
                  className="shadow-sm p-2 lg:p-5 focus:outline-0 border-2 bg-[white] mt-1  w-full sm:text-sm  border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  defaultValue={""}
                />
              </div>
            </div>
            <div className="p-5 flex justify-between">
              <button
                onClick={handleBack}
                type="submit"
                class="flex justify-center items-center w-[15vw] py-2 px-4  shadow-sm text-sm font-medium rounded-md text-[black] bg-bellefuWhite  border hover:bg-[#e4e4e4] focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Back
              </button>
              <button
              onClick={handleSubmit}
              // disabled={inpt===""?true:false}
                type="submit"
                class="flex justify-center items-center w-[19vw] lg:w-[15vw] py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
Details.Layout = Layout;
