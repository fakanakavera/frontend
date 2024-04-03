import React, { useState } from 'react';
import { UserCredentials } from '../types/authTypes';
import { useRedirect } from '../hooks/useRedirect';
import { login } from '../services/authService';
import { useAuth } from '../routes/AuthContext';
import ReCAPTCHA from "react-google-recaptcha";

const LoginForm: React.FC = () => {
  const [credentials, setCredentials] = useState<UserCredentials>({ email: '', password: '' });
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const { redirectToItems } = useRedirect();
  const { onAuthenticationChange } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const onReCAPTCHAChange = (value: string | null) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(credentials, onAuthenticationChange, recaptchaValue);

      //alert('Login successful!');
      redirectToItems();
    } catch (error) {
      alert('Login failed!');
      console.error(error);
      // Handle login error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="email" value={credentials.email} onChange={handleChange} />
      <input type="password" name="password" value={credentials.password} onChange={handleChange} />
      <ReCAPTCHA
        sitekey="6LehVa0pAAAAAE5XJX61VIll_VcbFiH7eei9llKc"
        onChange={onReCAPTCHAChange}
      />
      <button type="submit">Login</button>

    </form>
  );
};

export default LoginForm;
