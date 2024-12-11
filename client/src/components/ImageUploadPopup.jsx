import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ImageUploadPopup = ({ isOpen, onClose, projectId }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    // Capture the selected file
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image to upload.");
      return;
    }

    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const formData = new FormData();
      formData.append("thumbnail", selectedImage);
      formData.append("projectId", projectId); // Send the selected project ID

      // Call the backend API to upload the image
      const response = await axios.post("http://localhost:3000/api/v1/projects/upload/thumbnail", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Image uploaded successfully!");
        onClose(); // Close the popup
      } else {
        alert("Failed to upload image: " + response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-medium text-gray-900 mb-4">Upload Image for Project</h3>
        {/* Input field to select an image file */}
        <input
          type="file"
          accept="image/*" // Accept only image files
          onChange={handleImageChange} // Update selected image
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleImageUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadPopup;
