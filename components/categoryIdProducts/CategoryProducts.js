import React from "react";
import MainProductHeader from "../mainPageComponents/MainProductHeader";
import CategoryProductList from "./CategoryProductList";
import Loader from "../../constant";
import Head from "next/head";

const CategoryProducts = ({ product }) => {
  return (
    <div>
      <Head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={`goods or services for ${product[0]?.CatName}`}
        />
        <title>{product[0]?.CatName}</title>
      </Head>
      <MainProductHeader />
      {product?.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <Loader isLoading={true} />
        </div>
      ) : (
        <div className="bg-bellefuBackground mt-1 rounded-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 ">
          {product?.map((product) => (
            <CategoryProductList key={product?.productId} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
