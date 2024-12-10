import React, { useState } from "react";
import { useSegmentContext } from "../Context/SegmentContext";
import { AiOutlineUpload } from "react-icons/ai"; // Import upload icon
import axios from "axios"; // Import axios
import Cookies from "js-cookie";

const NewAnalysis = () => {
  const { selectedSegmentId } = useSegmentContext();
  const segmentId = selectedSegmentId; // Get the segmentId
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files selected for upload.");
      return;
    }

    // Separate files into images and videos
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const videoFiles = files.filter((file) => file.type.startsWith("video/"));

    // If no image or video files are selected
    if (imageFiles.length === 0 && videoFiles.length === 0) {
      alert("Please select at least one image or video file.");
      return;
    }

    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      // Upload images (if any)
      if (imageFiles.length > 0) {
        const photoFormData = new FormData();
        photoFormData.append("segmentId", segmentId); // Append segmentId for images
        imageFiles.forEach((file) => {
          photoFormData.append("photos", file); // "photos" is the key for images
        });

        const photoResponse = await axios.post("http://localhost:3000/api/v1/analyse/upload/photos", photoFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!photoResponse.data.success) {
          alert("Error uploading images. Please try again.");
          return;
        }
      }

      // Upload videos (if any)
      if (videoFiles.length > 0) {
        const videoFormData = new FormData();
        videoFormData.append("segmentId", segmentId); // Append segmentId for videos
        videoFiles.forEach((file) => {
          videoFormData.append("video", file); // "video" is the key for videos
        });

        const videoResponse = await axios.post("http://localhost:3000/api/v1/analyse/upload/video", videoFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!videoResponse.data.success) {
          alert("Error uploading videos. Please try again.");
          return;
        }
      }

      alert(`Successfully uploaded ${imageFiles.length} image(s) and ${videoFiles.length} video(s).`);
      // Optionally, clear the file list after successful upload
      setFiles([]);
    } catch (error) {
      console.error("Upload failed", error);
      alert("An error occurred while uploading the files.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">New Analysis</h1>
        {segmentId ? (
          <p className="text-lg text-gray-700 text-center mb-8">
            {/* Selected Segment ID: <span className="font-medium">{segmentId}</span> */}
          </p>
        ) : (
          <p className="text-lg text-gray-700 text-center mb-8">No Segment ID provided.</p>
        )}

        {/* Upload Tile */}
        <div className="w-full border-4 border-dashed border-gray-300 rounded-lg p-10 bg-white shadow-lg text-center">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center justify-center py-6 px-4 text-blue-500 hover:text-blue-600"
          >
            <AiOutlineUpload className="text-6xl mb-4" />
            <span className="text-lg font-medium">Click to upload files</span>
          </label>
          <p className="mt-4 text-sm text-gray-500">
            Drag and drop your files here or click the icon to select images or videos.
          </p>
          {files.length > 0 && (
            <div className="mt-6 text-left">
              <h2 className="text-lg font-medium text-gray-800">Selected Files:</h2>
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            onClick={handleUpload}
            className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg text-lg hover:bg-green-600 shadow-md"
          >
            Upload Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewAnalysis;
