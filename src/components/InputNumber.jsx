import React, { useState } from "react";

const InputNumber = ({ kriteria = "Kriteria" }) => {
  const [value, setValue] = useState(0);

  const kurang = () => {
    setValue((prevValue) => {
      const newValue = prevValue - 1;
      return newValue < 0 ? 0 : newValue;
    });
  };

  const tambah = () => {
    setValue((prevValue) => {
      const newValue = prevValue + 1;
      return newValue > 100 ? 100 : newValue;
    });
  };

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (newValue === "") {
      setValue("");
    } else {
      newValue = Math.max(0, Math.min(100, Number(newValue)));
      setValue(newValue);
    }
  };

  const handleBlur = () => {
    if (value === "") {
      setValue(0);
    }
  };

  return (
    <div>
      <form className="flex flex-col items-center max-w-xs px-4 py-2 mx-auto border-t border-softPrimary">
        <label
          htmlFor="quantity-input"
          className="text-sm font-bold text-primary"
        >
          {kriteria}
        </label>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            onClick={kurang}
            className="flex items-center justify-between h-8 p-3 bg-gray-100 border hover:bg-gray-200 border-secondary rounded-s-lg focus:ring-gray-100 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            max={100}
            min={0}
            id="quantity-input"
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-primary text-sm font-extrabold focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5"
            placeholder="0-100"
            required
          />
          <button
            type="button"
            onClick={tambah}
            className="flex items-center justify-between h-8 p-3 bg-gray-100 border hover:bg-gray-200 border-secondary rounded-e-lg focus:ring-gray-100 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputNumber;
