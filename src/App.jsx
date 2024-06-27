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
import InputNilaiKP from "./pages/KP";
import InputNilaiTA from "./pages/TA";
import Header from "./components/Header";
import DetailInputNilaiKP from "./pages/DetailInputNilaiKP";
import DetailInputNilaiTA from "./pages/DetailInputNilaiTA";
import KP from "./pages/KP";
import TA from "./pages/TA";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

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
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Beranda />
          </ProtectedRoute>
        ),
      },
      {
        path: "/kp/",
        element: (
          <ProtectedRoute>
            <KP />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ta/",
        element: (
          <ProtectedRoute>
            <TA />
          </ProtectedRoute>
        ),
      },
      {
        path: "/detail-kp/:nim",
        element: (
          <ProtectedRoute>
            <DetailInputNilaiKP />
          </ProtectedRoute>
        ),
      },
      {
        path: "/detail-ta/:nim",
        element: (
          <ProtectedRoute>
            <DetailInputNilaiTA />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
