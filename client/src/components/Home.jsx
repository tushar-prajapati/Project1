import React from 'react';
import backgroundImage from '../assets/back.png';

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center px-4">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Revolutionizing Road Construction Monitoring with Aerial Insights
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-200 text-center max-w-3xl">
          Track real-time progress, analyze drone-captured data, and generate detailed reports for your road construction projects.
        </p>
      </div>
    </div>
  );
};

export default Home;
