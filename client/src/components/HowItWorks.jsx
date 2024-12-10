import React from 'react';
import roadImage from '../assets/road.png'; // Vector image of the curved road

const HowItWorks = () => {
  return (
    <div className="relative min-h-screen bg-gray-500 overflow-hidden">
      {/* Headings Section */}
      <div className="container mx-auto ">
        <h2 className="text-3xl font-bold text-center  text-white">How It Works</h2>

        {/* Centered and Responsive Headings */}
        <div className="text-center ">
          <p className="block text-white px-4 text-lg mb-2">
            This streamlined tech-powered process helps ensure your road construction projects are
          </p>
          <p className="block text-white px-4 text-lg">
            managed efficiently, with minimal manual intervention.
          </p>
        </div>
      </div>

      {/* Vector Curved Road */}
      <div className="relative z-10">
        <img
          src={roadImage}
          alt="Curved Road"
          className="w-3/4 mx-auto h-3/4"
        />
      </div>

      {/* Floating Boxes */}
      {/* <div className="relative flex justify-center items-center mt-6 space-x-12">
        <div className="absolute left-0 top-1/4 transform -translate-y-1/4 w-40 p-4 bg-white rounded-md shadow-md z-10">
          <p className="text-gray-700 text-center">Description for Box 1</p>
        </div>

        <div className="absolute right-0 top-1/4 transform -translate-y-1/4 w-40 p-4 bg-white rounded-md shadow-md z-10">
          <p className="text-gray-700 text-center">Description for Box 2</p>
        </div>
      </div> */}
    </div>
  );
};

export default HowItWorks;
