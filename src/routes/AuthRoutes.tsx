import React, { useEffect, useState, Suspense, lazy, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import checkIsAuthenticated from '../utils/auth';


const RegisterForm = lazy(() => import('../components/RegisterForm'));
const LoginForm = lazy(() => import('../components/LoginForm'));
const Logout = lazy(() => import('../components/Logout'));
const Items = lazy(() => import('../components/ItemList'));

const AuthRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkIsAuthenticated());

  // useEffect(() => {
  //     const token = localStorage.getItem('access_token');
  //     setIsAuthenticated(!!token);
  //   }, []);
    
  const handleLoginSuccess = () => {
      console.log('Login successful');
      setIsAuthenticated(true);
    };
    
    interface AuthenticatedLayoutProps {
      children: ReactNode;
      isAuthenticated: boolean;
    }
    const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children, isAuthenticated }) => {
      return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
    };
    return (
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/auth/login" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/auth/register" element={<RegisterForm/>} />
          </Routes>
        <AuthenticatedLayout isAuthenticated={isAuthenticated}>
          <Routes>
            <Route path="/auth/logout" element={<Logout />} />
            <Route path="/items" element={<Items />} />
          </Routes>
        </AuthenticatedLayout>
      </Suspense>
  );
};

export default AuthRoutes;
