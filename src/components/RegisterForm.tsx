import React, { useState } from 'react';
import axios from 'axios';
import { UserCredentials, AuthenticationChangeProps } from '../types/authTypes';
import { useRedirect } from '../hooks/useRedirect';
import { login } from '../services/authService';
import { useAuth } from '../routes/AuthContext';
import { assessPasswordStrength } from '../utils/auth';
import PasswordStrengthBar from './PasswordStrengthBar';

const RegisterForm: React.FC = () => {
  const [user, setUser] = useState<UserCredentials>({ email: '', password: '' });
  const { redirectToItems } = useRedirect();
  const { onAuthenticationChange } = useAuth();
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      const strength = assessPasswordStrength(e.target.value);
      setPasswordStrength(strength);
  }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Adjust the URL to your API endpoint for user registration
      await axios.post('http://localhost:8000/auth/register/', user);
      await login(user, onAuthenticationChange);
      alert('Registration successful!')
      // Handle registration success, e.g., redirect to login page or auto-login
      redirectToItems();
    } catch (error) {
      alert('Registration failed!');
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
      <PasswordStrengthBar strength={passwordStrength} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
