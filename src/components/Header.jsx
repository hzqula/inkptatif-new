import React from "react";
import Icon from "./Icon";
import profile from "../assets/noavatar.png";

const Header = ({ userInfo }) => {
  return (
    <>
      <div className="sticky top-0 left-0 z-30 flex items-center justify-end h-20 px-6 py-2 mb-4 shadow-md bg-gradient-to-l from-secondary to-primary shadow-black/5">
        <div className="flex items-center gap-5 icons">
          <div className="flex items-center gap-2">
            <img
              src={profile}
              alt="user"
              className="w-[26px] h-[26px] rounded-full object-cover"
            />
            <h3>{userInfo ? userInfo.nama : "Loading..."}</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
