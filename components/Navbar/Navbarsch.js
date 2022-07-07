import React, { useState, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import { ImLocation2 } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
// import { apiData } from "../constant";
import { useSelector, useDispatch } from "react-redux";

// import {
//   chooseCountry,
//   handleSearch,
//   selectCat,
// } from "../features/bellefuSlice";
import {
  chooseState,
  homeData,
  chooseCountry,
  handleSearch,
  selectCat,
} from "../../features/bellefuSlice";
import { apiData } from "../../constant";
// import { BiSearch } from "react-icons/bi";
// import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
// import MobileHeaderSearch from "./MobileHeaderSearch";

const HeaderSearch = () => {
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

  const dispatch = useDispatch();

  const index = useSelector(homeData);

  const dialet = index?.defaultLanguage;
  const state = index?.countryStates;
  const defaultCountry = index?.defaultCountryName;
  const languages = index?.languages;
  const countries = index?.countries;
  const location = index?.defaultCountry;

  useEffect(() => {
    const fetchStates = async () => {
      await axios
        .get(`${apiData}get/${flag}/states`)
        .then((res) => setStateList(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchStates();
  }, [flag]);

  const province = flag !== null ? stateList : state;
  return (
    <div>
      {/* desktop screen header search */}
      <div className="lg:hidden">
        <div className={"w-full flex rounded-md items-center "}>
          <div className="flex space-x-2 ml-4">
            <div className="flex space-x-2 items-center justify-center ml-4 py-1">
              <div
                onClick={() => {
                  setSelectlang(false);
                  setOpen(false);
                  setSelectCountry(!selectCountry);
                }}
              >
                <img
                  alt="error"
                  className="w-16 h-7"
                  src={
                    flag === null
                      ? `https://flagcdn.com/32x24/${location?.toLowerCase()}.png`
                      : `https://flagcdn.com/32x24/${flag?.toLowerCase()}.png`
                  }
                />
              </div>

              <AiFillCaretDown
                onClick={() => {
                  setSelectlang(false);
                  setOpen(false);
                  setSelectCountry(!selectCountry);
                }}
                className={
                  selectCountry
                    ? "text-bellefuOrange text-2xl"
                    : "text-gray-600 text-2xl"
                }
              />
            </div>
            {selectCountry && (
              <div className="z-10 absolute left-22  h-80 overflow-y-scroll mt-10 w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                      onClick={() => {
                        setFlag(list.iso2);
                        setSelectCountry(false);
                        setSelectlang(false);
                        setCountryName(list.name);
                        dispatch(chooseState(null));
                        dispatch(handleSearch(""));
                        dispatch(selectCat(null));
                        dispatch(chooseCountry(list.iso2));
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

            {/* language */}
            {selectlang && (
              <div className="z-50 absolute mt-10 w-1/4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {languages.map((lang) => (
                  <div
                    onClick={() => {
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
            )}

            {/* <div
              onClick={() => {
                setSelectCountry(false);
                setOpen(false);
                setSelectlang(!selectlang);
              }}
              className=" bg-bellefuOrange space-x-2 rounded-sm items-center px-2 py-1 justify-center ml-6 flex"
            >
              <p className="text-white">
                {native === null
                  ? dialet?.toUpperCase()
                  : native?.toUpperCase()}{" "}
              </p>

              <AiFillCaretDown className="text-white" />
            </div> */}
          </div>
        </div>
      </div>
      {/* end of desktop header search */}

      {/* end of mobile header search */}
    </div>
  );
};
export default HeaderSearch;
