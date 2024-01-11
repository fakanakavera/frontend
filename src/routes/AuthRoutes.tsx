import React, { useState, Suspense, lazy, FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import checkIsAuthenticated from '../utils/auth';
import { AuthenticationChangeProps } from '../types/authTypes';

const RegisterForm = lazy(() => import('../components/RegisterForm'));
const LoginForm = lazy(() => import('../components/LoginForm'));
const Logout = lazy(() => import('../components/Logout'));
const Items = lazy(() => import('../components/ItemList'));
const TopBar = lazy(() => import('../components/TopBar'));

interface LoginFormProps {
  onAuthenticationChange: (authenticated: boolean) => void;
}

const AuthenticatedRoutes: FC<AuthenticationChangeProps> = ({ onAuthenticationChange }) => {
  const isAuthenticated = checkIsAuthenticated();
  return isAuthenticated ? (
    <Routes>
      <Route path="/auth/logout" element={<Logout onAuthenticationChange={onAuthenticationChange}/>} />
      <Route path="/items" element={<><TopBar /><Items /></>} />
      {/* Add other authenticated routes here */}
    </Routes>
  ) : (
    <Navigate to="/auth/login" />
  );
};

const AuthRoutes: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkIsAuthenticated());

  const handleAuthenticationChange = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Routes that do not require authentication */}
        <Route path="/auth/login" element={<LoginForm onAuthenticationChange={handleAuthenticationChange} />} />
        <Route path="/auth/register" element={<RegisterForm onAuthenticationChange={handleAuthenticationChange}/>} />

        {/* Authenticated Routes */}
        <Route path="/*" element={<AuthenticatedRoutes onAuthenticationChange={handleAuthenticationChange}/>} />
      </Routes>
    </Suspense>
  );
};

export default AuthRoutes;
