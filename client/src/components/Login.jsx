import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ openSignup, onLoginSuccess }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onLoginSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/login", data);

      if (response.data.success) {
        const { accessToken, refreshToken, user } = response.data.data;
        console.log(user,'user')

        // Store tokens and user data
        Cookies.set("accessToken", accessToken, { expires: 1 }); // Store access token
        Cookies.set("refreshToken", refreshToken, { expires: 10 }); // Store refresh token
        Cookies.set("user", JSON.stringify(user)); // Store user info
        localStorage.setItem("user", JSON.stringify(user));


        // Notify parent about login success
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }

        alert(response.data.message);

        // Redirect to dashboard or any other page
        navigate("/dashboard");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            {...register("email", { required: "Email is required" })}
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
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium text-lg py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        {/* Redirect to Sign Up */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <button
            onClick={openSignup}
            className="text-blue-500 font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
