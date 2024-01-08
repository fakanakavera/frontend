import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenticationChangeProps } from '../types/authTypes';

const Logout: React.FC<AuthenticationChangeProps> = ({ onAuthenticationChange }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove tokens or any authentication-related data from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Use the callback from the parent component to update the state in the parent
    onAuthenticationChange(false); 
    console.log('Logout successful');
    // Redirect the user to the login page
    navigate('/auth/login');
  }, [navigate]);

  // Optionally, you can render a message or a loader here
  return <div>Logging out...</div>;
};

export default Logout;
