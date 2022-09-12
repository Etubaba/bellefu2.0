import { useState, useEffect } from "react";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import MobileCategoryItem from "./MobileCategoryItem";
import { Modal, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { categoryUrl } from "../../constant";

const MobileCategoryShop = ({ category }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="">
      <div
        key={category.id}
        className="flex items-center mb-1 bg-gray-100 px-1 py-2 rounded-md h-24"
      >
        <div
          className="flex flex-col items-center flex-1 space-x-2 cursor-pointer"
          onClick={() => router.push("/category/id")}
        >
          <img
            src={`${categoryUrl}${category.image}`}
            alt="icons"
            className="w-14 h-14 object-fill"
          />
          <h5 className="text-bellefuBlack1 text-xs text-center font-medium">
            {category.name}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default MobileCategoryShop;
