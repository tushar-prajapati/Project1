import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const RecentProject = () => {
  const [recentProject, setRecentProject] = useState(null);

  const fetchRecentProject = async () => {
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
        const sortedProjects = response.data.data.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        setRecentProject(sortedProjects[0]);
      } else {
        alert("Failed to fetch projects: " + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("An error occurred while fetching the recent project.");
    }
  };

  useEffect(() => {
    fetchRecentProject();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      {recentProject ? (
        <div className="p-4 bg-green-100 rounded shadow">
          <h3 className="font-bold text-lg">Most Recent Project</h3>
          <p className="mt-2">
            <span className="font-semibold">Title:</span> {recentProject.title}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">Description:</span>{" "}
            {recentProject.description || "No description available."}
          </p>
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold">Last Modified:</span>{" "}
            {new Date(recentProject.updatedAt).toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">Loading recent project...</p>
      )}
    </div>
  );
};

export default RecentProject;
