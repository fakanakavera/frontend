import { Suspense, lazy, FC } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { useAuth } from '../routes/AuthContext';

const RegisterForm = lazy(() => import('../components/RegisterForm'));
const LoginForm = lazy(() => import('../components/LoginForm'));
const Logout = lazy(() => import('../components/Logout'));
const Items = lazy(() => import('../components/ItemList'));
const TopBar = lazy(() => import('../components/TopBar'));
const ChangePassword = lazy(() => import('../components/ChangePassword'));

const AuthenticatedRoutes: FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Routes>
      <Route path="/auth/change-password" element={<><TopBar /><ChangePassword /></>} />
      <Route path="/auth/logout" element={<Logout />} />
      <Route path="/items" element={<><TopBar /><Items /></>} />
      {/* Add other authenticated routes here */}
    </Routes>
  ) : (
    <Navigate to="/auth/login" />
  );
};

const AuthRoutes: FC = () => {

  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Routes that do not require authentication */}
          <Route path="/auth/login" element={<><TopBar /><LoginForm/></>} />
          <Route path="/auth/register" element={<><TopBar /><RegisterForm /></>} />

          {/* Authenticated Routes */}
          <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AuthRoutes;
