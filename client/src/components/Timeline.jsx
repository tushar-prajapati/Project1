import React, { useEffect, useState } from "react";
import { useSegmentContext } from "../Context/SegmentContext";
import axios from "axios";
import Cookies from "js-cookie";

const TimelinePage = ({ setSelectedOption }) => {
  const { selectedSegmentId, setAnalysisData } = useSegmentContext();
  const [segmentData, setSegmentData] = useState([]);
  const [loading, setLoading] = useState(true);

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


  const handleAnalyzeClick = async () => {
    if (!selectedSegmentId) {
      alert("No segment selected.");
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        alert("You are not authenticated. Please log in.");
        return;
      }
      const response = await axios.post(
        `http://localhost:3000/api/v1/analyse/runAnalysis/${selectedSegmentId}`,
        { segmentId: selectedSegmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAnalysisData(response.data.data); 
        setSelectedOption('AnalyzeData')
      } else {
        alert("Analysis failed.");
      }
    } catch (error) {
      console.error("Error running analysis:", error);
      alert("An error occurred during the analysis.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                <p className="text-sm text-gray-500 mt-2">
                  Created at: {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <button
        onClick={handleAnalyzeClick}
        disabled={loading}

        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

export default TimelinePage;
