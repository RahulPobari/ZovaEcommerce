import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const navigate = useNavigate(); 
  const { token, setToken, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const payload = currentState === 'Sign Up' ? { name, email, password } : { email, password };
      const url = backendUrl + (currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login');

      const response = await axios.post(url, payload);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(`${currentState === 'Login' ? 'Logged in' : 'Account created'} successfully!`);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        toast.error(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-white px-4 font-mono mt-[-70px]">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-xl p-8 border border-gray-300 shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative overflow-hidden"
      >
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-xl pointer-events-none border-[2px] border-transparent animate-[pulseBorder_4s_infinite] z-[-1]" />

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800 tracking-widest uppercase">{currentState}</h2>
          <p className="text-xs text-gray-500 mt-2 tracking-wider">
            {currentState === 'Login' ? 'Access the mainframe 🔐' : 'Initiate protocol 🚀'}
          </p>
        </div>

        {/* Name field */}
        {currentState !== 'Login' && (
          <input 
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="tech-input"
            type="text"
            placeholder="Full Name"
            required
          />
        )}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          className="tech-input"
          type="email"
          placeholder="Email ID"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="tech-input"
          type="password"
          placeholder="Password"
          required
        />

        {/* Links */}
        <div className="flex justify-between text-xs text-gray-600 mt-2 mb-5 font-light">
          <span className="hover:underline cursor-pointer">Forgot Code?</span>
          <span
            className="hover:underline cursor-pointer"
            onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
          >
            {currentState === 'Login' ? 'Create Account' : 'Login Instead'}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold tracking-widest uppercase ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-xl'
          }`}
        >
          {loading ? 'Processing...' : currentState === 'Login' ? 'Sign In' : 'Launch'}
        </button>
      </form>

      {/* Custom Styles */}
      <style>
        {`
          .tech-input {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            background: #f9f9f9;
            border-radius: 8px;
            font-size: 0.9rem;
            color: #111;
            transition: all 0.3s ease;
          }
          .tech-input:focus {
            border-color: #7c3aed;
            box-shadow: 0 0 8px #7c3aed77;
            outline: none;
            background: #fff;
          }

          @keyframes pulseBorder {
            0%, 100% {
              box-shadow: 0 0 0px #7c3aed;
            }
            50% {
              box-shadow: 0 0 12px #7c3aed88;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
