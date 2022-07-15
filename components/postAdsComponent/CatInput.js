import * as React from "react";

import {
  handleCatUpdate,
  handleCategoryname,
 
} from "../../features/bellefuSlice";
import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";

export default function UnstyledSelectSimple1({ category, subcatCatcher }) {
  const catsname = useSelector((state) => state.bellefu?.postAddata);

  const [open1, setOpen1] = useState(false);
  const [inputdata, setInputData] = useState(null);
  const [searchdata, setSearchData] = useState("");

  const optionSelect = category;
  const dispatch = useDispatch();
  const handleThings = (counts) => {
    dispatch(handleCatUpdate(counts.id));
    dispatch(handleCategoryname(counts.name));
    subcatCatcher(counts.sub_category, counts.name);
  };

  return (
    // ############################

    <div>
      <div className="w-full">
        <div
          onClick={() => setOpen1(!open1)}
          className="flex items-center mb-2 hover:bg-crystamolBackground p-1 md:p-2 lg:p-1.5 rounded-md border bg-gray-200 mt-4 relative"
        >
          <div className="flex items-center flex-1 space-x-3 cursor-pointer select-none">
            <h5 className="text-bellefuBlack1 font-medium whitespace-nowrap">
              {catsname?.categoryname===""? "Select category":catsname?.categoryname}
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
        {open1 ? (
          <div className="lg:w-[20%] bg-crystamolWhite rounded border z-[500] transition duration-300 ease-in absolute bg-white  p-2   ">
            <input
              onChange={(e) => setSearchData(e.target.value)}
              type="text"
              placeholder="Search"
              className=" border mx-4 h-10 px-4 py-2 rounded-md text-sm text-gray-600 focus:border-bellefuOrange focus:outline-none focus:ring-1 focus:ring-black focus:ring-opacity-5"
            />
            <ul className="rounded  py-4">
              {optionSelect.categories
                .filter((count) => {
                  if (searchdata === "") {
                    return count;
                  } else if (
                    count.name.toLowerCase().includes(searchdata?.toLowerCase())
                  ) {
                    return count;
                  }
                })
                .map((counts, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleThings(counts),
                        setInputData(counts.name),
                        setOpen1(!open1),
                        setSearchData("");
                    }}
                    className="px-4 py-2 hover:bg-gray-300 cursor-pointer hover:text-crystamolWhite flex space-x-5 items-center cursor-pointe rounded"
                  >
                    <pre> {counts.name}</pre>
                  </li>
                ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>

    /* end of mobile header search */
  );
}
