import React, { useState } from "react";
import SimilarProducts from "./SimilarProducts";
import SingleProductDescription from "./SingleProductDescription";
import SingleProductSlider from "./SingleProductSlider";

const SingleProductBody = ({
  productDetails,
  similarProductDetails,
  verified,
}) => {
  const [viewAll, setViewAll] = useState(false);

  return (
    <div className="rounded-t-md -mt-5 lg:mt-0">
      <SingleProductSlider sliderDetails={productDetails} />
      <SingleProductDescription
        verified={verified}
        productDetails={productDetails}
      />
      <div className="mt-2">
        <div className="bg-bellefuWhite flex items-center px-7 justify-between pt-2 rounded-t-md">
          <p className="text-xl text-bellefuTitleBlack font-semibold tracking-wider">
            Similar Products
          </p>
          <p
            onClick={() => setViewAll(true)}
            className="text-bellefuOrange hover:text-orange-400 text-xs font-medium cursor-pointer tracking-wider"
          >
            View All
          </p>
        </div>
        <SimilarProducts
          view={viewAll}
          similarProductDetails={similarProductDetails}
        />
      </div>
    </div>
  );
};

export default SingleProductBody;
