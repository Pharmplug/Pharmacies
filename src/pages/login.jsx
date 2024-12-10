import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { storeAuthToken, storeData } from '../utils/storage';
import { delay } from '../utils/utils';
import { baseurl } from '../config/config';




export const Login = () => {
  console.log(baseurl)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  // Validation schema
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required')
  });


  const handleLogin = async (values) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseurl}/api/pharmacy/login`, values, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Source': 'web-login'
        }
      });

      if (response.data.statusCode === 200) {

        storeAuthToken(response.data.data.token);

        storeData(JSON.stringify(response.data.data.pharmacy));
        setShowSuccessAlert(true)
        await delay(2000); // Wait for 2 seconds before continuing
        navigate('/dashboard');

      }
    } catch (error) {
      // Centralized error handling
      const errorMessage = error.response?.data?.message || 'Login failed';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#15c2cf] to-[#06B1CF]">
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src="/medical-cart.svg"
          alt="PharmPlug Dashboard"
          className="max-w-md animate-pulse"
        />
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
          {showSuccessAlert && (
            <div className="fixed top-4 right-4 w-96 bg-green-100 border border-green-200 rounded-lg p-4 z-50">
              <p className="text-green-800">
                Login successfully! Welcome.
              </p>
            </div>
          )}
          <div className="text-center mb-8">
            <img
              src="/logo.svg"
              alt="PharmPlug Logo"
              className="mx-auto mb-4 w-48"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome Back
            </h2>
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div className='flex flex-col space-y-2'>
                  <div className="flex items-center border rounded-lg ">
                    <Mail className=" text-gray-300 w-8 ml-2" />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={`w-full bg-white pl-1 pr-4 py-3 font-thin focus:bg-white focus:outline-none 
                      ${errors.email && touched.email
                          ? 'border-red-500'
                          : 'border-gray-300'}`}
                      prefix={<Mail className="text-gray-400" />}
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-[10px] font-normal"
                  />
                </div>
                <div className='flex flex-col space-y-2'>
                  <div className="flex items-center border rounded-lg ">
                    <Lock className="ml-2 mr2 text-gray-400 w-5" />
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className={`w-full pl-2 pr-1 py-3 font-thin focus:outline-none 
                      ${errors.password && touched.password
                          ? 'border-red-500'
                          : 'border-gray-300'}`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="mr-2"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>

                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-900 text-sm font-thin"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#06B1CF] text-white py-3 rounded-lg 
                    hover:bg-[#15c2cf] transition-colors 
                    disabled:opacity-50 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging In...
                    </div>
                  ) : (
                    'Log In'
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} PharmPlug. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  );
};