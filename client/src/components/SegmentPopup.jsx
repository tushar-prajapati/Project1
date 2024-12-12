import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const SegmentPopup = ({ isOpen, onClose, segmentData, onSubmit,setSelectedOption }) => {
  const [formData, setFormData] = useState({
    length: "",
    startLatitude: "",
    startLongitude: "",
    endLatitude: "",
    endLongitude: "",
    userId: "",
  });
  const [employeeIds, setEmployeeIds] = useState([]); // State to store employee IDs

  useEffect(() => {
    // Reset formData when the popup is opened
    if (isOpen) {
      setFormData({
        length:  "",
        startLatitude:  "",
        startLongitude:  "",
        endLatitude:  "",
        endLongitude:  "",
        userId: "",
      });
    }
  }, [isOpen, segmentData]); // Trigger when isOpen or segmentData changes

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

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }

      // Send data to the API, segmentId is sent separately
      const payload = {
        ...formData, // Include the form data
        segmentId: segmentData.segmentId, // Send segmentId separately
      };

      const response = await axios.post(
        "http://localhost:3000/api/v1/segments/setSegmentInfo",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Optionally handle response after successful submission
        alert("Segment information updated successfully.");
        onSubmit(formData); // Notify the parent component about the successful submission
        onClose(); // Close the popup after submission
        setSelectedOption('timeline')
      } else {
        alert("Failed to update segment information: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting segment data:", error);
      alert("An error occurred while submitting the data.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg ">
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

            // Render input fields for other keys, excluding segmentId
            if (field !== "segmentId") {
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
            }

            return null;
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
