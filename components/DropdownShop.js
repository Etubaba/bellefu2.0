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

  if (category?.sub_category) {
    return (
      <div className="">
        <div
          key={category.id}
          className="flex items-center mb-7 hover:bg-bellefuBackground p-1 rounded-md"
        >
          {loading ? (
            <>
              <div
                onClick={() => {
                  dispatch(selectCat(category?.id));

                  router.push(
                    `/category/${catId === null ? category?.id : catId}`
                  );
                }}
                className="flex items-center flex-1 space-x-2 cursor-pointer select-none"
              >
                <img
                  src={`${categoryUrl}${category?.image}`}
                  alt="icons"
                  className="w-10 h-10"
                />
                <h5 className="text-bellefuBlack1 font-medium text-normal whitespace-nowrap">
                  {category?.name.charAt(0).toUpperCase() +
                    category?.name.slice(1)}
                </h5>
                
              </div>
              <div>
                <AiOutlineCaretRight className="text-gray-500 cursor-pointer" />
              </div>
            </>
          ) : (
            <>
              <Skeleton
                className="mr-1.5"
                variant="circular"
                animation="wave"
                width={"10%"}
                height={30}
              />
              <Skeleton
                className="rounded-md"
                variant="rectangular"
                animation="wave"
                width={"80%"}
                height={10}
              />
            </>
          )}
        </div>
        <div
          className={
            open
              ? "inline-block w-full -mt-6 space-y-3 text-sm text-bellefuBlack1 select-none bg-bellefuWhite"
              : "hidden"
          }
        >
          <div className=" border-t-2" />
          {category?.sub_category.map((child) => (
            <DropdownItems
              onClick={() => {
                setText(child.subCatId);
                dispatch(Subcat(child.subcatId));
              }}
              key={child.subCatId}
              child={child}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div
          key={category?.id}
          className="flex items-center mb-7 hover:bg-bellefuBackground p-1 rounded-md"
        >
          <div className="flex  items-center flex-1 space-x-2 cursor-pointer">
            <img
              src={`${categoryUrl}${category?.image}`}
              alt="icons"
              className="w-8 h-8"
            />
            <h5
              className="text-bellefuBlack1 text-normal font-medium whitespace-nowrap"
              onClick={() => router.push("/category/id")}
            >
              {category?.name}
            </h5>
          </div>
        </div>
      </div>
    );
  }
};

export default DropdownShop;
