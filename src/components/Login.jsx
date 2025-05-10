import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error
  const [error, setError] = useState('');

  // React Router hook to navigate after login
  const navigate = useNavigate();

  // Toast notification function
  const notifyerror = (message) => toast.error(message);
  const notifysuccess = (message) => toast.success(message);


  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from refreshing the page

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      notify('Please enter both email and password.');
      return;
    }

    try {
      // POST request to API
      notifysuccess('Login successful!');
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password
      }, {
        headers: {
          'x-api-key': 'reqres-free-v1'  // Include your API key here
        }
      });   

      // Save token to localStorage
      localStorage.setItem('token', response.data.token);

      // Clear error if any
      setError('');

      // Redirect to Users List page
      navigate('/users');

    } catch (err) {
      // Handle API errors
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
        notifyerror(err.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
        notify('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eve.holt@reqres.in"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="cityslicka"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>
      
      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Login;
