import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupForm from './components/auth/SignupForm';
import LoginForm from './components/auth/LoginForm';
import Dashboard from './components/task/Dashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign_up" element={<SignupForm />} />
        <Route path="/" element={<Navigate replace to="/sign_up" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
