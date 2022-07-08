import React from "react";
import { useSelector } from "react-redux";
import { country } from "../../features/bellefuSlice";
import { BiSortAlt2, BiGridSmall } from "react-icons/bi";
import { FaThList } from "react-icons/fa";
import { IoGrid } from "react-icons/io";
// import { grid } from "@mui/system";

function MainProductHeader({ changeView, title, grid }) {
  const countryProductSearchEmpty = useSelector(
    (state) => state.bellefu.countryProductSearchEmpty
  );
  const searchCountry = useSelector(country);

  return (
    <div className="bg-bellefuWhite rounded-t-md">
      <div className="flex items-center justify-between p-4 ">
        {(!countryProductSearchEmpty || !searchCountry) && (
          <h3 className="font-bold text-[1rem] sm:text-[1rem] lg:text-[1.2rem]">
            {title}
          </h3>
        )}
        <div className=" md:hidden flex justify-between">
          <div className="border-2 rounded-md w-[20vw] sm:w-[20vw]  lg:w-[4vw] flex justify-around">
            <div onClick={() => changeView(false)}>
              <FaThList className="text-bellefuOrange text-[1.5rem] pt-2" />
            </div>
            <div onClick={() => changeView(true)}>
              {" "}
              <BiGridSmall className="text-bellefuOrange text-[2rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainProductHeader;
