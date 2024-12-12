import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSegmentContext } from "../Context/SegmentContext";
import { FaFolder } from "react-icons/fa";
import ProjectImg from "../assets/projectimg.jpg";
import SegmentPopup from "./SegmentPopup";

const ProjectSegments = ({ projectId, setSelectedOption }) => {
  const [segments, setSegments] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const { setSelectedSegmentId } = useSegmentContext(); // Getting setSelectedSegmentId from context
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
        setThumbnail(response.data.data.thumbnail || "");
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

  const handleSegmentClick = (segment) => {
    setSelectedSegment({
      segmentId: segment._id,
      length: '',
      startLatitude: '',
      startLongitude: '',
      endLatitude: '',
      endLongitude: '',
      userId: "",
    });
    setIsPopupOpen(true);
  };

  const handleTileClick = (segmentId) => {
    // Set the selected segmentId in the context
    setSelectedSegmentId(segmentId); // Set the selectedSegmentId globally in the context
    setSelectedOption('timeline');
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handlePopupSubmit = (data) => {
    console.log("Submitted Data:", data);
    // You can send this data to an API or process it as needed
  };

  return (
    <div className="p-6 bg-white rounded-lg w-full max-w-3xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{projectName}</h3>
      </div>
      <img
        src={thumbnail || ProjectImg}
        alt="Project Thumbnail"
        className="w-full h-48 object-cover mb-6 rounded-md shadow-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {segments.map((segment) => (
          <div
            key={segment._id}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-md cursor-pointer relative"
            onClick={() => handleTileClick(segment._id)} // Navigate and set segment ID in context
          >
            <div className="text-4xl text-yellow-500 mb-3">
              <FaFolder />
            </div>
            <h4 className="text-lg font-medium text-gray-800 text-center">
              {segment.name}
            </h4>
            <p className="text-sm text-gray-600 text-center mt-2">{segment.description}</p>
            {/* Add Info button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigating when clicking the button
                handleSegmentClick(segment);
              }}
              className="absolute top-2 right-2 px-1 py-0.5 bg-blue-500 text-white rounded-md"
            >
              +
            </button>
          </div>
        ))}
      </div>
      <SegmentPopup
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        segmentData={selectedSegment || {}}
        onSubmit={handlePopupSubmit}
        projectId={projectId}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
};

export default ProjectSegments;
