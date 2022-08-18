import { useState } from "react";
//import Head from "next/head";
import useSWR from "swr";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { AiFillCaretDown, AiOutlineCaretRight } from "react-icons/ai";
//import CreateProduct from "../components/CreateProduct";
import { userDId } from "../features/bellefuSlice";


const UploadProductForm = ({stateHandler}) => {
  const userDetails = useSelector(userDId);
  const [formFields, setFormFields] = useState({
    normalPrice: "",
    promoPrice: "",
    size: "",
    weight: "",
    sellCondition: "",

  });
  const [rotateCaret, setRotateCaret] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("select product want to upload.");
  const [isNewProduct, setNewProduct] = useState(false);
  const onChange = (input) => (evt) => {
    if (formFields[input]) return;
    if ((input === "normalPrice" || input === "promoPrice" || input === "weight") && isNaN(evt.target.value)) return ;

    setFormFields({
      ...formFields,
      [input]: evt.target.value,
    })
  };
  const onClick = (input) => () => {
    const elem = document.getElementById(input);
    
    if (!elem.checked) elem.click()
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();

    //console.log(formFields);
  }

  const fetcher = (url) => fetch(url).then(res => res.json());
  const {data: userProducts} = useSWR(userDetails[0]?.userId ? `https://bellefu.inmotionhub.xyz/api/general/list/user/product/${userDetails[0]?.userId}`:null, fetcher);

  if (typeof window === "undefined") return null;
 
  // console.log(userDetails[0].userId);
  // console.log(userProducts);
  // console.log(userProducts.data.data);
  // console.log(isNewProduct);

  return (
    <>
      <h1 className="text-center text-2xl font-bold ">Upload Product</h1>
      <form className="w-[90%] md:w-[60%] lg:w-[50%] mx-auto border-2 p-6 rounded-md" onSubmit={handleSubmit}>
        <div className="text-right">
          <button className="text-lg font-semibold bg-bellefuOrange hover:bg-orange-400 rounded-lg p-2 text-bellefuWhite" onClick={() => stateHandler(true)}>Create New Product</button>
        </div>
        <div className="mb-3 relative">
          {/* <div className=""> */}
          <p className="text-lg font-semibold">Select Product</p>
          <div className="flex items-center justify-between mb-2 bg-white hover:bg-bellefuBackground p-2 rounded-md border-2 cursor-pointer" onClick={() => setRotateCaret(prevState => !prevState)}>
            <div className="">
              {product}
            </div>
            <div>
              <AiOutlineCaretRight className={classNames("text-gray-300", {"rotate-90": rotateCaret})} />
            </div>
            {/* {!open1 ? (
              <div onClick={() => setOpen1(!open1)}>
                <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
              </div>
            ) : (
              <div onClick={() => setOpen1(!open1)}>
                <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
              </div>
            )} */}
          </div>
          {rotateCaret && 
            <div className="w-full bg-bellefuWhite rounded border transition duration-300 ease-in absolute z-40">
              <ul className="rounded py-2">
                {userProducts?.data?.data?.map((item, index) => (
                  <li
                    onClick={() => {
                      setRotateCaret(prevState => !prevState);
                      // setSubCatText(item.subCatName);
                      setProduct(item.title);
                    }}
                    key={index}
                    className="py-3 pl-6 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointer rounded"
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
          <p><input type="text" id="normal-price" placeholder="200" value={formFields.normalPrice} onChange={onChange("normalPrice")} className="pl-2 py-2 border-2 w-full rounded-md" /></p>
        </div>
        <div className="mb-3">
          <p><label htmlFor="promo-price" className="text-lg font-semibold">Promo Price (optional)</label></p>
          <p><input type="text" id="promo-price" placeholder="200" value={formFields.promoPrice} onChange={onChange("promoPrice")} className="pl-2 py-2 border-2 w-full rounded-md" /></p>
        </div>
        <div className="mb-3">
          <p><label htmlFor="size" className="text-lg font-semibold">Size or Dimension (optional)</label></p>
          <p className="relative">
            <select id="select" value={formFields.size} onChange={onChange("size")} className="pl-2 py-2 border-2 w-full rounded-md appearance-none hover:cursor-pointer">
              <option>select size</option>
              <option value="small" className="text-lg">small</option>
              <option value="medium" className="text-lg">medium</option>
              <option value="large" className="text-lg">large</option>
            </select>
            <AiFillCaretDown className="absolute right-2 top-4 hover:cursor-text" />
          </p>
        </div>
        <div className="mb-4">
          <p><label htmlFor="weight" className="text-lg font-semibold">Weight in kg (optional)</label></p>
          <p><input type="text" id="weight" placeholder="20" value={formFields.weight} onChange={onChange("weight")} className="pl-2 py-2 border-2 w-full rounded-md" /></p>
        </div>
        <div className="mb-12">
          <p className="mb-1 text-lg font-semibold">Selling Condition:</p>
          <div className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer" id="main-container" onClick={onClick("new-prod")}>
            <div className="mr-auto" id="label-container"><label htmlFor="new-prod" className="text-lg hover:cursor-pointer">New Product</label></div>
            <div id="input-container"><input type="radio" id="new-prod" name="sell-condition" value="new product" onClick={onChange("sellCondition")} className="w-6 h-6 hover:cursor-pointer" /></div>
          </div>
          <div className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer" onClick={onClick("used-prod")}>
            <div className="mr-auto"><label htmlFor="used-prod" className="text-lg hover:cursor-pointer">Used Product</label></div>
            <div><input type="radio" id="used-prod" name="sell-condition" value="used product" onClick={onChange("sellCondition")} className="w-6 h-6 hover:cursor-pointer" /></div>
          </div>
          <div className="flex shadow mb-4 p-3 rounded-md bg-white hover:cursor-pointer" onClick={onClick("refurb-prod")}>
            <div className="mr-auto hover:cursor-pointer"><label htmlFor="refurb-prod" className="text-lg hover:cursor-pointer">Refurbished Product</label></div>
            <div><input type="radio" id="refurb-prod" name="sell-condition" value="refurbished product" onClick={onChange("sellCondition")} className="w-6 h-6 hover:cursor-pointer" /></div>
          </div>
        </div>
        <div className="text-center bg-bellefuOrange hover:bg-orange-500 text-bellefuWhite py-1 rounded-md font-semibold text-2xl">
          <button type="submit" className="w-full">Submit</button>
        </div>
      </form>
    </>
  )
}

export default UploadProductForm;