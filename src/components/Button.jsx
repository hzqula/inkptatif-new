import React from "react";

const Button = ({ background = "customGreen", teks = "Teks" }) => {
  return (
    <button
      className={`w-full inline-block px-[20px] py-2 bg-${background} text-customWhite text-sm font-bold`}
    >
      {teks}
    </button>
  );
};

export default Button;
