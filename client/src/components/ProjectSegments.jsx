import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const ProjectSegments = ({ projectId }) => {
  const [segments, setSegments] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [selectedSegmentId, setSelectedSegmentId] = useState(null);
  const [selectedSegmentData, setSelectedSegmentData] = useState(null);

  const fetchSegments = async () => {
    try {
      const token = Cookies.get("accessToken");
        console.log("projectsegments")
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/v1/projects/singleProject/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data.segments)
      if (response.data.success) {
        setSegments(response.data.data.segments); // Assuming the response has a 'segments' array
        setProjectName(response.data.data.title); // Set the project name
        setThumbnail(response.data.data.thumbnail); // Set the project thumbnail URL
      } else {
        alert("Failed to fetch segments: " + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching segments:", error);
      alert("An error occurred while fetching segments.");
    }
  };
    // console.log(segments)
  const fetchSegmentData = async (segmentId) => {
    try {
      const token = Cookies.get("accessToken");

      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      const response = await axios.get(`http://localhost:3000/api/v1/analyse/timeline/${segmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log(response)
      if (response.data.success) {
        setSelectedSegmentData(response.data.data);
      } else {
        alert("Failed to fetch timeline: " + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching timeline:", error);
      alert("An error occurred while fetching timeline data.");
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchSegments();
    }
  }, [projectId]);

  useEffect(() => {
    if (selectedSegmentId) {
      fetchSegmentData(selectedSegmentId);
    }
  }, [selectedSegmentId]);

  const handleSegmentClick = (segmentId) => {
    setSelectedSegmentId(segmentId); // Capture the selected segment ID
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{projectName}</h3>
        <button
          className="text-sm text-gray-500 underline"
          onClick={() => window.history.back()}>Back</button>
      </div>
      <img src={thumbnail} alt="Project Thumbnail" className="w-full h-48 object-cover mb-4 rounded-md shadow-sm" />
      <div className="space-y-4">
        {selectedSegmentId ? (
          selectedSegmentData ? (
            selectedSegmentData.images.map((image, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <img src={image} alt={`Timeline Image ${index + 1}`} className="w-full h-48 object-cover mb-2 rounded-md shadow-sm" />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">Loading timeline...</div>
          )
        ) : (
          segments.map((segment) => (
            <div key={segment._id} className="p-4 bg-gray-100 rounded-md shadow-sm">
              <h4 className="text-lg font-medium text-gray-800">{segment.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{segment.description}</p>
              <button onClick={() => handleSegmentClick(segment._id)} className="text-sm text-gray-500 underline mt-2">View Details</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectSegments;
