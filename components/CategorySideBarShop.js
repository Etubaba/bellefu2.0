import DropdownShop from "./DropdownShop";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { login } from "../features/bellefuSlice";
import { toast } from "react-toastify";

const CategorySideBarShop = ({ categories, indexData }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const router = useRouter();
  const isLoggedIn = useSelector(login);

  return (
    <div className="bg-bellefuWhite rounded-md pb-10">
      <div className="pt-4">
        <h4 className="hidden lg:inline tracking-wider text-lg text-bellefuTitleBlack font-semibold px-5 rounded-md">
          Top Category
        </h4>
      </div>
      <div className="px-3 pt-5">
        {categories?.map((category) => (
          <DropdownShop key={category.id} category={category} />
        ))}
      
      </div>
    </div>
  );
};

export default CategorySideBarShop;
