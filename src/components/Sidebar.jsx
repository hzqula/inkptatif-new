import React from "react";
import SideList from "./SideList";

const Sidebar = ({ isChecked, handleCheckboxChange }) => {
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
      <div className={`sidebar ${isChecked ? "show-sidebar" : ""}`}>
        <header className="flex items-center h-20 py-6 pl-6">
          <h3 className="font-bold text-center lg:text-2xl text-customWhite">
            INKPTA<span className="text-secondary">TIF</span>
          </h3>
        </header>
        <ul className="flex flex-col justify-center">
          <SideList
            path="/"
            text="Beranda"
            imgPath="./home.svg"
            imgAlt="beranda"
          />
          <SideList
            path="/input-nilai-kp"
            text="Kerja Praktek"
            imgPath="./post.svg"
            imgAlt="input-nilai-kp"
          />
          <SideList
            path="/input-nilai-ta"
            text="Tugas Akhir"
            imgPath="./post2.svg"
            imgAlt="input-nilai-ta"
          />
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
