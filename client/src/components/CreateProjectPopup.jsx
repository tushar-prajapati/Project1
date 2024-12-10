import React from "react";
import CreateProject from "./CreateProject";

const CreateProjectPopup = ({ isOpen, onClose, onProjectCreated }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button
          className="text-gray-500 float-right text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Create a New Project</h2>
        <CreateProject onProjectCreated={onProjectCreated} />
      </div>
    </div>
  );
};

export default CreateProjectPopup;
