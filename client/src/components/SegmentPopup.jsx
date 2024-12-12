import React, { useState, useEffect } from "react";

const SegmentPopup = ({ isOpen, onClose, segmentData, onSubmit }) => {
  const [formData, setFormData] = useState({
    length: segmentData.length || "",
    startLatitude: segmentData.startLatitude || "",
    startLongitude: segmentData.startLongitude || "",
    endLatitude: segmentData.endLatitude || "",
    endLongitude: segmentData.endLongitude || "",
    userId: segmentData.userId || "",
  });
  const [employeeIds, setEmployeeIds] = useState([]); // State to store employee IDs

  useEffect(() => {
    // Get employee IDs from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && Array.isArray(user.employees)) {
      setEmployeeIds(user.employees);
    }
  }, []);

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
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Segment ID: {segmentData.segmentId}</h2>
        <div className="overflow-y-auto max-h-80">
          {Object.keys(formData).map((field) => {
            if (field === "userId") {
              // Render a dropdown for userId
              return (
                <div key={field} className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <select
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">Select User ID</option>
                    {employeeIds.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            // Render input fields for other keys
            return (
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
            );
          })}
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
