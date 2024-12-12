import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFolder } from "react-icons/fa";

const UserNewAnalysisfol = () => {
  const { segmentId } = useParams();
  const [assignedSegments, setAssignedSegments] = useState([]);

  useEffect(() => {
    // Get the user object from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user && user.assignedSegments) {
      setAssignedSegments(user.assignedSegments);
    }
  }, []);

  return (
    <div>
      <h2>UserNewAnalysisfol: {segmentId}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {assignedSegments.map((segment) => (
          <div
            key={segment}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow hover:shadow-md cursor-pointer"
          >
            <div className="text-4xl text-yellow-500 mb-3">
              <FaFolder />
            </div>
            <h4 className="text-lg font-medium text-gray-800 text-center">
              {segment} {/* Show the segment ID */}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNewAnalysisfol;
