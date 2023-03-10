import { useState, useEffect } from "react";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";

import { useRouter } from "next/router";
import MobileCategoryItem from "./MobileCategoryItem";
import { Modal, Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { categoryUrl } from "../../constant";



const MobileCategory = ({ category }) => {
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



  if (category.sub_category) {
    return (
      <div className="">
        <div
          key={category.id}
          className="flex bg-gray-100 px-1 py-2 rounded-md h-24 relative"
        >
          <div
            className="flex flex-col items-center flex-1 space-x-2 cursor-pointer select-none"
            onClick={() => setOpen(!open)}
          >
            {loading ? <img
              src={`${categoryUrl}${category?.image}`}
              alt="icons"
              className="w-14 h-14 object-fill"
            /> : <Skeleton
              variant="circular"
              animation="wave"
              width={"55%"}
              height={60}
            />}
            {loading ? <h5 className="text-bellefuBlack1 font-medium text-xs text-center">
              {category.name}
            </h5> : <Skeleton
              className="rounded-md mt-2"

              variant="rectangular"
              animation="wave"
              width={"70%"}
              height={10}
            />}
          </div>
          {/* <div className="mr-2">
            {open === false ? (
              <div
                onClick={() => setOpen(!open)}
                className="bg-gray-200 rounded-full p-1"
              >
                <AiOutlineCaretRight className="text-gray-400 cursor-pointer w-4 h-4 flex items-center justify-center" />
              </div>
            ) : (
              <div
                onClick={() => setOpen(!open)}
                className="bg-gray-200 rounded-full p-1"
              >
                <AiOutlineCaretDown className="text-gray-400 cursor-pointer w-4 h-4 flex items-center justify-center" />
              </div>
            )}
          </div> */}
        </div>
        {/* mobile category sidebar */}
        {/* <div
          className={
            open
              ? "inline-block w-72 h-72 -mt-6 space-y-3 text-sm text-white select-none bg-[#333333] absolute top-52 left-0 z-50 rounded-br-md rounded-tr-md animate-slide-in "
              : "hidden"
          }
        >
          <div
            className="flex items-center justify-end px-3 mt-3 -mb-3"
            onClick={() => setOpen(false)}
          >
            <RiCloseFill className="w-5 h-5" />
          </div>

          <div className="" />
          {category.sub_category.map((child) => (
            <MobileCategoryItem key={child.sub_category} child={child} />
          ))}
        </div> */}
        {/* onClick=
        {() => {
          setText(child.subCatId);
          dispatch(Subcat(child.subcatId));
        }} */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="flex flex-col items-center justify-center mx-auto mt-52 pt-2 rounded-md shadow-md h-80 w-72  bg-bellefuWhite overflow-y-scroll">
            <div className="text-start">
              {category.sub_category.map((child) => (
                <MobileCategoryItem
                  key={child.subCatId}
                  child={child}
                  setOpen={setOpen}
                />
              ))}
            </div>
          </div>
        </Modal>
      </div>
    );
  } else {
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
  }
};

export default MobileCategory;
