import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ShopProducts from "../../components/shopProductComponent/ShopProducts";
import ShopSideBar from "../../components/SingleProduct/ShopSideBar";
import { shopApi } from "../../constant";

const ShopProduct = () => {
  const pDetails = useSelector((state) => state.bellefu?.shopProduct);

  const [productDetails, setProductDetails] = useState([]);

  // handling getting the product details of a user
  useEffect(() => {
    const getProductDetails = async () => {
      await axios
        .get(`${shopApi}view/single/${pDetails}`)
        .then((res) => setProductDetails(res.data.data));
    };
    getProductDetails();
  }, []);

  console.log("slug", pDetails);

  return (
    <div className="flex max-w-[95%] lg:max-w-[90%] mx-auto mt-28">
      <ShopSideBar userDetails={productDetails[0]} />
      <ShopProducts productDetails={productDetails[0]} />
    </div>
  );
};

export default ShopProduct;

// //server side fetching of the full product details
// export async function getServerSideProps(context) {
//   const { slug, productSlug } = context.query;

//   const requests = await fetch(
//     `https://bellefu.inmotionhub.xyz/api/shop/view/single/${slug}/${productSlug}`
//   ).then((res) => res.json());

//   return {
//     props: {
//       details: requests,
//     },
//   };
// }
