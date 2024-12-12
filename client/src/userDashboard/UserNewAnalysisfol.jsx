import { useParams } from "react-router-dom";
import React from "react";
const UserNewAnalysisfol = () => {
  const { segmentId } = useParams();
  // Fetch and display details using segmentId
  return <div>UserNewAnalysisfol: {segmentId}</div>;
};

export default UserNewAnalysisfol;
