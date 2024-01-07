import React, { useState } from 'react';
import axios from 'axios';
import { UserCredentials, AuthToken, LoginFormProps } from '../types/authTypes';

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState<UserCredentials>({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('1')
      const response = await axios.post<AuthToken>('http://localhost:8000/auth/token/', credentials);
      console.log('2')
      localStorage.setItem('access_token', response.data.access);
      console.log('3')
      localStorage.setItem('refresh_token', response.data.refresh);
      console.log('4')
      onLoginSuccess(); // Call the callback on successful login
      console.log('5')
    } catch (error) {
      console.error(error);
      // Handle login error
    } finally {
      console.log(localStorage.getItem('access_token'));
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
