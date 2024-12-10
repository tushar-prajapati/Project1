import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

const CreateProject = ({ onProjectCreated }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      // Format segments as an array of strings
      const segments = data.segments.split(",").map((segment) => segment.trim());

      // API Call to create a new project
      const response = await axios.post(
        "http://localhost:3000/api/v1/projects/createProject",
        {
          title: data.title,
          description: data.description,
          segments,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert("Project created successfully!");
        // Reset the form
        reset();
        // Notify parent component to refresh projects
        if (onProjectCreated) {
          onProjectCreated(response.data.data);
        }
      } else {
        alert("Failed to create project: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("An error occurred while creating the project.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Project</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            placeholder="Enter project title"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Enter project description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Segments Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Segments (comma-separated)</label>
          <input
            {...register("segments", { required: true })}
            type="text"
            placeholder="e.g., Segmenta, Segmentb"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium text-lg py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
