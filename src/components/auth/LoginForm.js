import React, { useState } from 'react';
import { login } from '../../Api';
import { Link } from 'react-router-dom';
import useToaster from '../utils/useToaster';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { showToast, ToastComponent } = useToaster();
  const [error, setError] = useState({ email: false, password: false });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    if (formData.email === '') {
      setError({ ...error, email: true });
      valid = false;
    }
    if (formData.password === '') {
      setError({ ...error, password: true });
      valid = false;
    }
    return valid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const user = await login(formData);
        showToast(user.message, 'success');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error logging in:', error);
        showToast(error.response.data.errors, 'error');
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {ToastComponent}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}
            required
          />
          {error.email && <p className="text-red-500 text-xs italic">Email is required.</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="**********" name="password" value={formData.password} onChange={handleChange}
            required
          />
          {error.password && <p className="text-red-500 text-xs italic">Password is required.</p>}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
        </div>
        <div className="text-center mt-4">
          <p>don't have an account? <Link to="/sign_up" className="text-blue-500">Sign up</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
