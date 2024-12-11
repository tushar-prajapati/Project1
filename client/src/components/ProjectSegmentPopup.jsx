import React from "react";
import ProjectSegments from "./ProjectSegments";

const ProjectSegmentPopup = ({ isOpen, onClose, projectId,selectedOption,setSelectedOption }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center   justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full  p-6 max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          className="text-gray-500 float-right text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <ProjectSegments projectId={projectId}         selectedOption={selectedOption} 
         setSelectedOption={setSelectedOption} />
      </div>
    </div>
  );
};

export default ProjectSegmentPopup;
