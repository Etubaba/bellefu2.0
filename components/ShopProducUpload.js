import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineCaretRight } from "react-icons/ai";
//import CreateProduct from "../components/CreateProduct";
import {
  profileDetails,
  newProductForShop,
  isProductForShop,
  shopId as shopIdentity,
} from "../features/bellefuSlice";
import { apiData, shopApi } from "../constant";
import axios from "axios";
//import axios from "axios";

// export async function getServerSideProps({params}) {
//   const { userproductid: userProductId } = params;
//   const res = await fetch(`https://bellefu.inmotionhub.xyz/api/general/list/user/product/${userProductId}`)

//   const data = await res.json();

//   return {
//     props: {
//       userProducts: data.data.data,
//     }
//   }
// }

const ShopProductUpload = ({ images, video }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector(profileDetails);
  const shopId = useSelector((state) => state.bellefu.shopIdentity);
  const dataTopost = useSelector((state) => state.bellefu.postAddata);
  const dataTopost2 = useSelector((state) => state.bellefu.profileDetails);
  const [userProducts, setUserProducts] = useState([]);
  const creatingNewProduct = useSelector(isProductForShop);
  const [product, setProduct] = useState("select product want to upload.");
  const [productActive, setProductActive] = useState(false);
  const [productId, setProductId] = useState(1);
  const [normalPrice, setNormalPrice] = useState("");
  const [promoPrice, setPromoPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [sellCondition, setSellCondition] = useState("");
  const [size, setSize] = useState("what is the size of your product?");
  const [sizeActive, setSizeActive] = useState(false);
  const [openProductList, setopenProductList] = useState(false);
  const [openSizeList, setopenSizeList] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const sizes = ["small", "medium", "large"];

  // console.log("shopId", shopId);

  //double check for shopId
  useEffect(() => {
    axios.get(`${shopApi}get/user/shop/${userDetails?.id}`).then((res) => {
      if (res.data.status) {
        dispatch(shopIdentity(res.data?.data?.id));
      }
    });
  }, []);

  const onChange = (input, setStateHandler) => (evt) => {
    //if (formFields[input]) return;
    if (
      (input === "promoPrice" || input === "weight") &&
      isNaN(evt.target.value)
    )
      return;

    setStateHandler(evt.target.value);
  };

  const onClick = (input) => () => {
    let elem = document.getElementById(input);

    if (!elem.checked) elem.click();
  };
  const handleNewProduct = () => {
    dispatch(newProductForShop(true));
    router.push("/postAds");
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    if (creatingNewProduct) {
      formData.append("title", dataTopost.title);
      formData.append("location", dataTopost.location);
      formData.append("images1", images[0]);
      // formData.append("images2", images[1]);
      // formData.append("images3", images[2]);
      // formData.append("images4", images[3]);
      // formData.append("images5", images[4]);
      // formData.append("images6", images[5]);
      // formData.append("images7", images[6]);
      // formData.append("images8", images[7]);
      // formData.append("images9", images[8]);
      // formData.append("images10", images[9]);
      // formData.append("video", video);
      // uploads.forEach(element => {
      //   formData.append("file[]", element);
      // });
      formData.append("categoryid", dataTopost.categoryid);
      formData.append("subcategoryid", dataTopost.subcategoryid);
      formData.append("price", dataTopost.price);
      formData.append("description", dataTopost.description);
      formData.append(
        "tag1",
        dataTopost.tag[0] === undefined ? "" : dataTopost.tag[0]
      );
      // formData.append(
      //   "tag2",
      //   dataTopost.tag[1] === undefined ? "" : dataTopost.tag[1]
      // );
      // formData.append(
      //   "tag3",
      //   dataTopost.tag[2] === undefined ? "" : dataTopost.tag[2]
      // );
      // formData.append(
      //   "tag4",
      //   dataTopost.tag[3] === undefined ? "" : dataTopost.tag[3]
      // );
      // formData.append(
      //   "tag5",
      //   dataTopost.tag[4] === undefined ? "" : dataTopost.tag[4]
      // );
      formData.append("phone", dataTopost2.phone);
      formData.append("userid", dataTopost2.id);
      formData.append("citycode", dataTopost.cityCode);
      formData.append("countrycode", dataTopost.countrycode);
      formData.append("states", dataTopost.states);
      formData.append("currencyCode", dataTopost.currencyCode);
      formData.append("shopId", shopId);
      formData.append("promoPrice", promoPrice);
      formData.append("size", size);
      formData.append("weight", weight);
      formData.append("sellingCondition", sellCondition);
      formData.append("device", "web");
      formData.append("shop", true);
      formData.append("plans", "free");

      setLoading(true);
      fetch(`${apiData}create/product`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          setLoading(false);

          if (res.status) {
            dispatch(newProductForShop(false));
            router.push("/shop/upload-product");

            const formFields = {
              setProduct,
              setNormalPrice,
              setPromoPrice,
              setWeight,
              setSize,
              setSellCondition,
            };

            for (const key in formFields) {
              if (key === "setProduct")
                formFields[key]("select product want to upload.");
              else if (key === "setSize")
                formFields[key]("what is the size of your product?");
              else formFields[key]("");
            }

            setSubmitSuccess(true);

            toast.success("product pushed to shop successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("server busy. try again later", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        })
        .catch((err) => {
          console.log(err);

          setLoading(false);

          toast.error("Something happend. Try again", {
            position: "top-center",
          });
        });
    } else {
      setLoading(true);

      fetch(`${shopApi}push/product/shop`, {
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
        .then((res) => res.json())
        .then((resData) => {
          setLoading(false);

          if (resData.status) {
            const formFields = {
              setProduct,
              setNormalPrice,
              setPromoPrice,
              setWeight,
              setSize,
              setSellCondition,
            };

            for (const key in formFields) {
              if (key === "setProduct")
                formFields[key]("select product want to upload.");
              else if (key === "setSize")
                formFields[key]("what is the size of your product?");
              else formFields[key]("");
            }

            setSubmitSuccess(true);

            toast.success("product pushed to shop successfully!", {
              position: toast.POSITION.TOP_CENTER,
            });
          } else {
            toast.error("server busy. try again later", {
              position: toast.POSITION.TOP_CENTER,
            });
          }
        });
    }
  };

  useEffect(() => {
    const getUserProducts = async () => {
      const res = await fetch(`${apiData}list/user/product/${userDetails.id}`);
      const data = await res.json();
      setUserProducts(data.data.data);
    };

    getUserProducts();
  }, []);

  useEffect(() => {
    if (submitSuccess) setSubmitSuccess(false);
  }, [submitSuccess]);

  return (
    <>
      <Head>
        <title>Shop: Product Upload</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="">
        <h1 className="text-center text-2xl font-bold ">Upload Product</h1>
        <form
          className="w-[95%] mx-auto border-2 p-6 rounded-md"
          onSubmit={handleSubmit}
        >
          {!creatingNewProduct && (
            <div className="flex justify-between mb-9">
              <button className="text-lg font-semibold bg-bellefuOrange rounded-lg p-2 text-bellefuWhite hover:cursor-default">
                Push Product To Shop
              </button>
              <button
                className="text-lg font-semibold border-2 border-bellefuOrange rounded-lg p-2 text-bellefuBlack1 hover:text-gray-400"
                onClick={handleNewProduct}
              >
                Create New Product
              </button>
            </div>
          )}
          {!creatingNewProduct && (
            <div className="mb-3 relative">
              <p className="text-lg font-semibold">Select Product</p>
              <div
                className={classNames(
                  "flex items-center justify-between mb-2 bg-white hover:bg-bellefuBackground p-2 rounded-md border-2 cursor-pointer",
                  { "border-bellefuOrange": productActive }
                )}
                onClick={() => {
                  setopenProductList((prevState) => !prevState);
                  setProductActive((prevState) => !prevState);
                }}
              >
                <div className="">{product}</div>
                <div>
                  <AiOutlineCaretRight
                    className={classNames("text-gray-300", {
                      "rotate-90 text-bellefuOrange": openProductList,
                    })}
                  />
                </div>
              </div>
              {openProductList && (
                <div className="w-full bg-bellefuWhite rounded border transition duration-300 ease-in absolute z-40">
                  <ul className="rounded py-2">
                    {userProducts.length &&
                      userProducts.map((item, index) => (
                        <li
                          onClick={() => {
                            setopenProductList((prevState) => !prevState);
                            setProduct(item.title);
                            setNormalPrice(item.price);
                            setProductId(item.productId);
                            setProductActive((prevState) => !prevState);
                          }}
                          key={index}
                          className="py-3 pl-6 hover:bg-gray-100 flex space-x-5 items-center cursor-pointer rounded"
                        >
                          <span>{item.title}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {!creatingNewProduct && (
            <div className="mb-3">
              <p>
                <label htmlFor="normal-price" className="text-lg font-semibold">
                  Normal Price
                </label>
              </p>
              <p>
                <input
                  type="text"
                  id="normal-price"
                  placeholder="200"
                  value={normalPrice}
                  readOnly={true}
                  disabled
                  className="pl-2 py-2 border-2 w-full rounded-md"
                />
              </p>
            </div>
          )}
          <div className="mb-3">
            <p>
              <label htmlFor="promo-price" className="text-lg font-semibold">
                Promo Price (optional)
              </label>
            </p>
            <p>
              <input
                type="text"
                id="promo-price"
                placeholder="200"
                value={promoPrice}
                onChange={onChange("promoPrice", setPromoPrice)}
                className="pl-2 py-2 border-2 w-full rounded-md focus:border-bellefuOrange focus:outline focus:outline-0"
              />
            </p>
          </div>
          <div className="mb-3 relative">
            <p className="text-lg font-semibold">
              Size or Dimension (optional)
            </p>
            <div
              className={classNames(
                "flex items-center justify-between mb-2 bg-white hover:bg-bellefuBackground p-2 rounded-md border-2 cursor-pointer",
                { "border-bellefuOrange": sizeActive }
              )}
              onClick={() => {
                setopenSizeList((prevState) => !prevState);
                setSizeActive((prevState) => !prevState);
              }}
            >
              <div className="">{size}</div>
              <div>
                <AiOutlineCaretRight
                  className={classNames("text-gray-300", {
                    "rotate-90 text-bellefuOrange": openSizeList,
                  })}
                />
              </div>
            </div>
            {openSizeList && (
              <div className="w-full bg-bellefuWhite rounded border transition duration-300 ease-in absolute z-40">
                <ul className="rounded py-2">
                  {sizes?.map((size, index) => (
                    <li
                      onClick={() => {
                        setopenSizeList((prevState) => !prevState);
                        setSize(size);
                        setSizeActive((prevState) => !prevState);
                      }}
                      key={index}
                      className="py-3 pl-6 hover:bg-gray-100 flex space-x-5 items-center cursor-pointer rounded"
                    >
                      <span>{size}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mb-4">
            <p>
              <label htmlFor="weight" className="text-lg font-semibold">
                Weight in kg (optional)
              </label>
            </p>
            <p>
              <input
                type="text"
                id="weight"
                placeholder="20"
                value={weight}
                onChange={onChange("weight", setWeight)}
                className="pl-2 py-2 border-2 w-full rounded-md focus:border-bellefuOrange focus:outline focus:outline-0"
              />
            </p>
          </div>
          <div className="mb-12">
            <p className="mb-1 text-lg font-semibold">Selling Condition:</p>
            <div
              className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer"
              id="main-container"
              onClick={onClick("new-prod")}
            >
              <div className="mr-auto" id="label-container">
                <label
                  htmlFor="new-prod"
                  className="text-lg hover:cursor-pointer"
                >
                  New Product
                </label>
              </div>
              <div id="input-container">
                <input
                  type="radio"
                  id="new-prod"
                  name="sell-condition"
                  value="new"
                  onClick={onChange("sellCondition", setSellCondition)}
                  className="w-6 h-6 hover:cursor-pointer"
                  checked={submitSuccess ? false : null}
                />
              </div>
            </div>
            <div
              className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer"
              onClick={onClick("used-prod")}
            >
              <div className="mr-auto">
                <label
                  htmlFor="used-prod"
                  className="text-lg hover:cursor-pointer"
                >
                  Used Product
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="used-prod"
                  name="sell-condition"
                  value="used"
                  onClick={onChange("sellCondition", setSellCondition)}
                  className="w-6 h-6 hover:cursor-pointer"
                  checked={submitSuccess ? false : null}
                />
              </div>
            </div>
            <div
              className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer"
              onClick={onClick("refurb-prod")}
            >
              <div className="mr-auto hover:cursor-pointer">
                <label
                  htmlFor="refurb-prod"
                  className="text-lg hover:cursor-pointer"
                >
                  Refurbished Product
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="refurb-prod"
                  name="sell-condition"
                  value="refurbished"
                  onClick={onChange("sellCondition", setSellCondition)}
                  className="w-6 h-6 hover:cursor-pointer"
                  checked={submitSuccess ? false : null}
                />
              </div>
            </div>
          </div>
          <div
            className={classNames(
              "text-center bg-bellefuOrange hover:bg-orange-500 text-bellefuWhite py-1 rounded-md font-semibold text-2xl",
              { "bg-orange-300 hover:bg-orange-300": isLoading }
            )}
          >
            <button
              type="submit"
              className={classNames("w-full", {
                "hover:cursor-not-allowed": isLoading,
              })}
              disabled={isLoading}
            >
              {!isLoading ? "Submit" : "Processing..."}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShopProductUpload;
