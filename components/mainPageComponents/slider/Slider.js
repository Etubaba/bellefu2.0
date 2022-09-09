import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { sliderUrl } from "../../../constant";

export default function Slider({ slider }) {
  const [newSlider] = slider;

  console.log("slider", newSlider);
  return (
    <div className="w-[99%]">
      <Carousel
        showArrows={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
      >
        {newSlider.value?.map((slideimage, index) => (
          <div className="relative" key={index}>
            <img
              fetchpriority="high"
              className="h-52 md:h-64 lg:h-[250px] w-full rounded-xl  "
              src={`${sliderUrl}${slideimage}`}
              alt={slideimage}
            />
            {/* <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-bellefuOrange shadow-md hover:bg-orange-300 p-2 rounded-md text-white">
              <a
                href={
                  process.env.NODE_ENV === "development"
                    ? "http://localhost:3000"
                    : "https://bellefu30web.vercel.app/"
                }
                target="_blank"
              >  bbbb         
                Learn More
              </a>
            </button> */}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
