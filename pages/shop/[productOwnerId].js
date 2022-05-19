import React from "react";
import { useSelector } from "react-redux";
import ShopComponents from "../../components/shopComponents/ShopComponents";
import MobileShopSideBar from "../../components/SingleProduct/MobileShopSidebar";
import Head from "next/head";
import ShopSideBar from "../../components/SingleProduct/ShopSideBar";
import { userDId } from "../../features/bellefuSlice";
import { profileDetails } from "../../features/bellefuSlice";

const Shop = ({ userProducts }) => {
  const details = useSelector(userDId);
  const profile = useSelector(profileDetails);

  console.log(details)
  console.log(profile);

  const products = userProducts.data.data;

  return (
    <>
      <Head>
        <title>{products[0].title}</title>
      </Head>
      <div className="flex max-w-[95%] lg:max-w-[90%] mx-auto mt-28">
        <ShopSideBar userDetails={details} />
        <div className="flex-1">
          <ShopComponents products={products} />
          <MobileShopSideBar userDetails={details} />
        </div>
      </div>
    </>
  );
};

export default Shop;

//server side fetching of the full product details
export async function getServerSideProps(context) {
  const { productOwnerId } = context.query;

  const requests = await fetch(
    `https://bellefu.inmotionhub.xyz/api/general/list/user/product/${productOwnerId}`
  ).then((res) => res.json());

  return {
    props: {
      userProducts: requests,
    },
  };
}
