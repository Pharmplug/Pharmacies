import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen">
      <div className="bg-[#15c2cf] flex-3 flex items-center justify-center">
        <img src="/medical-cart.svg" alt="Medication Image" className="max-w-[600px]" />
      </div>
      <div className="bg-[#CDEFF5] flex-1 flex items-center justify-center">
        <div className="bg-white w-full max-w-[400px] px-6 py-4 shadow-lg rounded-[24px] flex flex-col items-center justify-center">
          <img src="/logo.svg" alt="Medication Image" className="w-64  mb-20" />
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="youremail@gmail.com"
                className="w-full border border-gray-300 text-sm font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-600 font-normal mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-full mb-8 border border-gray-300 text-sm font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#06B1CF] mb-4 text-white py-2 px-6 rounded-[100px] font-thin hover:bg-[#13aeb9] focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
            >
              Log In
            </button>
          </form>
          <p className=" mb-8 text-xs font-thin text-gray-400">© {new Date().getFullYear()} PharmPlug. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};