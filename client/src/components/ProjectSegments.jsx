import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSegmentContext } from "../Context/SegmentContext";

const ProjectSegments = ({ projectId , setSelectedOption}) => {
  const [segments, setSegments] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const { setSelectedSegmentId } = useSegmentContext(); // Access the context

  const fetchSegments = async () => {
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
        setSegments(response.data.data.segments);
        setProjectName(response.data.data.title);
        setThumbnail(response.data.data.thumbnail);
      } else {
        alert("Failed to fetch segments: " + response.data.message);
      }
    } catch (error) {
      console.error("Error fetching segments:", error);
      alert("An error occurred while fetching segments.");
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchSegments();
    }
  }, [projectId]);

  const handleSegmentClick = (segmentId) => {
    setSelectedSegmentId(segmentId); // Set the selected segmentId in context
    setSelectedOption('timeline')
  };

  return (
    <div className="p-6 bg-white rounded-lg w-full max-w-2xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">{projectName}</h3>
        <button
          className="text-sm text-gray-500 underline"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
      <img
        src={thumbnail}
        alt="Project Thumbnail"
        className="w-full h-48 object-cover mb-4 rounded-md shadow-sm"
      />
      <div className="space-y-4">
        {segments.map((segment) => (
          <div key={segment._id} className="p-4 bg-gray-100 rounded-md shadow-sm">
            <h4 className="text-lg font-medium text-gray-800">{segment.name}</h4>
            <p className="text-sm text-gray-600 mt-1">{segment.description}</p>
            <button
              onClick={() => handleSegmentClick(segment._id)}
              className="text-sm text-gray-500 underline mt-2"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSegments;
