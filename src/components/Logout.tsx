import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../routes/AuthContext';
import { logoutUser } from '../utils/auth';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { onAuthenticationChange } = useAuth();

  useEffect(() => {
    logoutUser(onAuthenticationChange);
    navigate('/auth/login');
  }, [navigate, onAuthenticationChange]);


  // Optionally, you can render a message or a loader here
  return <div>Logging out...</div>;
};

export default Logout;
