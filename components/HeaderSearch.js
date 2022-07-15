import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ImLocation2 } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { apiData } from "../constant";
import { useDispatch } from "react-redux";
import {
  chooseCountry,
  handleSearch,
  selectCat,
  searchCountry,
} from "../features/bellefuSlice";
import { chooseState } from "../features/bellefuSlice";
import { BiSearch } from "react-icons/bi";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import MobileHeaderSearch from "./MobileHeaderSearch";
import Skeleton from "@mui/material/Skeleton";

const HeaderSearch = ({
  countries,
  location,
  languages,
  state,
  dialet,
  defaultCountry,
}) => {
  const [open, setOpen] = useState(false);
  const [selectCountry, setSelectCountry] = useState(false);
  const [selectlang, setSelectlang] = useState(false);
  const [flag, setFlag] = useState(null);
  const [native, setNative] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [stateList, setStateList] = useState([]);
  const [search, setSearch] = useState("");
  const [findCountry, setFindCountry] = useState("");
  const [findState, setFindState] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("Select State");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStates = async () => {
      await axios
        .get(`${apiData}get/${flag}/states`)
        .then((res) => setStateList(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchStates();
  }, [flag]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const province = flag !== null ? stateList : state;

  if (typeof window !== "undefined") {
    window.onclick = (e) => {
      e.target.className === "con";
      setOpen(false);
      setSelectCountry(false);
      setSelectlang(false);
    };
  }
  return (
    <div className="con">
      {/* desktop screen header search */}
      <div className="hidden lg:inline">
        <div
          className={
            "w-full h-20 mt-3 flex space-x-96  bg-bellefuWhite mb-3  rounded-md items-center "
          }
        >
          {loading ? (
            <div className="flex">
              <div className="flex space-x-4 items-center justify-center ml-8 cursor-pointer">
                <div>
                  <img
                    alt="error"
                    src={
                      flag === null
                        ? `https://flagcdn.com/32x24/${location?.toLowerCase()}.png`
                        : `https://flagcdn.com/32x24/${flag?.toLowerCase()}.png`
                    }
                  />
                </div>

                <AiFillCaretDown
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectlang(false);
                    setOpen(false);
                    setSelectCountry(!selectCountry);
                  }}
                  className={
                    selectCountry ? "text-bellefuOrange" : "text-gray-600"
                  }
                />
              </div>
              {selectCountry && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="z-10 absolute top-14   h-80 overflow-y-scroll mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="flex items-center justify-center mx-auto my-3 ">
                    <input
                      type="text"
                      placeholder="Search country"
                      className="w-full border mx-4 h-10 px-4 py-2 rounded-md text-sm text-gray-600 focus:border-bellefuOrange focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-5"
                      onChange={(e) => setFindCountry(e.target.value)}
                      value={findCountry}
                    />
                  </div>
                  {countries
                    ?.filter((item) => {
                      if (findCountry === "") {
                        return item;
                      } else if (
                        item.name
                          .toLowerCase()
                          .includes(findCountry.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    .map((list) => (
                      <div
                        key={list.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlag(list.iso2);
                          setSelectCountry(false);
                          setSelectlang(false);
                          setCountryName(list.name);
                          dispatch(chooseState(null));
                          dispatch(handleSearch(""));
                          dispatch(selectCat(null));
                          dispatch(chooseCountry(list.iso2));
                          dispatch(searchCountry(list.name));
                        }}
                        className="py-1 flex space-x-3 hover:bg-bellefuBackground"
                      >
                        <p
                          key={list.id}
                          className="text-gray-700 space-x-3 px-4 flex py-2 text-sm"
                        >
                          <div>
                            <img
                              alt="error"
                              src={`https://flagcdn.com/20x15/${list.iso2.toLowerCase()}.png`}
                            />
                          </div>

                          <span>{list.name}</span>
                        </p>
                      </div>
                    ))}
                </div>
              )}
              {/* {selectlang && (
              <div className="z-50 absolute top-32 right-[60rem] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {languages.map((lang) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setNative(lang.code);
                      setSelectlang(false);
                    }}
                    key={lang.id}
                    className="py-1 hover:bg-bellefuBackground"
                  >
                    <span className="text-gray-700 block px-4  py-2 text-sm">
                      {lang.name}
                    </span>
                  </div>
                ))}
              </div>
            )} */}

              {/* <div
              onClick={() => {
                setSelectCountry(false);
                setOpen(false);
                setSelectlang(!selectlang);
              }}
              className="cursor-pointer bg-bellefuOrange space-x-2 rounded-sm items-center px-2 justify-center ml-6 flex"
            >
              <p className="text-white">
                {native === null
                  ? dialet?.toUpperCase()
                  : native?.toUpperCase()}{" "}
              </p>

              <AiFillCaretDown className="text-white" />
            </div> */}
            </div>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"15%"}
              height={50}
            />
          )}

          {loading ? (
            <div className="flex pl-2 justify-center items-center bg-bellefuBackground w-6/12 h-11">
              <div className="mr-5">
                {" "}
                <FiSearch className="text-bellefuOrange" />
              </div>

              <input
                type="text"
                list="brow"
                value={search}
                placeholder="Search agricultural products"
                onChange={(e) => {
                  e.stopPropagation();
                  dispatch(handleSearch(e.target.value));
                  dispatch(chooseState(null));
                  dispatch(selectCat(null));
                  setSearch(e.target.value);
                }}
                className="bg-bellefuBackground focus:outline-none w-9/12"
              />
              <datalist id="brow">
                <option value="Agro Produce" />
                <option value="Livestock" />
                <option value="Food item" />
                <option value="Farm machine" />
                <option value="Agro Jobs" />
              </datalist>
              <div className="px-3 text-black opacity-20 text-2xl -mt-2">|</div>

              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectCountry(false);
                  setSelectlang(false);
                  setOpen(!open);
                }}
                list="brow"
                className="relative w-9/12 flex cursor-pointer text-gray-500"
              >
                <ImLocation2 className="text-bellefuOrange mt-1 mr-1" />{" "}
                <span>
                  {countryName !== null ? countryName : defaultCountry},{" "}
                  {selectedState}
                  {/* {countryName !== null ? countryName : defaultCountry} */}
                </span>{" "}
              </span>

              {open && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="transition ease-in-out delay-150 duration-700  z-10 absolute h-80 overflow-y-scroll top-14  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="flex  items-center justify-center mx-auto my-3 ">
                    <input
                      type="text"
                      placeholder="Search state"
                      className="w-full border mx-4 h-10 px-4 py-2 rounded-md text-sm text-gray-600 focus:border-bellefuOrange focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-5"
                      onChange={(e) => {
                        e.stopPropagation();
                        setFindState(e.target.value);
                      }}
                      value={findState}
                    />
                  </div>
                  <p
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(!open);
                      dispatch(chooseState(null));
                      setSelectedState("All");
                    }}
                    className="text-gray-700 block px-4 hover:bg-bellefuBackground py-2 text-sm"
                  >
                    None
                  </p>
                  {province
                    ?.filter((item) => {
                      if (findState === "") {
                        return item;
                      } else if (
                        item.name
                          .toLowerCase()
                          .includes(findState.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    .map((state) => (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(!open);
                          setSelectedState(state.name);
                          dispatch(chooseState(state.code));
                        }}
                        key={state.id}
                        className="py-1  hover:bg-bellefuBackground "
                      >
                        <span className="text-gray-700 block px-4 hover:bg-bellefuBackground py-2 text-sm">
                          {state.name}
                        </span>
                      </div>
                    ))}
                </div>
              )}

              <button className=" w-4/12 h-8  m-2 rounded-sm text-center bg-bellefuOrange text-white">
                Search
              </button>
            </div>
          ) : (
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={"50%"}
              height={50}
            />
          )}
        </div>
      </div>
      {/* end of desktop header search */}

      {/* mobile screen header search */}
      {/* <div className="lg:hidden">
        <MobileHeaderSearch
          province={province}
          countryName={countryName}
          defaultCountry={defaultCountry}
        />
      </div> */}
      <div className=" lg:hidden">
        {/*  filter by search */}
        {loading ? (
          <div className="mt-3 relative">
            <BiSearch className="w-6 h-6 absolute top-4 text-bellefuOrange ml-2" />
            <input
              list="brow"
              type="text"
              value={search}
              onChange={(e) => {
                e.stopPropagation();
                dispatch(handleSearch(e.target.value));
                setSearch(e.target.value);
              }}
              className="pl-9 py-3 outline-none w-full rounded-md text-bellefuBlack1"
              placeholder="What are you looking for?"
            />
            <datalist id="brow">
              <option value="Agro Produce" />
              <option value="Livestock" />
              <option value="Food item" />
              <option value="Farm machine" />
              <option value="Agro Jobs" />
            </datalist>
          </div>
        ) : (
          <Skeleton
            className="rounded-md mb-1"
            variant="rectangular"
            animation="wave"
            width={"100%"}
            height={50}
          />
        )}
        {/* search select */}
        {loading ? (
          <div className="bg-white mt-2 p-3 flex items-center rounded-md relative">
            <div className=" flex flex-1 items-center space-x-2 cursor-ponter">
              <ImLocation2 className="text-bellefuOrange" />
              <span>
                Where? {countryName !== null ? countryName : defaultCountry}
              </span>
            </div>
            <div className="">
              {open === false ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(!open);
                  }}
                >
                  <AiOutlineCaretRight className="text-gray-300 cursor-pointer" />
                </div>
              ) : (
                <div onClick={() => setOpen(!open)}>
                  <AiOutlineCaretDown className="text-gray-300 cursor-pointer" />
                </div>
              )}
            </div>
            {open && (
              <div className=" -ml-3 z-10 absolute h-80 overflow-y-scroll top-12 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {province?.map((state) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(!open);
                      dispatch(chooseState(state.code));
                    }}
                    key={state.id}
                    className="py-1  hover:bg-bellefuBackground "
                  >
                    <span className="text-gray-700 block px-4 hover:bg-bellefuBackground py-2 text-sm">
                      {state.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Skeleton
            className="rounded-md"
            variant="rectangular"
            animation="wave"
            width={"100%"}
            height={50}
          />
        )}
      </div>
      {/* end of mobile header search */}
    </div>
  );
};
export default HeaderSearch;
