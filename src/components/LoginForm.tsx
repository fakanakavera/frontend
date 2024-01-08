import React, { useState } from 'react';
import axios from 'axios';
import { UserCredentials, AuthToken, AuthenticationChangeProps } from '../types/authTypes';

const LoginForm: React.FC<AuthenticationChangeProps> = ({ onAuthenticationChange }) => {
  const [credentials, setCredentials] = useState<UserCredentials>({ email: '', password: '' });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post<AuthToken>('http://localhost:8000/auth/token/', credentials);
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      onAuthenticationChange(true); 
    } catch (error) {
      console.error(error);
      // Handle login error
    } 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="email" value={credentials.email} onChange={handleChange} />
      <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
