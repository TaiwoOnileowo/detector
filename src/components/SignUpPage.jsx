import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../Context/StateContext";
import logo from "../assets/logo.svg";

function SignupPage() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUserInfo} =
    useStateContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const raw = JSON.stringify({ email, password });
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
    };

    try {
      const response = await fetch(
        " https://pv-detection-be-f4e629996651.herokuapp.com/api/v1/auth/signup",
        requestOptions
      );
      const result = await response.json();
      if (response.ok && result.status === "success") {
        navigate("/sign-in-success", {
          state: {
            user: result.data.user,
            accessToken: result.data.accessToken,
          },
        });
        setUserInfo({
          userId: result.data.user.id,
          accessToken: result.data.accessToken,
          
        });
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            userId: result.data.user.id,
            accessToken: result.data.accessToken,
           
          })
        );
      } else {
        alert(
          `Signup failed: ${result.message || "An unknown error occurred"}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="bg-white p-6 pt-2 my-2 h-full rounded-lg shadow-lg w-full max-w-lg">
        <img
          src={logo}
          alt="Solar Guard Logo"
          className="w-20 h-14 object-contain mx-auto"
        />
        <h2 className="text-2xl font-bold mb-3 text-center text-blue-700">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
          <div className="text-sm text-center">
            <p>
              Already have an account?{" "}
              <a href="/login" className="text-blue-600 hover:text-blue-500">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
