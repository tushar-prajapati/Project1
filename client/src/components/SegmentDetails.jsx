import { useParams } from "react-router-dom";

const SegmentDetails = () => {
  const { segmentId } = useParams();
  // Fetch and display details using segmentId
  return <div>Details for Segment ID: {segmentId}</div>;
};

export default SegmentDetails;
