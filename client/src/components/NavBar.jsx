import React, { useState } from "react";
import Modal from "react-modal";
import Login from "./Login";
import SignUp from "./SignUp";


// Set the app element for accessibility
Modal.setAppElement("#root");

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  const onLoginSubmit = (data) => {
    console.log("Login Data:", data);
    closeLogin();
  };

  const onSignupSubmit = (data) => {
    console.log("Signup Data:", data);
    closeSignup();
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-gray-800 text-white px-6 py-4 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">SadakNirikshak</div>
          <ul className="hidden md:flex space-x-8 text-sm font-medium">
            <li><a href="#home" className="hover:text-gray-400">Home</a></li>
            <li><a href="#solutions" className="hover:text-gray-400">Solutions</a></li>
            <li><a href="#services" className="hover:text-gray-400">Services</a></li>
            <li><a href="#whyus" className="hover:text-gray-400">Why Us</a></li>
            <li><a href="#contactus" className="hover:text-gray-400">Contact Us</a></li>
          </ul>
          <div className="flex space-x-4">
            <button onClick={openLogin} className="text-sm bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg">Login</button>
            <button onClick={openSignup} className="text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onRequestClose={closeLogin} // Close on Esc or click outside
        className="modal"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true} // Enable closing on overlay click
      >
        <Login onLoginSubmit={onLoginSubmit} openSignup={openSignup} />
      </Modal>

      {/* Signup Modal */}
      <Modal
        isOpen={isSignupOpen}
        onRequestClose={closeSignup} // Close on Esc or click outside
        className="modal"
        overlayClassName="modal-overlay"
        shouldCloseOnOverlayClick={true} // Enable closing on overlay click
      >
        <SignUp onSignupSubmit={onSignupSubmit} openLogin={openLogin} />
      </Modal>
    </>
  );
};

export default Navbar;
