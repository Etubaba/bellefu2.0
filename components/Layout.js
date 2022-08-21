import MobileUserSidebar from "./usercomponent/MobileUserSidebar";
import UserSideBar from "./usercomponent/UserSideBar";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { useSelector } from "react-redux";
import AlternateComponent from "./alternateComponent/AlternateComponent";
import { BiArrowBack } from "react-icons/bi";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const userId = useSelector((state) => state.bellefu?.profileDetails);
  return (
    <div className="bg-bellefuBackground max-w-[95%] lg:max-w-[90%] mx-auto mt-24">
      <div className="flex flex-col lg:flex-row">
        <UserSideBar />
        {isOpen && <MobileUserSidebar isOpen={isOpen} setIsOpen={setIsOpen} />}
        <div className="lg:hidden flex items-center space-x-6 mt-2">
          <div
            className=" cursor-pointer bg-bellefuOrange w-8 h-8 rounded-full flex items-center justify-center ml-3 "
            onClick={() => setIsOpen(true)}
          >
            <BiArrowBack className="text-white font-bold" />
          </div>
          <p className="text-sm text-gray-400 capitalize font-semibold">
            Go to user Navigation
          </p>
        </div>
        <main className="flex-grow w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
