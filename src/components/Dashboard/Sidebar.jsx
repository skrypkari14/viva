import React from "react";
import logo_dashboard from "../../img/logo_dashboard.png";
import { MdCancel } from "react-icons/md";
import { sidebarItems } from "./data";
import { Link, useLocation } from "react-router-dom";
import { useStateContext } from "./DataProvider";

const Sidebar = () => {
  const location = useLocation();
  const { isSidebarActive, setSidebarActive } = useStateContext();

  return (
    <div className={`fixed z-50 transition-all duration-500 ${isSidebarActive ? 'bg-main-transparent h-screen w-screen' : ''}`}>
        <div
          className={`relative h-screen bg-white p-7 w-72 flex flex-col gap-10 transition-all ${isSidebarActive ? 'bg-main-transparent' : 'ml-[-300px]'}`}
        >
          <img src={logo_dashboard} alt="" className="w-32 mx-auto"></img>
          <button
            className="absolute top-4 right-4 text-2xl text-purple-900"
            onClick={() => setSidebarActive((prevSidebarActive) => !prevSidebarActive)}
          > 
            <MdCancel></MdCancel>
          </button>
          <div className="h-[1px] w-full bg-gray-200"></div>
          <div className="flex flex-col gap-5">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={`/dashboard${item.route}`}
                className={`transition flex items-center gap-2 text-lg text-gray-600 py-2 rounded-lg pl-1 ${
                  location.pathname === `/dashboard${item.route}`
                    ? "bg-main text-white"
                    : "hover:bg-purple-main hover:text-white"
                }`}
                onClick={() => setSidebarActive((prevSidebarActive) => !prevSidebarActive)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-regular">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Sidebar;
