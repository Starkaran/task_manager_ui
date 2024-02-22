import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../Api';
import { Link } from 'react-router-dom';
import useToaster from '../utils/useToaster';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const { showToast, ToastComponent } = useToaster();
  const [error, setError] = useState({name: false, email: false, password: false, password_confirmation: false});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let valid = true;
    if (formData.name === '') {
      setError({ ...error, name: true });
      valid = false;
    }
    if (formData.email === '') {
      setError({ ...error, email: true });
      valid = false;
    }
    if (formData.password === '') {
      setError({ ...error, password: true });
      valid = false;
    }
    if (formData.name.match(/^[A-Za-z ]+$/) === null) {
      setError({ ...error, name: true });
      valid = false;
    }
    if (formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) === null) {
      setError({ ...error, email: true });
      valid = false;
    }
    if (formData.password !== formData.password_confirmation) {
      setError({ ...error, password_confirmation: true });
      valid = false;
    }
    return valid;
  }

  const handleSubmit = async (e) => {
    if (validateForm()) {
        e.preventDefault();
      try {
        const newUser = await createUser({user: formData});
        showToast('Signned up successfully.', 'success');
        console.log('User logged in:', newUser);
        navigate('/login');
      } catch (error) {
        console.error('Error creating user:', error);
        showToast(error.response.data.errors, 'error');
      }
   }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      {ToastComponent}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name" type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange}
            required 
            pattern="[A-Za-z ]+" 
          />
          { error.name && <p className="text-red-500 text-xs italic">Name is required and must contain letters only.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
          />
          {error.email && <p className="text-red-500 text-xs italic">Email is required and must be in a valid format.</p>}
        </div>
        <div className="mb-4">
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
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password_confirmation">
            Password Confirmation
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password_confirmation" type="password" placeholder="**********" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange}
            required 
          />
          {error.password_confirmation && <p className="text-red-500 text-xs italic">Password Confirmation is required.</p>}
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-4">
          <p>Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

