import React from "react";
import { useSegmentContext } from "../Context/SegmentContext";

const AnalyzeData = () => {
  const { analysisData } = useSegmentContext();

  if (!analysisData) {
    return <div>No analysis data available.</div>;
  }

  return (
    <div>
      <h1>Analyze Data</h1>
      <pre>{JSON.stringify(analysisData, null, 2)}</pre> {/* Display data */}
    </div>
  );
};

export default AnalyzeData;
