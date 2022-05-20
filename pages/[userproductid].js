import { useState } from "react";
import Head from "next/head";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineCaretRight } from "react-icons/ai";
import CreateProduct from "../components/CreateProduct";
import { profileDetails } from "../features/bellefuSlice";

export async function getServerSideProps({params}) {
  const { userproductid: userProductId } = params;
  const res = await Promise.all([
    fetch("https://bellefu.inmotionhub.xyz/api/web30/get/postadd"),
    fetch("https://bellefu.inmotionhub.xyz/api/web30/get/web/index"),
    fetch(`https://bellefu.inmotionhub.xyz/api/general/list/user/product/${userProductId}`),
  ]);

  const data = await Promise.all([res[0].json(), res[1].json(), res[2].json()])
  const [countryData, categoryData, userProducts] = data;

  return {
    props: {
      countries: countryData.countries,
      categories: categoryData.categories,
      userProducts: userProducts.data.data,
    }
  }
}


const ProductUpload = ({categories, countries, userProducts}) => {
  const userDetails = useSelector(profileDetails);
  const [product, setProduct] = useState("select product want to upload.");
  const [productId, setProductId] = useState(1);
  const [normalPrice, setNormalPrice] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [sellCondition, setSellCondition] = useState("");
  const [size, setSize] = useState("what is the size of your product?");
  const [openProductList, setopenProductList] = useState(false);
  const [openSizeList, setopenSizeList] = useState(false);
  const [isNewProduct, setNewProduct] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const sizes = ["small", "medium", "large",];

  const onChange = (input, setStateHandler) => (evt) => {
    //if (formFields[input]) return;
    if ((input === "promoPrice" || input === "weight") && isNaN(evt.target.value)) return ;

    setStateHandler(evt.target.value);
  };
  let elem;
  const onClick = (input) => () => {
   elem = document.getElementById(input);
    
    if (!elem.checked) elem.click()
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log({shopId: userDetails.shopId, productId, normalPrice, promoPrice, size, weight, sellingCondition: sellCondition, shop: true});

    setLoading(true);

    fetch("https://bellefu.inmotionhub.xyz/api/shop/push/product/shop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shopId: userDetails.shopId, 
        id: productId, 
        normalPrice, 
        promoPrice, 
        size, 
        weight, 
        sellingCondition: sellCondition, 
        shop: true,
      }),
    })
    .then(res => res.json())
    .then(resData => {
      setLoading(false);

      if (resData.status) {
        const formFields = {setProduct, setNormalPrice, setPromoPrice, setWeight, setSize, setSellCondition};

        for (const key in formFields) {
          if (key === "setProduct") formFields[key]("select product want to upload.");
          else if (key === "setSize") formFields[key]("what is the size of your product?");
          else formFields[key]("");
        }

        elem?.checked = false;

        toast.success("shop product upload success!", {
          position: toast.POSITION.TOP_CENTER,
        })
      } else {
        toast.error("server busy. try again later", {
          position: toast.POSITION.TOP_CENTER,
        })
      }
    })
  }

  return (
    <>
    <Head>
      <title>Shop: Product Upload</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div className="mt-32">
      {!isNewProduct ? <>
      <h1 className="text-center text-2xl font-bold ">Upload Product</h1>
      <form className="w-[90%] md:w-[60%] lg:w-[50%] mx-auto border-2 p-6 rounded-md" onSubmit={handleSubmit}>
        <div className="text-right">
          <button className="text-lg font-semibold bg-bellefuOrange hover:bg-orange-400 rounded-lg p-2 text-bellefuWhite" onClick={() => setNewProduct(true)}>Create New Product</button>
        </div>
        <div className="mb-3 relative">
          {/* <div className=""> */}
          <p className="text-lg font-semibold">Select Product</p>
          <div className="flex items-center justify-between mb-2 bg-white hover:bg-bellefuBackground p-2 rounded-md border-2 cursor-pointer" onClick={() => setopenProductList(prevState => !prevState)}>
            <div className="">
              {product}
            </div>
            <div>
              <AiOutlineCaretRight className={classNames("text-gray-300", {"rotate-90 text-bellefuOrange": openProductList})} />
            </div>
          </div>
          {openProductList && 
            <div className="w-full bg-bellefuWhite rounded border transition duration-300 ease-in absolute z-40">
              <ul className="rounded py-2">
                {userProducts?.map((item, index) => (
                  <li
                    onClick={() => {
                      setopenProductList(prevState => !prevState);
                      setProduct(item.title);
                      setNormalPrice(item.price);
                      setProductId(item.productId)
                    }}
                    key={index}
                    className="py-3 pl-6 hover:bg-gray-100 flex space-x-5 items-center cursor-pointer rounded"
                  >
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
          {/* </div> */}
        </div>
        <div className="mb-3">
          <p><label htmlFor="normal-price" className="text-lg font-semibold">Normal Price</label></p>
          <p><input type="text" id="normal-price" placeholder="200" value={normalPrice} readOnly={true} disabled className="pl-2 py-2 border-2 w-full rounded-md" /></p>
        </div>
        <div className="mb-3">
          <p><label htmlFor="promo-price" className="text-lg font-semibold">Promo Price (optional)</label></p>
          <p><input type="text" id="promo-price" placeholder="200" value={promoPrice} onChange={onChange("promoPrice", setPromoPrice)} className="pl-2 py-2 border-2 w-full rounded-md" /></p>
        </div>
        <div className="mb-3 relative">
          {/* <div className=""> */}
          <p className="text-lg font-semibold">Size or Dimension (optional)</p>
          <div className="flex items-center justify-between mb-2 bg-white hover:bg-bellefuBackground p-2 rounded-md border-2 cursor-pointer" onClick={() => setopenSizeList(prevState => !prevState)}>
            <div className="">
              {size}
            </div>
            <div>
              <AiOutlineCaretRight className={classNames("text-gray-300", {"rotate-90 text-bellefuOrange": openSizeList})} />
            </div>
          </div>
          {openSizeList && 
            <div className="w-full bg-bellefuWhite rounded border transition duration-300 ease-in absolute z-40">
              <ul className="rounded py-2">
                {sizes?.map((size, index) => (
                  <li
                    onClick={() => {
                      setopenSizeList(prevState => !prevState);
                      setSize(size);
                      // setNormalPrice(item.price)
                    }}
                    key={index}
                    className="py-3 pl-6 hover:bg-gray-100 flex space-x-5 items-center cursor-pointer rounded"
                  >
                    <span>{size}</span>
                  </li>
                ))}
              </ul>
            </div>
          }
        </div>
        <div className="mb-4">
          <p><label htmlFor="weight" className="text-lg font-semibold">Weight in kg (optional)</label></p>
          <p><input type="text" id="weight" placeholder="20" value={weight} onChange={onChange("weight", setWeight)} className="pl-2 py-2 border-2 w-full rounded-md" /></p>
        </div>
        <div className="mb-12">
          <p className="mb-1 text-lg font-semibold">Selling Condition:</p>
          <div className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer" id="main-container" onClick={onClick("new-prod")}>
            <div className="mr-auto" id="label-container"><label htmlFor="new-prod" className="text-lg hover:cursor-pointer">New Product</label></div>
            <div id="input-container"><input type="radio" id="new-prod" name="sell-condition" value="new" onClick={onChange("sellCondition", setSellCondition)} className="w-6 h-6 hover:cursor-pointer" /></div>
          </div>
          <div className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer" onClick={onClick("used-prod")}>
            <div className="mr-auto"><label htmlFor="used-prod" className="text-lg hover:cursor-pointer">Used Product</label></div>
            <div><input type="radio" id="used-prod" name="sell-condition" value="used" onClick={onChange("sellCondition", setSellCondition)} className="w-6 h-6 hover:cursor-pointer" /></div>
          </div>
          <div className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer" onClick={onClick("refurb-prod")}>
            <div className="mr-auto hover:cursor-pointer"><label htmlFor="refurb-prod" className="text-lg hover:cursor-pointer">Refurbished Product</label></div>
            <div><input type="radio" id="refurb-prod" name="sell-condition" value="refurbished" onClick={onChange("sellCondition", setSellCondition)} className="w-6 h-6 hover:cursor-pointer" /></div>
          </div>
        </div>
        <div className={classNames("text-center bg-bellefuOrange hover:bg-orange-500 text-bellefuWhite py-1 rounded-md font-semibold text-2xl", {"bg-orange-300 hover:bg-orange-300": isLoading})}>
          <button type="submit" className={classNames("w-full", {"hover:cursor-not-allowed": isLoading})} disabled={isLoading}>{!isLoading?"Submit":"Processing..."}</button>
        </div>
      </form>
      </>: <CreateProduct categories={categories} countries={countries} stateHandler={setNewProduct} />
      }
    </div>
    </>
  )
};

export default ProductUpload;