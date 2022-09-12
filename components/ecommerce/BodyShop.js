import { useRouter } from "next/router";
import MainProductHeader from "../mainPageComponents/MainProductHeader";
import ProductsShop from "./ProductsShop";
import ShopSlider from "../mainPageComponents/slider/ShopSlider";
import { useState } from "react";
import { useSelector } from "react-redux";

const BodyShop = ({ shops }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [grid, setGrid] = useState(true);

  const indexData = useSelector((state) => state.bellefu.indexData);
  const slider = indexData?.slider[0]?.value;
  return (
    <div className="max-w-6xl mx-auto z-40 ">
      <div className="hidden md:block lg:block">
        <ShopSlider slider={slider} />
      </div>
      <div className=" mb-5 shadow-sm rounded-md">
        <MainProductHeader
          title="Trending Ads"
          grid={grid}
          changeView={setGrid}
        />
      </div>

      <ProductsShop grid={grid} shops={shops} />
    </div>
  );
};

export default BodyShop;
