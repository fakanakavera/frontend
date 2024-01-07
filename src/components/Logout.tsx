import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove tokens or any authentication-related data from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Update any state or context if needed
    // For example, if you have an authentication context, you would update it here
    // Redirect the user to the login page
    console.log('Logout successful');
    navigate('/auth/login');
  }, [navigate]);

  // Optionally, you can render a message or a loader here
  return <div>Logging out...</div>;
};

export default Logout;
