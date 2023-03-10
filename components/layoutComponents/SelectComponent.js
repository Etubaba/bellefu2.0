import React from "react";
import { useState } from "react";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";

function SelectComponent({
  defaultName,
  items,
  setValue,
  subcatSelect,
  state,
  city,
  setSubCat,
}) {
  const [open1, setOpen1] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [inputData, setInputData] = useState("");

  if (subcatSelect) {
    return (
      <div>
        <div className="w-full">
          <div
            onClick={() => setOpen1(!open1)}
            className="flex items-center mb-2 hover:bg-crystamolBackground p-1 md:p-2 lg:p-1.5 rounded-md border bg-gray-200 mt-4 relative"
          >
            <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
              <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                {inputData === "" ? defaultName : inputData}
              </h5>
            </div>
            {!open1 ? (
              <div onClick={() => setOpen1(!open1)}>
                <MdKeyboardArrowRight className="text-crystamolPink cursor-pointer text-2xl" />
              </div>
            ) : (
              <div onClick={() => setOpen1(!open1)}>
                <MdOutlineKeyboardArrowDown className="text-crystamolPink cursor-pointer text-2xl" />
              </div>
            )}
          </div>
          {open1 && (
            <div
              className={`lg:w-[20%] bg-crystamolWhite ${
                items.length > 15 ? `overflow-y-scroll h-80` : ``
              }  rounded border z-[500] transition duration-300 ease-in absolute bg-white  p-2`}
            >
              <input
                onChange={(e) => setSearchData(e.target.value)}
                type="text"
                placeholder="Search"
                value={searchData}
                className=" border mx-4 h-10 px-4 py-2 rounded-md text-sm text-gray-600 focus:border-bellefuOrange focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-5"
              />
              <ul className="rounded  py-4">
                {items
                  .filter((count) => {
                    if (searchData === "") {
                      return count;
                    } else if (
                      count.subCatName
                        .toLowerCase()
                        .includes(searchData?.toLowerCase())
                    ) {
                      return count;
                    }
                  })
                  .map((counts, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        //   handleThings(counts),
                        setInputData(counts.subCatName),
                          setOpen1(!open1),
                          setSearchData("");
                        setValue(counts.subCatId);
                      }}
                      className="px-4 py-2 hover:bg-gray-300 cursor-pointer hover:text-crystamolWhite flex space-x-5 items-center cursor-pointe rounded"
                    >
                      <pre> {counts.subCatName}</pre>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="w-full">
          <div
            onClick={() => setOpen1(!open1)}
            className="flex items-center mb-2 hover:bg-crystamolBackground p-1 md:p-2 lg:p-1.5 rounded-md border bg-gray-200 mt-4 relative"
          >
            <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
              <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
                {inputData === "" ? defaultName : inputData}
              </h5>
            </div>
            {!open1 ? (
              <div onClick={() => setOpen1(!open1)}>
                <MdKeyboardArrowRight className="text-crystamolPink cursor-pointer text-2xl" />
              </div>
            ) : (
              <div onClick={() => setOpen1(!open1)}>
                <MdOutlineKeyboardArrowDown className="text-crystamolPink cursor-pointer text-2xl" />
              </div>
            )}
          </div>
          {open1 && (
            <div
              className={`lg:w-[20%] bg-crystamolWhite ${
                items.length > 20 ? `overflow-y-scroll h-80` : ``
              }  rounded border z-[500] transition duration-300 ease-in absolute bg-white  p-2`}
            >
              <input
                onChange={(e) => setSearchData(e.target.value)}
                type="text"
                placeholder="Search"
                value={searchData}
                className=" border mx-4 h-10 px-4 py-2 rounded-md text-sm text-gray-600 focus:border-bellefuOrange focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-5"
              />
              <ul className="rounded  py-4">
                {items
                  .filter((count) => {
                    if (searchData === "") {
                      return count;
                    } else if (
                      count.name
                        .toLowerCase()
                        .includes(searchData?.toLowerCase())
                    ) {
                      return count;
                    }
                  })
                  .map((counts, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        //   handleThings(counts),
                        setInputData(counts.name),
                          setOpen1(!open1),
                          setSearchData("");

                        if (state) {
                          setValue(counts.code);
                        } else {
                          setValue(counts.id);
                          setSubCat(counts.sub_category);
                        }
                      }}
                      className="px-4 py-2 hover:bg-gray-300 cursor-pointer hover:text-crystamolWhite flex space-x-5 items-center cursor-pointe rounded"
                    >
                      <pre> {counts.name}</pre>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SelectComponent;
