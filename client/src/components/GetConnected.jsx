import React from 'react';
import AnyQue from '../assets/AnyQue.png'; // Replace with your image path

const GetConnected = () => {
  return (
    <div className="bg-gray-300 rounded-lg  shadow-lg w-5/6 ">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold ml-10 mb-4 text-gray-800">
            Got Any Questions? <br />
            We've Got the Answers.
          </h2>
          <button className="bg-blue-600 ml-10 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Get Connected
          </button>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={AnyQue}
            alt="Support"
            className="max-w-full h-auto "
          />
        </div>
      </div>
    </div>
  );
};

export default GetConnected;
