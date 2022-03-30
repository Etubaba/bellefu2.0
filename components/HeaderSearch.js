import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { ImLocation2 } from "react-icons/im";
import { AiFillCaretDown } from "react-icons/ai";
import axios from "axios";
import { apiData } from "../constant";

const HeaderSearch = () => {
  const [open, setOpen] = useState(false);
  const [selectCountry, setSelectCountry] = useState(false);
  const [selectlang, setSelectlang] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchcountry = async () => {
      await axios
        .get(`${apiData}get/countries`)
        .then((res) => setCountries(res.data.data))
        .catch((err) => console.log(err));
    };

    fetchcountry();
  }, []);

  console.log(countries);
  return (
    <div
      className={
        "w-full p-3 mt-3 flex justify-between bg-bellefuWhite mb-3 rounded-md items-center"
      }
    >
      <div className="flex px-2">
        <div className="flex space-x-4 items-center justify-center">
          <div>
            <img alt="error" src="https://flagcdn.com/32x24/ng.png" />
          </div>

          <AiFillCaretDown
            onClick={() => setSelectCountry(!selectCountry)}
            className={selectCountry ? "text-bellefuOrange" : "text-gray-600"}
          />
        </div>

        {selectCountry && (
          <div class="z-50 absolute top-40 right-[67rem] h-80 overflow-y-scroll mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {countries?.map((list) => (
              <div class="py-1 flex space-x-3">
                <p
                  key={list.id}
                  className="text-gray-700 space-x-3 px-4 flex hover:bg-bellefuBackground py-2 text-sm"
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
        {selectlang && (
          <div class="z-50 absolute top-40 right-[60rem] mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <a
                href="#"
                class="text-gray-700 block px-4 hover:bg-bellefuBackground py-2 text-sm"
              >
                Account settings
              </a>
              <a
                href="#"
                class="text-gray-700 hover:bg-bellefuBackground block px-4 py-2 text-sm"
              >
                Support
              </a>
              <a
                href="#"
                class="text-gray-700 hover:bg-bellefuBackground block px-4 py-2 text-sm"
              >
                License
              </a>
              <a
                href="#"
                class="text-gray-700 hover:bg-bellefuBackground block px-4 py-2 text-sm"
              >
                License
              </a>
            </div>
          </div>
        )}

        <div
          onClick={() => setSelectlang(!selectlang)}
          className=" bg-bellefuOrange space-x-2 rounded-sm items-center px-2 justify-center ml-6 flex"
        >
          <p className="text-white">EN </p>

          <AiFillCaretDown className="text-white" />
        </div>
      </div>

      <div className="flex p-3 justify-between items-center bg-bellefuBackground rounded-md md:w-3/4 lg:w-2/4">
        <div className="mr-2">
          {" "}
          <FiSearch className="text-bellefuOrange w-5 h-5" />
        </div>

        <input
          type="text"
          list="brow"
          placeholder="What are you looking for?"
          className="bg-bellefuBackground focus:outline-none w-full"
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
          onClick={() => setOpen(!open)}
          list="brow"
          className="relative w-full flex cursor-pointer text-gray-500 space-x-2 items-center"
        >
          <ImLocation2 className="text-bellefuOrange" />{" "}
          <span>Where? Nigeria</span>{" "}
        </span>

        {open && (
          <div class="z-10 absolute top-40 right-64 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <a
                href="#"
                class="text-gray-700 block px-4 hover:bg-bellefuBackground py-2 text-sm"
              >
                Account settings
              </a>
              <a
                href="#"
                class="text-gray-700 hover:bg-bellefuBackground block px-4 py-2 text-sm"
              >
                Support
              </a>
              <a
                href="#"
                class="text-gray-700 hover:bg-bellefuBackground block px-4 py-2 text-sm"
              >
                License
              </a>
              <a
                href="#"
                class="text-gray-700 hover:bg-bellefuBackground block px-4 py-2 text-sm"
              >
                License
              </a>
            </div>
          </div>
        )}

        <button className="rounded-sm text-center bg-bellefuOrange text-white px-4 py-1">
          Search
        </button>
      </div>
    </div>
  );
};
export default HeaderSearch;
