import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CreateProjectPopup from "./CreateProjectPopup";
import ProjectSegmentPopup from "./ProjectSegmentPopup";
import ProjectImg from "../assets/projectimg.jpg";
import ImageUploadPopup from "./ImageUploadPopup"; 

const Projects = ({ selectedOption, setSelectedOption }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isProjectSegmentOpen, setIsProjectSegmentOpen] = useState(false);
  const [isUploadImageOpen, setIsUploadImageOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
//hello
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
            onClick={() => {
              setSelectedProjectId(project._id);
              setIsProjectSegmentOpen(true);
            }}
          >
            <img src={ProjectImg} alt="Description" />
            <h3 className="text-xl font-medium text-gray-900">{project.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{project.description}</p>
            <div
              onClick={(e) => {
                e.stopPropagation(); 
                setSelectedProjectId(project._id);
                setIsUploadImageOpen(true); 
              }}
              className="text-blue-500 cursor-pointer mt-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Upload Image
            </div>
          </div>
        ))}
        <div
          onClick={() => setIsCreateProjectOpen(true)}
          className="flex items-center justify-center bg-gray-100 rounded-lg shadow-lg p-6 cursor-pointer border-2 border-dashed border-gray-300 hover:bg-gray-200 hover:border-gray-400 transition"
        >
          <span className="text-gray-500 text-lg font-medium">+ Add New Project</span>
        </div>
      </div>

      {/* Popups */}
      <CreateProjectPopup
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onProjectCreated={handleProjectCreated}
      />
      <ProjectSegmentPopup
        isOpen={isProjectSegmentOpen}
        onClose={() => setIsProjectSegmentOpen(false)}
        projectId={selectedProjectId}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {/* Image Upload Popup */}
      <ImageUploadPopup
        isOpen={isUploadImageOpen}
        onClose={() => setIsUploadImageOpen(false)}
        projectId={selectedProjectId}
      />
    </div>
  );
};

export default Projects;
