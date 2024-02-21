import React from "react";
import { FiMenu } from "react-icons/fi";
import { useStateContext } from "./DataProvider";

const Navbar = () => {
  const { isSidebarActive, setSidebarActive } = useStateContext();

  return (
    <div className="flex">
      <button className="text-purple-900 text-2xl" onClick={() => {
        setSidebarActive(!isSidebarActive)
        console.log(isSidebarActive)
      }}>
        <FiMenu />
      </button>
    </div>
  );
};

export default Navbar;
