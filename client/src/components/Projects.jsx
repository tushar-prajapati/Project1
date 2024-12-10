import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateProject from "./CreateProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);

  const fetchProjects = async () => {
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
    } finally {
      setLoading(false);
    }
  };

  const fetchProjectDetails = async (projectId) => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/api/v1/projects/singleProject/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Project Details:", response.data.data); // Log project details
      } else {
        alert("Failed to fetch project details: " + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching project details:", error);
      alert("An error occurred while fetching project details.");
    }
  };

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [...prev, newProject]);
    setIsCreateProjectOpen(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading projects...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 hover:shadow-xl transition cursor-pointer"
            onClick={() => fetchProjectDetails(project._id)} // Fetch details on click
          >
            <h3 className="text-xl font-medium text-gray-900">{project.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{project.description}</p>
          </div>
        ))}
        <div
          onClick={() => setIsCreateProjectOpen(true)}
          className="flex items-center justify-center bg-gray-100 rounded-lg shadow-lg p-6 cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition"
        >
          <span className="text-gray-500 text-lg font-medium">+ Add New Project</span>
        </div>
      </div>

      {isCreateProjectOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Create a New Project</h2>
            <CreateProject onProjectCreated={handleProjectCreated} />
            <button
              onClick={() => setIsCreateProjectOpen(false)}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
