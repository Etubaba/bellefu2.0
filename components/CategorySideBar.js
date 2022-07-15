import Dropdown from "./Dropdown";
import { AiOutlineCaretRight, AiOutlineCaretDown } from "react-icons/ai";
import { useRouter } from "next/router";
import Skeleton from "@mui/material/Skeleton";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { login } from "../features/bellefuSlice";
import { toast } from "react-toastify";

const CategorySideBar = ({ categories, indexData }) => {
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
          <Dropdown key={category.id} category={category} />
        ))}
        <div className="">
          <div
            onClick={() => {
              if (isLoggedIn) {
                router.push("/custom");
              } else {
                toast.error("login to make a special request");
                router.push("/login");
              }
            }}
            className="flex items-center justify-between mb-7 hover:bg-bellefuBackground p-1 rounded-md"
          >
            {loading ? (
              <>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div>
                    <img
                      onClick={() => router.push("/custom")}
                      src="/CR.png"
                      alt="icons"
                      className="w-10 h-12"
                    />
                  </div>
                  <h5
                    className="text-bellefuBlack1 text-normal font-medium whitespace-nowrap"
                    onClick={() => router.push("/custom")}
                  >
                    Special Request
                  </h5>
                </div>
                <div className="">
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
        </div>
      </div>
    </div>
  );
};

export default CategorySideBar;
