import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        navigate('/add'); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="relative bg-white w-full max-w-sm sm:max-w-md rounded-2xl p-6 sm:p-10 shadow-[0_0_60px_#f472b650] border border-gray-200 overflow-hidden group transition-all duration-300">

        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 blur-2xl opacity-30 group-hover:opacity-50 transition duration-500"></div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-600 animate-text-pop mb-6 text-center">
          Admin Login 🚨
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-5 sm:space-y-6">
          <div className="w-full">
            <label className="text-sm text-gray-700 font-medium mb-1 block">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
              required
            />
          </div>

          <div className="w-full">
            <label className="text-sm text-gray-700 font-medium mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm sm:text-base bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-bold rounded-full hover:scale-105 hover:shadow-[0_0_30px_#f472b6aa] transition-all duration-300 active:scale-95"
          >
            🔓 Let Me In
          </button>
        </form>

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default Login;
