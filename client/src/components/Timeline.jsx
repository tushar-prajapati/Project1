import React, { useEffect, useState } from "react";
import { useSegmentContext } from "../Context/SegmentContext";

const TimelinePage = () => {
  const { selectedSegmentId } = useSegmentContext(); // Access the context value

  const [segmentData, setSegmentData] = useState(null);

  useEffect(() => {
    if (selectedSegmentId) {
      // Fetch segment data based on selectedSegmentId
      fetchSegmentData(selectedSegmentId);
    }
  }, [selectedSegmentId]);

  const fetchSegmentData = async (id) => {
    console.log("Fetching data for segment:", id);
    // Perform your data fetching logic here
    // setSegmentData(responseData);
  };

  return (
    <div>
      <h1>Timeline Page</h1>
      {selectedSegmentId ? (
        <div>Details for Segment ID: {selectedSegmentId}</div>
      ) : (
        <div>No segment selected</div>
      )}
    </div>
  );
};

export default TimelinePage;
