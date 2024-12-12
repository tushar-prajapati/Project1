import React, { useState } from "react";


const SegmentPopup = ({ isOpen, onClose, segmentData, onSubmit,projectId }) => {
    console.log(segmentData,'segmentData')
    console.log(projectId,'projectId')
  const [formData, setFormData] = useState({
    // segmentId: segmentData.segmentId || "",
    length: segmentData.length || "",
    startLatitude: segmentData.startLatitude || "",
    startLongitude: segmentData.startLongitude || "",
    endLatitude: segmentData.endLatitude || "",
    endLongitude: segmentData.endLongitude || "",
    userId: segmentData.userId || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose(); // Close the popup after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Segment Details</h2>
        <div
          className="overflow-y-auto max-h-80" // Added scrollable container with a fixed height
        >
            {segmentData.segmentId}
          {Object.keys(formData).map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SegmentPopup;
