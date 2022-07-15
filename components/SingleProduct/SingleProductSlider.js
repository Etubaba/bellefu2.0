import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { productImageUrl } from "../../constant";

// import { images } from "../../productData";

const SingleProductSlider = ({ sliderDetails }) => {
  // getting the plan status to display either promoted or not
  const plan = sliderDetails[0]?.planName;

  // console.log("sliderDetails", sliderDetails);

  // getting the images to display in the carousel
  const images = sliderDetails[0]?.images;

  return (
    <div className="p-2 lg:p-5 bg-bellefuWhite rounded-t-md  relative">
      <div className="w-full lg:w-[60%] mx-auto">
        <Carousel
          showArrows={true}
          showThumbs={false}
          internal={4000}
          infiniteLoop
          autoplay
          showStatus={false}
        >
          {images?.map((image, index) => (
            <img
              loading="lazy"
              src={`${productImageUrl}${image}`}
              key={index}
              className="rounded-md w-full object-contain sm:object-fill "
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SingleProductSlider;
