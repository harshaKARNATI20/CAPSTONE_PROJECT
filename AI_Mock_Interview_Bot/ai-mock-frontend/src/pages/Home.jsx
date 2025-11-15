import React from 'react';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function Home() {
  const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Cover Image */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white justify-center items-center">
        <div className="max-w-md text-center px-4">
          <h1 className="text-4xl font-bold mb-4">AI Mock Interview Bot</h1>
          <p className="text-lg mb-6">
            Prepare for your dream job interviews with personalized AI feedback and analytics.
          </p>
          <img
            src="https://illustrations.popsy.co/white/job-interview.svg"
            alt="Interview Illustration"
            className="w-80 mx-auto"
          />
        </div>
      </div>

      {/* Right Side - Login */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-8">
        <div className="max-w-sm w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome Back 👋</h2>

          <button
            onClick={() => (window.location.href = `${API}/auth/google`)}
            className="w-full mb-4 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition"
          >
            <FaGoogle size={18} /> Sign in with Google
          </button>

          <button
            onClick={() => (window.location.href = `${API}/auth/github`)}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-900 transition"
          >
            <FaGithub size={18} /> Sign in with GitHub
          </button>

          <p className="text-sm text-gray-500 text-center mt-6">
            Secure OAuth Login — No passwords stored.
          </p>
        </div>
      </div>
    </div>
  );
}
