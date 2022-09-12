import { useRouter } from "next/router";
import MainProductHeader from "../mainPageComponents/MainProductHeader";
import ProductsShop from "./ProductsShop";

const BodyShop = ({ shops }) => {
  const router = useRouter();
  return (
    <div className="max-w-6xl mx-auto z-40 mt-32">
      <div className=" mb-5 shadow-sm rounded-md">
        <MainProductHeader
          title="Trending Ads"

          // grid={grid}
          // changeView={setGrid}
        />
      </div>

      <ProductsShop shops={shops} />
    </div>
  );
};

export default BodyShop;
