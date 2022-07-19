import React, { useState, useEffect } from "react";
import FavouriteProduct from "./FavouriteProduct";
import { productData } from "../../../productData";
import { apiData } from "../../../constant";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Skeleto from "../../mainPageComponents/Skeleton";

const FavouriteProducts = () => {
  const [favProduct, setFavProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const skeleBig = [<Skeleto />, <Skeleto />, <Skeleto />, <Skeleto />];

  const router = useRouter();

  const userId = useSelector((state) => state.bellefu?.profileDetails);
  const favCheck = useSelector((state) => state.bellefu?.favLoad);

  useEffect(() => {
    const getFav = async () => {
      await axios
        .get(`${apiData}get/user/favorite/${userId?.id}`)
        .then((res) => setFavProduct(res.data.data))
        .catch((err) => console.log(err));
    };
    getFav();
  }, [favCheck]);

  return (
    <div>
      {favProduct.length > 0 ? (
        <div className="bg-bellefuBackground mt-1 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 grid-flow-row-dense ">
          {loading
            ? favProduct?.map((product) => (
                <FavouriteProduct key={product.id} product={product} />
              ))
            : skeleBig.map((ske, index) => (
                <>
                  <div className="" key={index}>
                    {ske}
                  </div>
                  <div className="block sm:hidden lg:hidden">
                    <Stack spacing={1} className="block sm:hidden lg:hidden">
                      <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={170}
                      />
                      <Skeleton variant="text" width={"100%"} height={20} />
                      <Skeleton variant="text" width={"100%"} height={20} />
                      <div className="flex space-x-36">
                        <Skeleton
                          variant="rectangular"
                          className="mr-3"
                          width={100}
                          height={60}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={100}
                          height={60}
                        />
                      </div>
                    </Stack>
                  </div>
                </>
              ))}
        </div>
      ) : (
        <div className="h-auto mt-2">
          <div className="py-5">
            <div className="border mx-auto my-1 rounded-xl w-full lg:w-7/12 h-11/12 ">
              <div className="flex flex-col justify-center mt-24 mb-24 items-center">
                <MdProductionQuantityLimits className="text-6xl lg:text-8xl mb-3 text-gray-600" />
                <p className="text-sm text-center text-gray-600 mb-10 capitalize">
                  You do not have favorite product yet
                  <br />
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="flex hover:bg-orange-400 ease-in-out duration-300 rounded-md text-white py-2 lg:py-4 px-10 lg:px-28 space-x-3 bg-bellefuOrange"
                >
                  {/* < className="text-xl" />{" "} */}
                  <span>Add Favorite Products</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavouriteProducts;
