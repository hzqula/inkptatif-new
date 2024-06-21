import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import InputNilaiKP from "./pages/InputNilaiKP";
import InputNilaiTA from "./pages/InputNilaiTA";
import Header from "./components/Header";

const App = () => {
  const Layout = () => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    return (
      <>
        <Sidebar
          isChecked={isChecked}
          setIsChecked={setIsChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
        <div
          className={` ${isChecked ? "ml-60" : ""} transition-all duration-700`}
        >
          <Outlet />
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Beranda />,
        },
        {
          path: "/input-nilai-kp",
          element: <InputNilaiKP />,
        },
        {
          path: "/input-nilai-ta",
          element: <InputNilaiTA />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
