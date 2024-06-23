import React from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = ({
  text = "Ini Link",
  path = "/",
  imgPath = "/",
  imgAlt = "icon",
}) => {
  return (
    <li>
      <NavLink
        to={path}
        className="flex items-center w-full h-full gap-2 lg:gap-4 py-4 lg:pl-8 pl-3 text-xs transition-all duration-300 lg:text-[14px] border-y border-softPrimary hover:bg-softPrimary"
      >
        <img src={imgPath} alt={imgAlt} className="w-4 h-4 lg:w-5 lg:h-5" />
        <span className="text-customWhite">{text}</span>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
