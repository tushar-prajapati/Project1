import React, { useState } from "react";
import { useSegmentContext } from "../Context/SegmentContext";
import { AiOutlineUpload } from "react-icons/ai"; // Import upload icon
import axios from "axios"; // Import axios
import Cookies from "js-cookie";

const NewAnalysis = () => {
  const { selectedSegmentId } = useSegmentContext();
  const segmentId = selectedSegmentId; // Get the segmentId
  const [files, setFiles] = useState([]);
  const [responseData, setResponseData] = useState(null); // Store the response data
  const [isLoading, setIsLoading] = useState(false); // Loader state

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

      let photoResponse, videoResponse;

      // Upload images (if any)
      if (imageFiles.length > 0) {
        const photoFormData = new FormData();
        photoFormData.append("segmentId", segmentId);
        imageFiles.forEach((file) => {
          photoFormData.append("photos", file);
        });

        photoResponse = await axios.post("http://localhost:3000/api/v1/analyse/upload/photos", photoFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Upload videos (if any)
      if (videoFiles.length > 0) {
        const videoFormData = new FormData();
        videoFormData.append("segmentId", segmentId);
        videoFiles.forEach((file) => {
          videoFormData.append("video", file);
        });

        videoResponse = await axios.post("http://localhost:3000/api/v1/analyse/upload/video", videoFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      if (photoResponse?.data.success || videoResponse?.data.success) {
        const combinedData = {
          images: photoResponse?.data.message?.analysis?.images || [],
          videoFrames: videoResponse?.data.message?.analysis?.videoFrames || [],
        };
        setResponseData(combinedData);
        setFiles([]);
      }

      alert("Successfully uploaded files.");
    } catch (error) {
      console.error("Upload failed", error);
      alert("An error occurred while uploading the files.");
    }
  };

  const handleAnalyze = async () => {
    setIsLoading(true); // Start loading
    try {
      // Simulate a delay for analysis (replace this with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 100000));
      alert("Analysis complete!");
    } catch (error) {
      console.error("Analysis failed", error);
      alert("An error occurred during analysis.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-4xl">
        {segmentId ? (
          <p className="text-lg text-gray-700 text-center mb-8">
            {/* Selected Segment ID: <span className="font-medium">{segmentId}</span> */}
          </p>
        ) : (
          <p className="text-lg text-gray-700 text-center mb-8">No Segment ID provided.</p>
        )}

        {!responseData ? (
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
        ) : (
          <div className="w-full flex flex-wrap justify-center mt-6">
            {responseData.images.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4">
                {responseData.images.map((image, index) => (
                  <div key={index} className="w-64 h-64 overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={image}
                      alt={`Uploaded image ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {responseData.videoFrames.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {responseData.videoFrames.map((frame, index) => (
                  <div key={index} className="w-64 h-64 overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={frame}
                      alt={`Video frame ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="w-full flex justify-center mt-6">
              <button
                onClick={handleAnalyze}
                className={`px-6 py-3 ${
                  isLoading ? "bg-gray-400" : "bg-blue-500"
                } text-white rounded-lg text-lg ${
                  isLoading ? "" : "hover:bg-blue-600"
                } shadow-md`}
                disabled={isLoading} // Disable button during loading
              >
                {isLoading ? "Analyzing..." : "Analyze"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAnalysis;
