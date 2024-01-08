import React, { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import checkIsAuthenticated from '../utils/auth';
import {AuthenticatedLayoutProps} from '../types/authTypes';

const RegisterForm = lazy(() => import('../components/RegisterForm'));
const LoginForm = lazy(() => import('../components/LoginForm'));
const Logout = lazy(() => import('../components/Logout'));
const Items = lazy(() => import('../components/ItemList'));

const AuthRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkIsAuthenticated());
  
  const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children, isAuthenticated }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
  };

  const handleAuthenticationChange = (authenticated: boolean) => {
    setIsAuthenticated(authenticated);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/login" element={<LoginForm onAuthenticationChange={handleAuthenticationChange} />} />
          <Route path="/auth/register" element={<RegisterForm/>} />
        </Routes>
      <AuthenticatedLayout isAuthenticated={isAuthenticated}>
        <Routes>
          <Route path="/auth/logout" element={<Logout onAuthenticationChange={handleAuthenticationChange}/>} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </AuthenticatedLayout>
    </Suspense>
  );
};

export default AuthRoutes;
