import React from "react";

const Sidebar = ({ isMinimized, setIsMinimized, selectedOption, setSelectedOption }) => {
  return (
    <div
      className={`h-screen  bg-gray-900 text-white flex-shrink-0 transition-all duration-300 ${
        isMinimized ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        {!isMinimized && <span className="font-bold text-lg">Menu</span>}
        <button
          className="text-white hover:bg-gray-700 p-2 rounded-md"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? "➕" : "➖"}
        </button>
      </div>

      <div className="p-4 space-y-2">
        <div
          className={`p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
            selectedOption === "recent" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedOption("recent")}
        >
          {!isMinimized && "Recent Projects"}
          {isMinimized && "📁"}
        </div>
        
        <div
          className={`p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
            selectedOption === "projects" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedOption("projects")}
        >
          {!isMinimized && "Projects"}
          {isMinimized && "📂"}
        </div>
        <div
          className={`p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
            selectedOption === "timeline" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedOption("timeline")}
        >
          {!isMinimized && "Timeline"}
          {isMinimized && "🕒"}
        </div>
        <div
          className={`p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
            selectedOption === "newAnalysis" ? "bg-gray-700" : ""
          }`}
          onClick={() => setSelectedOption("newAnalysis")}
        >
          {!isMinimized && "NewAnalysis"}
          {isMinimized && "🕒"}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
