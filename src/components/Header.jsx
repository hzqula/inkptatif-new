import React from "react";
import Icon from "./Icon";

const Header = () => {
  return (
    <>
      <div className="sticky top-0 left-0 z-30 flex items-center justify-end h-20 px-6 py-2 mb-4 shadow-md bg-gradient-to-l from-secondary to-primary shadow-black/5">
        <div className="flex items-center gap-5 icons">
          <Icon path="/search.svg" alt="search" />
          <div className="flex items-center gap-2">
            <img
              src="/noavatar.png"
              alt="user"
              className="w-[26px] h-[26px] rounded-full object-cover"
            />
            <h3>Fulan, S.T., M.Kom.,</h3>
          </div>
          <div className="relative notification">
            <Icon path="/notifications.svg" alt="notification" />
            <span className="absolute flex items-center w-4 h-4 rounded-full bg-customRed -top-[10px] -right-[10px] text-[10px] justify-center">
              13
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
