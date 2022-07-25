import Head from "next/head";
import { useRouter } from "next/router";
//import Products from "../../components/ecommerce/Products";
import ShopsItem from "./ShopsItem";

const Body = ({ shops }) => {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto z-40 mt-32">
      <Head>
        <title>Bellefu Digital Agro Connect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Bellefu is a agricultural products site and connection between farmers and buyers that offers a wide. We are into food products, agricultural machinery,farmers"
        />

        <link
          rel="icon"
          href="https://www.linkpicture.com/q/bellefuApplogo.jpg"
        />
      </Head>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-gray-800 text-xl tracking-wider font-bold">
          Shops
        </h3>

        <p
          className="text-gray-700 hover:text-bellefuGreen text-sm tracking-wider"
          onClick={() => router.push("/shops")}
        >
          View All products
        </p>
      </div>

      <ShopsItem shops={shops} />
    </div>
  );
};

export default Body;
