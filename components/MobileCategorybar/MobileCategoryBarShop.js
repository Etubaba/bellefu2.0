import React from "react";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect } from "react";

import MobileCategoryShop from "./MobileCategoryShop";
import { categoryUrl } from "../../constant";

const MobileCategoryBarShop = ({ categories }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="shop" className=" overflow-x-scroll flex space-x-6 over">
      {categories?.map((category, index) => (
        <div key={index}>
          <MobileCategoryShop category={category} />
        </div>
      ))}
     
    </div>
  );
};

export default MobileCategoryBarShop;
