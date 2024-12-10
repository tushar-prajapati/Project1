import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const RecentProject = () => {
  const [projects, setProjects] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchRecentProjects = async () => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/v1/projects/getProjects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setProjects(response.data.data);
      } else {
        alert("Failed to fetch projects: " + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("An error occurred while fetching projects.");
    }
  };

  useEffect(() => {
    fetchRecentProjects();
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      {/* Project Navigation Bar */}
      <div className="flex justify-between items-center p-3 bg-gray-200 rounded">
        <div className="font-bold text-lg">Recent Projects</div>
        <div className="flex space-x-4 text-sm">
          <span>Project ID: #12345</span>
          <span>Date: {new Date().toLocaleDateString()}</span>
          <span>Time: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mt-4">
        <button
          onClick={handleOpenPopup}
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Upload Image/Video
        </button>
      </div>

      {/* Popup for Upload Options */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded p-6 shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Upload Options</h3>
            <div className="space-y-4">
              <button className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
                Upload Image
              </button>
              <button className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Upload Video
              </button>
            </div>
            <button
              onClick={handleClosePopup}
              className="mt-4 w-full p-3 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* List of Recent Projects */}
      <ul className="space-y-3 mt-4">
        {projects.map((project) => (
          <li
            key={project._id}
            className="p-3 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            <div className="font-semibold">{project.title}</div>
            <div className="text-sm text-gray-500">
              Last Modified: {new Date(project.modifiedAt).toLocaleDateString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentProject;
