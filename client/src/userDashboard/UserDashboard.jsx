import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/DashNavbar";
// import Sidebar from "../components/Sidebar";
// import RecentProjects from "./components/RecentProject";
// import Projects from "./components/Projects";
import axios from "axios";
import UserNewAnalysis from "./UploadData";
import UserSidebar from "./UserSidebar";
import UploadData from "./UploadData";
import UserNewAnalysisfol from "./UserNewAnalysisfol";
// import Timeline from "./components/Timeline";
// import NewAnalysis from "./components/NewAnalysis";

const UserDashboard = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedOption, setSelectedOption] = useState("recent");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      // Clear user data and tokens
      localStorage.removeItem("user");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
    //   case "recent":
    //     return <RecentProjects />;
    //   case "timeline":
    //     return <Timeline setSelectedOption={setSelectedOption}/>
    //   case "projects":
    //     return <Projects selectedOption={selectedOption}  setSelectedOption={setSelectedOption}
    //     />;
      case "uploadData":
        return <div><UploadData/></div>;
      case "usernewanalysisfol":
        return <div><UserNewAnalysisfol setSelectedOption={setSelectedOption}/></div>;
      default:
        return <div>Welcome to SadakNirikshak Dashboard</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <UserSidebar
        isMinimized={isMinimized}
        setIsMinimized={setIsMinimized}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Navbar */}
        <Navbar
          user={user}
          handleLogout={handleLogout}
          toggleProfile={() => setIsProfileOpen(!isProfileOpen)}
        />

        {/* Conditional Rendering Area */}
        <div className="flex-grow p-4 bg-gray-100">{renderContent()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
