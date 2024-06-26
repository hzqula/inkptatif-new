import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import InputNilaiKP from "./pages/InputNilaiKP";
import InputNilaiTA from "./pages/InputNilaiTA";
import Header from "./components/Header";
import DetailInputNilaiKP from "./pages/DetailInputNilaiKP";
import DetailInputNilaiTA from "./pages/DetailInputNilaiTA";

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
          className={` ${
            isChecked ? "sm:ml-0 lg:ml-60" : ""
          } transition-all duration-700`}
        >
          <Outlet />
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to="/login" replace />, // Redirect root to login
        },
        {
          path: "/beranda",
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
        {
          path: "/detail-kp/:nim",
          element: <DetailInputNilaiKP />,
        },
        {
          path: "/detail-ta/:nim",
          element: <DetailInputNilaiTA />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/login" replace />, // Catch-all route to redirect to login
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
