import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleLoginChange = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = e => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginForm);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', registerForm);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="grid gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleLoginChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleLoginChange}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>

      <div className="p-6 border rounded shadow bg-white">
        <h2 className="text-xl font-bold mb-4">Create Account</h2>
        <form onSubmit={handleRegister} className="grid gap-4">
          <input
            type="text"
            name="name"
            placeholder="First Name"
            value={registerForm.name}
            onChange={handleRegisterChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={registerForm.lastname}
            onChange={handleRegisterChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={handleRegisterChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleRegisterChange}
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
