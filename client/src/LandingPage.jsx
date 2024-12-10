import React from 'react';
import Home from './components/Home';
import WhyUs from './components/WhyUs';
import Navbar from './components/NavBar';
import HowItWorks from './components/HowItWorks';
import GetConnected from './components/GetConnected';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <div className="pt-16"> {/* Add padding-top to account for fixed Navbar */}
        <Home />
        <WhyUs />
        <HowItWorks />

        {/* Centered "Get Connected" Tile */}
        <div className="mt-12 mb-12 flex justify-center">
          <GetConnected />
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default LandingPage;
