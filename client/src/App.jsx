// src/App.jsx

import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import checkAccessToken from "./utils/auth"; // Import default export
import Cookies from "js-cookie";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import UserDashboard from "./userDashboard/UserDashboard";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const refreshToken = Cookies.get("refreshToken");
    const userData = JSON.parse(localStorage.getItem("user"));

if(userData.isAdmin == true){
    // If access token is valid, redirect to dashboard
    if (accessToken && checkAccessToken(accessToken)) {
      navigate("/dashboard");
    } else if (refreshToken && checkAccessToken(refreshToken)) {
      // If access token is invalid but refresh token exists
      // Call API to refresh the access token here and store it in cookies
      navigate("/dashboard");
    } else {
      // No valid tokens, redirect to landing page
      navigate("/");
    }
  }
  else{
        // If access token is valid, redirect to dashboard
        if (accessToken && checkAccessToken(accessToken)) {
          navigate("/userdashboard");
        } else if (refreshToken && checkAccessToken(refreshToken)) {
          // If access token is invalid but refresh token exists
          // Call API to refresh the access token here and store it in cookies
          navigate("/userdashboard");
        } else {
          // No valid tokens, redirect to landing page
          navigate("/");
        }
  }
  }, [navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
