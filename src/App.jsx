import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import DetailInputNilaiKP from "./pages/DetailInputNilaiKP";
import DetailInputNilaiTA from "./pages/DetailInputNilaiTA";
import KP from "./pages/KP";
import TA from "./pages/TA";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login setIsAuthenticated={setIsAuthenticated} />,
    },
    {
      path: "/",
      element: <ProtectedRoute element={<Layout />} />,
      children: [
        {
          path: "beranda",
          element: <Beranda />,
        },
        {
          path: "kp",
          element: <KP />,
        },
        {
          path: "ta",
          element: <TA />,
        },
        {
          path: "detail-kp/:nim",
          element: <DetailInputNilaiKP />,
        },
        {
          path: "detail-ta/:nim",
          element: <DetailInputNilaiTA />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
