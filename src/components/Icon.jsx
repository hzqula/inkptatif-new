import React from "react";

const Icon = ({ path = "/", alt = "/" }) => {
  return (
    <>
      <img src={path} alt={alt} className="icon" />
    </>
  );
};

export default Icon;
