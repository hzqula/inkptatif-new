import React, { useState } from "react";
import heroImg from "../assets/hero-img.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";

const Login = () => {
  const { setUser } = useUser();
  const [nip, setNip] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://inkptatif.xyz/login.php?app=dosen&action=login", // Use the /api prefix
        { nip, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const { token, user } = response.data; // Assume response.data contains user

      if (token) {
        // Save token in localStorage or another secure place
        localStorage.setItem("token", token);

        // Save user data in context
        setUser(user);
        console.log("Token: " + token);
        // Navigate to another page after successful login
        navigate("/beranda/");
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
    }
  };

  console.log(nip);
  console.log(password);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-primary">
      <div className="flex items-center bg-white shadow-l md:h-3/5 lg:h-[70%] w-[85%] justify-between overflow-hidden border-secondary border-2">
        <div className="w-full lg:w-[40%] p-16">
          <h1 className="text-3xl font-bold md:mb-2 lg:mb-4 lg:text-4xl text-primary font-primary">
            InKPTA<span className="text-secondary">TIF</span>
          </h1>
          <p className="font-medium md:mb-3 lg:mb-6 md:text-sm lg:text-base text-primary font-primary">
            Aplikasi penginputan nilai untuk dosen pembimbing dan dosen penguji,
            khusus untuk Kerja Praktek dan Tugas Akhir.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="nip"
                className="block mb-2 font-bold text-primary font-primary md:text-sm"
              >
                NIP
              </label>
              <input
                type="text"
                id="nip"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
                className="w-full px-3 py-2 font-bold border lg:py-2 md:py-1 border-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 text-customBlack"
                placeholder="12345678910111213"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 font-bold md:text-sm text-primary font-primary"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 font-bold border lg:py-2 md:py-1 border-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 text-customBlack"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 text-blue-600 form-checkbox"
                />
                <label
                  htmlFor="rememberMe"
                  className="block ml-2 text-secondary md:text-[10px]"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-secondary hover:text-blue-800 md:text-[10px]"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition-colors duration-300 bg-primary bg-navy-900 hover:bg-navy-700"
            >
              Login
            </button>
          </form>
        </div>
        <div className="lg:w-[60%] h-full lg:flex items-center hidden">
          <img
            src={heroImg}
            alt="Ilustrasi"
            className="w-full h-full shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
