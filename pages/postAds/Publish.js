import React from "react";
import Layout from "../../components/postAdsComponent/Layout";
import {
  handlePlansUpdate,
  handleAdsPlanPriceUpdate,
} from "../../features/bellefuSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { MdVerified } from "react-icons/md";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { apiData } from "../../constant";

export default function Publish({ data1 }) {
  const [adsplans, setAdsPlans] = useState(data1.data);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const dataTopost = useSelector((state) => state.bellefu.postAddata);
  const dataTopost2 = useSelector((state) => state.bellefu.profileDetails);
  const dispatch = useDispatch();

  //  plans handling section

  const handleFeatured = (e) => {
    dispatch(handlePlansUpdate("featured"));
    dispatch(handleAdsPlanPriceUpdate(Number(e)));
    router.push("/postAds/Payment");
  };
  const handleUrgent = (e) => {
    dispatch(handlePlansUpdate("urgent"));
    dispatch(handleAdsPlanPriceUpdate(Number(e)));
    router.push("/postAds/Payment");
  };
  const handleHighlighted = (e) => {
    dispatch(handlePlansUpdate("highlighted"));
    dispatch(handleAdsPlanPriceUpdate(Number(e)));

    router.push("/postAds/Payment");
  };

  const handleFree = () => {
    dispatch(handlePlansUpdate("free"));
  };

  // ends here#########################
  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };

  // publish ads.... section wey i do beware###########################

  const handlePublish = (e) => {
    e.preventDefault();

    if (dataTopost.plans === "") {
      toast.error("You must choose a plan", {
        position: "top-center",
      });
    } else if (
      dataTopost.plans === "" ||
      dataTopost.categoryid === "" ||
      dataTopost.subcategoryid === "" ||
      dataTopost.title === "" ||
      dataTopost.location === "" ||
      dataTopost.countrycode === "" ||
      dataTopost.states === "" ||
      dataTopost.price === null ||
      dataTopost.tag.length === 0 ||
      dataTopost.cityCode === "" ||
      dataTopost.description === ""
    ) {
      toast.error("All fields are required", {
        position: "top-center",
      });
    } else {
      const formData = new FormData();
      //  things i dey post from redux store
      formData.append("title", dataTopost.title);
      formData.append("location", dataTopost.location);
      // see the image dey show for payload wen i post but wen e reach backend e no dey show
      formData.append("images1", dataTopost.images[0]);
      formData.append("images2", dataTopost.images[1]);
      formData.append("images3", dataTopost.images[2]);
      formData.append("images4", dataTopost.images[3]);
      formData.append("images5", dataTopost.images[4]);
      formData.append("images6", dataTopost.images[5]);
      formData.append("images7", dataTopost.images[6]);
      formData.append("images8", dataTopost.images[7]);
      formData.append("images9", dataTopost.images[8]);
      formData.append("images10", dataTopost.images[9]);
      formData.append("video", dataTopost.videofile);
      formData.append("categoryid", dataTopost.categoryid);
      formData.append("subcategoryid", dataTopost.subcategoryid);
      formData.append("shop", false);
      formData.append("device", "web");
      formData.append("price", dataTopost.price);
      formData.append("description", dataTopost.description);
      formData.append(
        "tag1",
        dataTopost.tag[0] === undefined ? "" : dataTopost.tag[0]
      );
      formData.append(
        "tag2",
        dataTopost.tag[1] === undefined ? "" : dataTopost.tag[1]
      );
      formData.append(
        "tag3",
        dataTopost.tag[2] === undefined ? "" : dataTopost.tag[2]
      );
      formData.append(
        "tag4",
        dataTopost.tag[3] === undefined ? "" : dataTopost.tag[3]
      );
      formData.append(
        "tag5",
        dataTopost.tag[4] === undefined ? "" : dataTopost.tag[4]
      );
      formData.append("phone", dataTopost2.phone);
      formData.append("userid", dataTopost2.id);
      formData.append("citycode", dataTopost.cityCode);
      formData.append("countrycode", dataTopost.countrycode);
      formData.append("states", dataTopost.states);
      formData.append("currencyCode", dataTopost.currencyCode);
      formData.append("plans", dataTopost.plans);

      //console.log(formData);
      axios({
        method: "POST",
        url: `${apiData}create/product`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          if (res.data.status) {
            setShowSuccess(true);
            toast.success("Product published successfully", {
              position: "top-center",
            });
          }
          // res.status === 200
          //   ? setShowSuccess(false)
          //   : setShowSuccess(true) &&
          //   toast.error("Server busy. Try again", {
          //     position: "top-center",
          //   });
        })
        .catch((err) =>
          err
            ? toast.error("Something happend. Try again", {
                position: "top-center",
              })
            : null
        );
    }
  };

  const handleHome = (e) => {
    e.preventDefault();
    router.push("/postAds");
  };

  return (
    <div className="rounded-lg  bg-bellefuWhite h-auto w-auto p-10 ">
      {!showSuccess ? (
        <>
          <div className="w-[93%] my-2 p-5 lg:m-10 border rounded-lg hover:bg-[#F9FDF5]  h-auto">
            <div className="sm:flex lg:flex">
              <input
                onClick={() => {
                  handleFeatured(adsplans?.featuredFee);
                }}
                id="ads_plan"
                name="plans"
                type="radio"
                className="focus:ring-bellefuGreen h-4 w-4 text-bellefuGreen border-gray-300"
              />
              <div className="ml-[4%]">
                <h3 className="font-semibold">BOOSTER 1:</h3>
                <p className="text-[#3F3F3F] mb-3 text-base">
                  Featured Ads attracts high quality views and are displayed
                  prominently in the featured ads section on the home page
                </p>
              </div>
              <div className="ml-[6%]">
                <p className="text-[#3F3F3F] text-[14px] mb-3 font-medium">
                  {`$${adsplans?.featuredFee} FOR ${adsplans?.featured_product_duration} DAYS`}
                </p>
                <h3 className="text-base p-[5px] text-[16px] rounded-md text-[white] bg-bellefuOrange">
                  RECOMMENDED
                </h3>
              </div>
            </div>
          </div>
          <div className="w-[93%] my-2 p-5 lg:m-10 border rounded-lg hover:bg-[#F9FDF5]  h-auto">
            <div className="sm:flex lg:flex ">
              <input
                onClick={() => {
                  handleUrgent(adsplans?.urgentFee);
                }}
                id="ads_plan"
                name="plans"
                type="radio"
                className="focus:ring-bellefuGreen h-4 w-4  text-bellefuGreen border-gray-300"
              />
              <div className="ml-[4%]">
                <h3 className="font-semibold">BOOSTER 2:</h3>
                <p className="text-[#3F3F3F] mb-3 text-base">
                  Make your ads stand out and let viewers know that your advert
                  is time-bound
                </p>
              </div>
              <div className="ml-[10%]">
                <p className="text-[#3F3F3F] text-[14px] mb-3 font-medium">
                  {`$${adsplans?.urgentFee} FOR ${adsplans?.urgentDuration} DAYS`}
                </p>
                <pre className="text-base p-[5px] text-[16px] rounded-md text-[white] bg-[orangered]">
                  MORE RECOMMENDED
                </pre>
              </div>
            </div>
          </div>
          <div className="w-[93%] my-2 p-5 lg:m-10 border rounded-lg hover:bg-[#F9FDF5]  h-auto">
            <div className="sm:flex lg:flex">
              <input
                onClick={() => {
                  handleHighlighted(adsplans?.highlightedFee);
                }}
                id="ads_plan"
                name="plans"
                type="radio"
                className="focus:ring-bellefuGreen h-4 w-4  text-bellefuGreen border-gray-300"
              />
              <div className="ml-[4%]">
                <h3 className="font-semibold">BOOSTER 3:</h3>
                <p className="text-[#3F3F3F] mb-3 text-base">
                  Make your ads highlighted with borders in the search listing
                  result page.Easy to focus on.
                </p>
              </div>
              <div className="ml-[6%]">
                <p className="text-[#3F3F3F] text-[14px] mb-3 font-medium">
                  {`$${adsplans?.highlightedFee} FOR ${adsplans?.highlightedDuration} DAYS`}
                </p>
                <pre className="text-base p-[5px] text-[16px] rounded-md text-[white] bg-bellefuGreen">
                  MOST RECOMMENDED
                </pre>
              </div>
            </div>
          </div>
          <div className="w-[93%] p-5 my-2 lg:m-10 border rounded-lg hover:bg-[#F9FDF5]  h-auto">
            <div className="sm:flex lg:flex">
              <input
                id="ads_plan"
                onClick={handleFree}
                name="plans"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4  text-indigo-600 border-gray-300"
              />
              <div className="ml-[4%]">
                <h3 className="font-semibold">POST FREE AD:</h3>
                <p className="text-[#3F3F3F] mb-3 text-base">
                  Just post an ordinary ad
                </p>
              </div>
              <div className="ml-[60%]">
                <p className="text-[#3F3F3F] text-[14px] mb-3 font-medium">
                  FREE
                </p>
              </div>
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
              onClick={handlePublish}
              type="submit"
              class="flex justify-center items-center w-[15vw] py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Publish
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col border rounded-lg justify-center py-10 mt-[5%]  mb-24 items-center">
          <MdVerified className="text-8xl text-bellefuGreen mb-5 " />
          <p className="mb-7 text-center">
            <strong> Congrats !!!</strong>
            <br /> Your Product is under Review
          </p>

          <button
            onClick={handleHome}
            type="submit"
            class="flex justify-center items-center lg:w-[15vw] py-2 px-4 mt-[30px]  border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-bellefuOrange hover:bg-[#ffc253] focus:outline-none focus:ring-2 focus:ring-offset-2 "
          >
            Post more ads
          </button>
        </div>
      )}
    </div>
  );
}
Publish.Layout = Layout;
export async function getServerSideProps() {
  const [data1Res] = await Promise.all([fetch(`${apiData}view/product/plans`)]);

  const [data1] = await Promise.all([data1Res.json()]);
  //  console.log(data);
  return {
    props: {
      data1,
    },
  };
}
