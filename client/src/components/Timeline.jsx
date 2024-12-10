import React, { useEffect, useState } from "react";
import { useSegmentContext } from "../Context/SegmentContext";
import axios from "axios";
import Cookies from "js-cookie";

const TimelinePage = () => {
  const { selectedSegmentId } = useSegmentContext(); // Access the context value
  const [segmentData, setSegmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch segment data
  useEffect(() => {
    if (selectedSegmentId) {
      fetchSegmentData(selectedSegmentId);
    }
  }, [selectedSegmentId]);

  const fetchSegmentData = async (id) => {
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }
      const response = await axios.get(
        `http://localhost:3000/api/v1/analyse/timeline/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        // Filter the data based on the segment ID
        const filteredData = response.data.data.filter(
          (item) => item.segment === id
        );
        setSegmentData(filteredData);
      } else {
        alert("Failed to fetch timeline data.");
      }
    } catch (error) {
      console.error("Error fetching segment data:", error);
      alert("An error occurred while fetching timeline data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Map through the segment data and images
  const imageWithDate = segmentData.flatMap((item) =>
    item.images.map((image, index) => ({
      image,
      createdAt: item.createdAt,
    }))
  );

  return (
    <div>
      <h1>Timeline Page</h1>
      {imageWithDate.length === 0 ? (
        <p>No data available for the selected segment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {imageWithDate.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="relative overflow-hidden rounded-md mb-2">
                <img
                  src={item.image}
                  alt={`Segment Image ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                {/* Display the created date below each image */}
                <p className="text-sm text-gray-500 mt-2">
                  Created at: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelinePage;
