import React, { createContext, useState, useContext } from "react";

// Create the context
const SegmentContext = createContext();

// Create a provider component
export const SegmentProvider = ({ children }) => {
  const [selectedSegmentId, setSelectedSegmentId] = useState(null);

  return (
    <SegmentContext.Provider value={{ selectedSegmentId, setSelectedSegmentId }}>
      {children}
    </SegmentContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSegmentContext = () => {
  return useContext(SegmentContext);
};
