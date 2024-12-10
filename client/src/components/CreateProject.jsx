import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";

const CreateProject = ({ onProjectCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onCreateSubmit = async (data) => {
    try {
      const token = Cookies.get("accessToken");
  
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }
  
      // Prepare the payload
      const payload = {
        title: data.title,
        description: data.description,
        segments: data.segments.split(",").map((seg) => seg.trim()),
      };
  
      // Send the request
      const response = await axios.post(
        "http://localhost:3000/api/v1/projects/createProject",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success) {
        alert(response.data.message);
        onProjectCreated(response.data.data); // Notify parent component
        reset();
      } else {
        alert("Failed to create project: " + response.data.message);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      alert("An error occurred while creating the project.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onCreateSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Title
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          type="text"
          placeholder="Enter project title"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Enter project description"
          className="w-full p-3 border border-gray-300 rounded-lg"
        ></textarea>
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Segments (comma separated)
        </label>
        <input
          {...register("segments", { required: "Segments are required" })}
          type="text"
          placeholder="Enter segments"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        {errors.segments && (
          <p className="text-sm text-red-500">{errors.segments.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-blue-500 text-white rounded-lg"
      >
        Create Project
      </button>
    </form>
  );
};

export default CreateProject;
