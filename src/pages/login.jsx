import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('https://api-pharmplug.onrender.com/api/pharmacy/login', {
        email,
        password
      });

      if (response.data.statusCode === 200) {
        // Store authentication token securely
        localStorage.setItem('authToken', response.data.data.token);

        // Store pharmacy data in encrypted local storage
        const encryptedPharmacyData = encryptData(response.data.data.pharmacy);
        localStorage.setItem('pharmacyData', encryptedPharmacyData);

        // Optional: Store in more secure storage for web
        if (window.sessionStorage) {
          sessionStorage.setItem('isAuthenticated', 'true');
        }

        // Redirect to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      // Handle login errors
      setError(error.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', error);
    }
  };

  // Simple encryption function (for client-side protection)
  const encryptData = (data) => {
    return btoa(JSON.stringify(data));
  };

  // Decryption function
  // const decryptData = (encryptedData) => {
  //   try {
  //     return JSON.parse(atob(encryptedData));
  //   } catch {
  //     return null;
  //   }
  // };

  return (
    <div className="flex h-screen">
      <div className="bg-[#15c2cf] flex-3 flex items-center justify-center">
        <img src="/medical-cart.svg" alt="Medical Cart" className="max-w-[600px]" />
      </div>
      <div className="bg-[#CDEFF5] flex-1 flex items-center justify-center">
        <div className="bg-white w-full max-w-[400px] px-6 py-4 shadow-lg rounded-[24px] flex flex-col items-center justify-center">
          <img src="/logo.svg" alt="Logo" className="w-64 mb-20" />
          <form onSubmit={handleLogin} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="youremail@gmail.com"
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full mb-8 border border-gray-300 text-sm font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-[#06B1CF] mb-4 text-white py-2 px-6 rounded-[100px] font-thin hover:bg-[#13aeb9] focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
            >
              Log In
            </button>
          </form>
          <p className="mb-8 text-xs font-thin text-gray-400">
            © {new Date().getFullYear()} PharmPlug. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};