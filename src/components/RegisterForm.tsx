import React, { useState } from 'react';
import axios from 'axios';
import { UserCredentials } from '../types/authTypes';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserCredentials>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const redirectToLogin = () => {
    navigate('/auth/login'); // Replace '/login' with your login route
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Adjust the URL to your API endpoint for user registration
      await axios.post('http://localhost:8000/auth/register/', user);
      // Handle registration success, e.g., redirect to login page or auto-login
    } catch (error) {
      console.error(error);
      // Handle registration error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
