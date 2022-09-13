import { useState, useEffect } from "react";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import DropdownItems from "./DropdownItems";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectCat } from "../features/bellefuSlice";
import { Subcat, changeId } from "../features/bellefuSlice";
import Skeleton from "@mui/material/Skeleton";
import { categoryUrl } from "../constant";

const DropdownShop = ({ category }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const catId = useSelector(changeId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      onClick={() => {
        dispatch(selectCat(category?.id));
      }}
      className=""
    >
      <div
        key={category?.id}
        className="flex  mb-7 hover:bg-bellefuBackground p-1 rounded-md"
      >
        <div className="flex  flex-1 space-x-2 cursor-pointer">
          <img
            src={`${categoryUrl}${category?.image}`}
            alt="icons"
            className="w-8 h-8"
          />
          <h5 className="text-bellefuBlack1  font-medium whitespace-nowrap">
            {category?.name}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DropdownShop;
