import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios for making API requests
import { useNavigate } from "react-router-dom"; // Use useNavigate for navigation

const SignUp = ({ openLogin }) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const navigate = useNavigate(); // useNavigate hook for navigation

  const onSignupSubmit = async (data) => {
    try {
      // API request to register the user
      const response = await axios.post("http://localhost:3000/api/v1/users/register", {
        fullName: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
      });

      // If registration is successful, redirect to login page
      if (response.status === 201) {
        alert("Registration successful! Please login.");
        openLogin(); // Open the login form
        navigate("/login"); // Navigate to the login page after successful registration
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Create an Account</h2>
      <form onSubmit={handleSubmit(onSignupSubmit)} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        </div>

        {/* Username Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email format" } })}
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })}
            type="password"
            placeholder="Create a password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>

        {/* Confirm Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === getValues("password") || "Passwords do not match",
            })}
            type="password"
            placeholder="Confirm your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && <span className="text-red-500 text-xs">{errors.confirmPassword.message}</span>}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register("agree", { required: "You must agree to the terms" })}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="ml-2 text-sm text-gray-600">
            I agree to the{" "}
            <a href="#terms" className="text-blue-500 hover:underline">
              terms and privacy policy
            </a>
          </label>
          {errors.agree && <span className="text-red-500 text-xs">{errors.agree.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium text-lg py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Create Account
        </button>

        {/* Redirect to Login */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <button
            onClick={openLogin}
            className="text-blue-500 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
