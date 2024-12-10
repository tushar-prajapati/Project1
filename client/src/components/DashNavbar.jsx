import React, { useState } from "react";

const DashNavbar = ({ user, handleLogout, toggleProfile }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Navbar Title */}
      <h1 className="text-lg font-bold">SadakNirikshak</h1>

      {/* User Profile Section */}
      <div className="relative">
        <button
          className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={handleDropdownToggle}
        >
          {user?.fullName || "Profile"}
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40">
            {/* Profile Button */}
            <div
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={toggleProfile}
            >
              View Profile
            </div>

            {/* Logout Button */}
            <div
              className="p-2 hover:bg-gray-200 cursor-pointer border-t"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashNavbar;
