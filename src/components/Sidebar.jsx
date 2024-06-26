import React from "react";
import SidebarItem from "./SidebarItem";
import homeIcon from "../assets/home.svg";
import kpIcon from "../assets/post.svg";
import taIcon from "../assets/post2.svg";
import userIcon from "../assets/user.svg";
import backIcon from "../assets/back.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isChecked, handleCheckboxChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <input
        type="checkbox"
        id="check"
        className="hidden"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="check" className="z-50">
        <i
          id="show"
          className={`z-50 fixed p-1 text-xl lg:text-4xl rounded-lg cursor-pointer bx bx-menu bx-flip-vertical bg-softPrimary text-customWhite top-4 left-6 lg:left-6 ${
            isChecked ? "opacity-0 pointer-events-none" : ""
          } transition-all duration-300`}
        ></i>
        <i
          id="cancel"
          className={`fixed rounded-lg cursor-pointer bx bx-arrow-back bx-flip-vertical text-customWhite bg-softPrimary z-50 left-[8.5rem] lg:left-44 top-4 text-xl lg:text-4xl p-1 ${
            isChecked ? "" : "opacity-0 pointer-events-none"
          } transition-all duration-300 z-[999]`}
        ></i>
      </label>
      <div
        className={`sidebar ${
          isChecked ? "show-sidebar" : ""
        } flex flex-col justify-between`}
      >
        <div>
          <header className="flex items-center h-20 py-6 pl-6">
            <h3 className="font-bold text-center lg:text-2xl text-customWhite">
              INKPTA<span className="text-secondary">TIF</span>
            </h3>
          </header>
          <ul className="flex flex-col justify-center">
            <SidebarItem
              path="/"
              text="Beranda"
              imgPath={homeIcon}
              imgAlt="beranda"
            />
            <SidebarItem
              path="/kp"
              text="Kerja Praktek"
              imgPath={kpIcon}
              imgAlt="kp"
            />
            <SidebarItem
              path="/ta"
              text="Tugas Akhir"
              imgPath={taIcon}
              imgAlt="ta"
            />
          </ul>
        </div>
        <ul className="flex flex-col justify-center">
          <SidebarItem
            path="/ta"
            text="Tentang Kami"
            imgPath={userIcon}
            imgAlt="ta"
          />
          <button
            onClick={handleLogout}
            className="flex items-center w-full h-full gap-2 lg:gap-4 py-4 lg:pl-8 pl-3 text-xs transition-all duration-300 lg:text-[14px] border-y bg-customRed border-softPrimary hover:bg-red-500"
          >
            <img
              src={backIcon}
              alt="Logout"
              className="w-4 h-4 lg:w-5 lg:h-5"
            />
            Logout
          </button>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
