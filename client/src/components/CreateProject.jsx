import React, { useState } from "react";
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
  const [imagePreview, setImagePreview] = useState(null);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onCreateSubmit = async (data) => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("segments", data.segments);
      formData.append("image", data.image[0]);

      const response = await axios.post(
        "http://localhost:3000/api/v1/projects/createProject",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        onProjectCreated(response.data.data);
        reset();
        setImagePreview(null);
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
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
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
        {errors.segments && <p className="text-sm text-red-500">{errors.segments.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Thumbnail Image
        </label>
        <input
          {...register("image", { required: "Image is required" })}
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 rounded-md w-full h-32 object-cover" />
        )}
        {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
      </div>

      <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg">
        Create Project
      </button>
    </form>
  );
};

export default CreateProject;
