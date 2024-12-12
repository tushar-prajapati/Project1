import React, { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { useSegmentContext } from "../Context/SegmentContext"; // Import the context hook

const UserNewAnalysisfol = ({ setSelectedOption }) => {
  const { setSelectedSegmentId } = useSegmentContext(); // Get the setSelectedSegmentId function from context
  const [assignedSegments, setAssignedSegments] = useState([]);

  useEffect(() => {
    // Get the user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.assignedSegments) {
      setAssignedSegments(user.assignedSegments); // Set the assigned segments
    }
  }, []);

  const handleSegmentClick = (segmentId) => {
    setSelectedSegmentId(segmentId); // Store the selected segment ID in context
    setSelectedOption('uploadData'); // Set the selected option to 'uploadData'
  };

  return (
    <div>
      <h2>UserNewAnalysisfol</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {assignedSegments.map((segment) => (
          <div
            key={segment} // Use segment ID as the key
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-md cursor-pointer"
            onClick={() => handleSegmentClick(segment)} // Store selected segment on click
          >
            <div className="text-4xl text-yellow-500 mb-3">
              <FaFolder />
            </div>
            <h4 className="text-lg font-medium text-gray-800 text-center">
              {segment} {/* Display segment ID */}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNewAnalysisfol;
