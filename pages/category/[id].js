import React, { useState, useEffect } from "react";
import HeaderSearch from "../../components/HeaderSearch";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import CategoryProducts from "../../components/categoryIdProducts/CategoryProducts";
import Range from "../../components/RangeComponent/Range";
import { apiData } from "../../constant";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { homeData, updateIdpath, selectCat } from "../../features/bellefuSlice";
import axios from "axios";

const Product = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [catUpdate, setCatUpdate] = useState(null);
  const [subcat, setSubcat] = useState([]);
  const [product, setProduct] = useState([]);
  const [subCatText, setSubCatText] = useState(null);
  const [stateList, setStateList] = useState([]);

  const productId = useSelector((state) => state.bellefu.catfilter);

  const country = useSelector((state) => state.bellefu.countrySelected);

  const newId = catUpdate === null ? productId : catUpdate;
  const dispatch = useDispatch();
  const index = useSelector(homeData);
  const router = useRouter();
  //console.log(router.query);

  //setProductId(router.query.id);

  // getting product base on category
  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`${apiData}get/product/cat/${newId}`);
      const { data } = await response.json();
      setProduct(data);
    };

    getProduct();
  }, [productId, catUpdate]);

  // getting subcategory
  useEffect(() => {
    const getsubcat = async () => {
      const res = await fetch(`${apiData}get/subcategory/${newId}`);
      const { data } = await res.json();
      setSubcat(data);
    };

    getsubcat();
  }, [newId]);

  // fetch state
  const state = country === null ? index?.defaultCountry : country;

  useEffect(() => {
    const fetchStates = async () => {
      await axios
        .get(`https://bellefu.inmotionhub.xyz/api/general/get/${state}/states`)
        .then((res) => setStateList(res.data.data))
        .catch((err) => console.log(err));
    };
    fetchStates();
  }, [state]);

  // const filterproduct = product.filter((newP)=>{
  //   if(newP.catId===product)
  // })

  const province = country === null ? index?.countryStates : stateList;

  console.log(index);
  return (
    <div className="max-w-[95%] lg:max-w-[90%] mx-auto">
      <HeaderSearch
        dialet={index?.defaultLanguage}
        state={index?.countryStates}
        defaultCountry={index?.defaultCountryName}
        languages={index?.languages}
        countries={index?.countries}
        location={index?.defaultCountry}
      />

      <div className="flex flex-col lg:flex-row">
        {/* sidebar section */}
        <div className="hidden lg:inline w-80 bg-bellefuWhite rounded-md mr-3 pb-5 px-3 pt-5 space-y-10 h-5/6">
          {/* <h4 className="sticky top-0 bg-bellefuWhite p-5" /> */}

          {/* select category */}
          <div>
            <p className="text-bellefuBlack1 font-semibold ">
              Select Category:
            </p>
            <div className="flex items-center mb-2 hover:bg-bellefuBackground p-3 rounded-md border mt-4 relative">
              <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                <img
                  src="/bellefu-images/image1.svg"
                  alt="icons"
                  className="w-6 h-6"
                />
                <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                  {/* Agricultural Produce */}
                  {product[0]?.CatName}
                </h5>
              </div>
              {open === false ? (
                <div onClick={() => setOpen(!open)}>
                  <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                </div>
              ) : (
                <div onClick={() => setOpen(!open)}>
                  <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                </div>
              )}
            </div>
            {open === true ? (
              <div className="absolute w-72 bg-bellefuWhite rounded mx-auto border transition duration-300 ease-in z-40">
                <ul className="rounded px-5 py-4">
                  {index?.categories.map((cat) => (
                    <li
                      key={cat.id}
                      onClick={() => {
                        setOpen(false);
                        dispatch(selectCat(cat.id));
                        dispatch(updateIdpath(cat.id));
                        setCatUpdate(cat.id);
                      }}
                      className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                    >
                      <img
                        src={`https://bellefu.inmotionhub.xyz/get/category/image/${cat.image}`}
                        alt="icons"
                        className="w-6 h-6 object-cover"
                      />
                      <span>{cat.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          {/* end of select category */}

          {/* select sub category */}
          <div>
            <p className="text-bellefuBlack1 font-semibold ">Sub Category:</p>
            <div className="flex items-center mb-2 hover:bg-bellefuBackground p-3 rounded-md border mt-4 relative">
              <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                  {subCatText === null ? " Select Subcategory" : subCatText}
                </h5>
              </div>
              {open1 === false ? (
                <div onClick={() => setOpen1(!open1)}>
                  <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                </div>
              ) : (
                <div onClick={() => setOpen1(!open1)}>
                  <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                </div>
              )}
            </div>
            {open1 === true ? (
              <div className="absolute w-72 bg-bellefuWhite rounded mx-auto border transition duration-300 ease-in z-40">
                <ul className="rounded px-5 py-4">
                  {subcat?.map((item) => (
                    <li
                      onClick={() => {
                        setOpen1(!open1);
                        setSubCatText(item.subCatName);
                      }}
                      key={item.id}
                      className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                    >
                      <span>{item.subCatName}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          {/* end of sub category */}

          {/* select country */}
          <div>
            <p className="text-bellefuBlack1 font-semibold ">Select State:</p>
            <div className="flex items-center mb-2 hover:bg-bellefuBackground p-3 rounded-md border mt-4 relative">
              <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                  State
                </h5>
              </div>
              {open2 === false ? (
                <div onClick={() => setOpen2(!open2)}>
                  <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                </div>
              ) : (
                <div onClick={() => setOpen2(!open2)}>
                  <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                </div>
              )}
            </div>
            {open2 === true ? (
              <div className="absolute w-72 bg-bellefuWhite rounded mx-auto border transition duration-300 ease-in z-40">
                <ul className="rounded h-80 overflow-y-scroll px-5 py-4">
                  {province.map((state) => (
                    <li
                      key={state.id}
                      className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                    >
                      <span>{state.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          {/* end of select country */}

          {/* select products */}
          <div>
            <p className="text-bellefuBlack1 font-semibold ">Sub Product:</p>
            <div className="flex items-center mb-2 hover:bg-bellefuBackground px-2 py-3 rounded-md border mt-4 relative">
              <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                  Popular Products
                </h5>
              </div>
              {open3 === false ? (
                <div onClick={() => setOpen3(!open3)}>
                  <AiOutlineCaretRight className="text-gray-400 cursor-pointer" />
                </div>
              ) : (
                <div onClick={() => setOpen3(!open3)}>
                  <AiOutlineCaretDown className="text-bellefuOrange cursor-pointer" />
                </div>
              )}
            </div>
            <div className="absolute w-72 mx-auto bg-transparent -mt-4 z-40">
              {open3 === true ? (
                <div className=" w-44 bg-bellefuWhite rounded border transition duration-300 ease-in z-40 ml-28 shadow-md">
                  <ul className="rounded px-2 py-3">
                    <div className="flex items-center space-x-4 mb-2 bg-bellefuBackground px-2 rounded-md py-1">
                      <img
                        src="/bellefu-images/orange.svg"
                        alt="icons"
                        className="w-3 h-3 object-cover"
                      />
                      <p className="text-xs text-bellefuBlack1 font-normal whitespace-nowrap">
                        Popular Products
                      </p>
                    </div>
                    <li className=" py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                      <img
                        src="/bellefu-images/acending.svg"
                        alt="icons"
                        className="w-3 h-3 object-cover"
                      />
                      <span className="text-sm text-bellefuBlack1">
                        Acending
                      </span>
                    </li>
                    <li className=" py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                      <img
                        src="/bellefu-images/decending.svg"
                        alt="icons"
                        className="w-3 h-3 object-cover"
                      />
                      <span className="text-sm text-bellefuBlack1">
                        Decending
                      </span>
                    </li>
                    <li className=" py-2 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                      <img
                        src="/bellefu-images/new-in.svg"
                        alt="icons"
                        className="w-3 h-3 object-cover"
                      />
                      <span className="text-sm text-bellefuBlack1">New In</span>
                    </li>
                    <li className=" py-2 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                      <img
                        src="/bellefu-images/highestprice.svg"
                        alt="icons"
                        className="w-3 h-3 object-cover"
                      />
                      <span className="text-sm text-bellefuBlack1">
                        Highest Price
                      </span>
                    </li>
                    <li className=" py-2 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                      <img
                        src="/bellefu-images/lowestprice.svg"
                        alt="icons"
                        className="w-3 h-3 object-cover"
                      />
                      <span className="text-sm text-bellefuBlack1">
                        Lowest Price
                      </span>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          {/* end of select products */}

          {/* price section */}
          <div className="border rounded px-2 py-3">
            <div className="flex items-center px-2 rounded-md relative">
              <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                  Price
                </h5>
              </div>
              {open4 === false ? (
                <div onClick={() => setOpen4(!open4)}>
                  <AiOutlineCaretRight className="text-gray-400 cursor-pointer" />
                </div>
              ) : (
                <div onClick={() => setOpen4(!open4)}>
                  <AiOutlineCaretDown className="text-bellefuOrange cursor-pointer" />
                </div>
              )}
            </div>
            <div className=" z-40">
              {open4 === true ? (
                <div
                  className={
                    open4 === true
                      ? "w-64 mt-4 bg-bellefuWhite rounded mx-auto transition duration-300 ease-in space-y-3"
                      : ""
                  }
                >
                  <Range />
                  <div className="flex space-x-6 items-center ">
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-bellefuBlack1 text-sm whitespace-nowrap">
                        From :
                      </p>
                      <input
                        type="number"
                        className="border outline-none pl-2 rounded-sm w-14 text-sm text-bellefuBlack1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-bellefuBlack1 text-sm whitespace-nowrap">
                        To :
                      </p>
                      <input
                        type="number"
                        className="border outline-none pl-2 rounded-sm w-14 text-sm text-bellefuBlack1"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* end of price section */}

          <div className="flex items-center justify-center">
            <button className="text-bellefuWhite bg-bellefuOrange px-8 py-2 text-sm rounded">
              Apply Filter
            </button>
          </div>
        </div>

        {/* mobile view sidebar section */}
        <div className="lg:hidden mt-3">
          <div className="flex space-x-3 items-center">
            {/* category and sub category container */}
            <div className="flex flex-col w-full">
              {/* select category */}
              <div>
                <p className="text-bellefuBlack1 font-bold ">
                  Select Category:
                </p>
                <div className="flex items-center mb-2 hover:bg-bellefuBackground p-3 rounded-md border mt-4 relative">
                  <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                    <img
                      src="/bellefu-images/image1.svg"
                      alt="icons"
                      className="w-6 h-6"
                    />
                    <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                      {/* Agricultural Produce */}
                      {product[0]?.CatName}
                    </h5>
                  </div>
                  {open === false ? (
                    <div onClick={() => setOpen(!open)}>
                      <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                    </div>
                  ) : (
                    <div onClick={() => setOpen(!open)}>
                      <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                    </div>
                  )}
                </div>
                {open === true ? (
                  <div className="absolute w-72 bg-bellefuWhite rounded mx-auto border -mt-2 transition duration-300 ease-in z-40">
                    <ul className="rounded px-5 py-4">
                      {index?.categories.map((cat) => (
                        <li
                          key={cat.id}
                          onClick={() => {
                            setOpen(false);
                            dispatch(updateIdpath(cat.id));
                            setCatUpdate(cat.id);
                          }}
                          className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                        >
                          <img
                            src={`https://bellefu.inmotionhub.xyz/get/category/image/${cat.image}`}
                            alt="icons"
                            className="w-6 h-6 object-cover"
                          />
                          <span>{cat.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              {/* end of select category */}

              {/* select sub category */}
              <div>
                <p className="text-bellefuBlack1 font-bold ">Sub Category:</p>
                <div className="flex items-center mb-2 hover:bg-bellefuBackground p-3 rounded-md border mt-4 relative">
                  <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                    <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                      {subCatText === null ? " Select Subcategory" : subCatText}
                    </h5>
                  </div>
                  {open1 === false ? (
                    <div onClick={() => setOpen1(!open1)}>
                      <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                    </div>
                  ) : (
                    <div onClick={() => setOpen1(!open1)}>
                      <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                    </div>
                  )}
                </div>
                {open1 === true ? (
                  <div className="absolute w-72 bg-bellefuWhite rounded mx-auto border -mt-2 transition duration-300 ease-in z-40">
                    <ul className="rounded px-5 py-4">
                      {subcat?.map((item) => (
                        <li
                          onClick={() => {
                            setOpen1(!open1);
                            setSubCatText(item.subCatName);
                          }}
                          key={item.id}
                          className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                        >
                          <span>{item.subCatName}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              {/* end of sub category */}
            </div>
            {/* end of category and sub category container */}
            {/* container for state and popular products */}
            <div className="flex flex-col w-full">
              {/* select country */}
              <div>
                <p className="text-bellefuBlack1 font-bold ">Select State:</p>
                <div className="flex items-center mb-2 hover:bg-bellefuBackground p-3 rounded-md border mt-4 relative">
                  <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                    <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                      State
                    </h5>
                  </div>
                  {open2 === false ? (
                    <div onClick={() => setOpen2(!open2)}>
                      <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                    </div>
                  ) : (
                    <div onClick={() => setOpen2(!open2)}>
                      <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                    </div>
                  )}
                </div>
                {open2 === true ? (
                  <div className="absolute w-60 bg-bellefuWhite rounded mx-auto border -mt-2 transition duration-300 ease-in z-40">
                    <ul className="rounded h-80 overflow-y-scroll px-5 py-4">
                      {province.map((state) => (
                        <li
                          key={state.id}
                          className="px-4 py-3 hover:bg-bellefuBackground flex space-x-5 items-center cursor-pointe rounded"
                        >
                          <span>{state.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              {/* end of select country */}
              {/* select products */}
              <div>
                <p className="text-bellefuBlack1 font-bold ">Sub Product:</p>
                <div className="flex items-center mb-2 hover:bg-bellefuBackground px-2 py-3 rounded-md border mt-4 relative">
                  <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                    <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                      Popular Products
                    </h5>
                  </div>
                  {open3 === false ? (
                    <div onClick={() => setOpen3(!open3)}>
                      <AiOutlineCaretRight className="text-gray-400 cursor-pointer" />
                    </div>
                  ) : (
                    <div onClick={() => setOpen3(!open3)}>
                      <AiOutlineCaretDown className="text-bellefuOrange cursor-pointer" />
                    </div>
                  )}
                </div>
                <div className="absolute w-60 mx-auto bg-transparent -mt-4 z-40">
                  {open3 === true ? (
                    <div className="bg-bellefuWhite rounded border transition duration-300 ease-in z-40 shadow-md">
                      <ul className="rounded px-2 py-3">
                        <div className="flex items-center space-x-4 mb-2 bg-bellefuBackground px-2 rounded-md py-1">
                          <img
                            src="/bellefu-images/orange.svg"
                            alt="icons"
                            className="w-3 h-3 object-cover"
                          />
                          <p className="text-xs text-bellefuBlack1 font-normal whitespace-nowrap">
                            Popular Products
                          </p>
                        </div>
                        <li className=" py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                          <img
                            src="/bellefu-images/acending.svg"
                            alt="icons"
                            className="w-3 h-3 object-cover"
                          />
                          <span className="text-sm text-bellefuBlack1">
                            Acending
                          </span>
                        </li>
                        <li className=" py-1 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                          <img
                            src="/bellefu-images/decending.svg"
                            alt="icons"
                            className="w-3 h-3 object-cover"
                          />
                          <span className="text-sm text-bellefuBlack1">
                            Decending
                          </span>
                        </li>
                        <li className=" py-2 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                          <img
                            src="/bellefu-images/new-in.svg"
                            alt="icons"
                            className="w-3 h-3 object-cover"
                          />
                          <span className="text-sm text-bellefuBlack1">
                            New In
                          </span>
                        </li>
                        <li className=" py-2 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                          <img
                            src="/bellefu-images/highestprice.svg"
                            alt="icons"
                            className="w-3 h-3 object-cover"
                          />
                          <span className="text-sm text-bellefuBlack1">
                            Highest Price
                          </span>
                        </li>
                        <li className=" py-2 hover:bg-bellefuBackground flex space-x-3 items-center cursor-pointer rounded">
                          <img
                            src="/bellefu-images/lowestprice.svg"
                            alt="icons"
                            className="w-3 h-3 object-cover"
                          />
                          <span className="text-sm text-bellefuBlack1">
                            Lowest Price
                          </span>
                        </li>
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
              {/* end of select products */}
            </div>
          </div>

          {/* price section */}
          <div className="border rounded px-2 py-3">
            <div className="flex items-center px-2 rounded-md relative">
              <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
                <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                  Price
                </h5>
              </div>
              {open4 === false ? (
                <div onClick={() => setOpen4(!open4)}>
                  <AiOutlineCaretRight className="text-gray-400 cursor-pointer" />
                </div>
              ) : (
                <div onClick={() => setOpen4(!open4)}>
                  <AiOutlineCaretDown className="text-bellefuOrange cursor-pointer" />
                </div>
              )}
            </div>
            <div className=" z-40">
              {open4 === true ? (
                <div
                  className={
                    open4 === true
                      ? "w-full px-3 mt-4 bg-bellefuWhite rounded mx-auto transition duration-300 ease-in space-y-3"
                      : ""
                  }
                >
                  <Range />
                  <div className="flex space-x-6 items-center justify-center">
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-bellefuBlack1 text-normal whitespace-nowrap">
                        From :
                      </p>
                      <input
                        type="number"
                        className="border outline-none px-2 py-1 rounded-sm w-full text-sm text-bellefuBlack1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <p className="text-bellefuBlack1 text-normal whitespace-nowrap">
                        To :
                      </p>
                      <input
                        type="number"
                        className="border outline-none px-2 py-1 rounded-sm w-full text-sm text-bellefuBlack1"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* end of price section */}
        </div>
        {/* end of mobile view section */}

        {/* product session */}
        <div className="flex-1">
          <CategoryProducts product={product} />
        </div>
      </div>
    </div>
  );
};

export default Product;
