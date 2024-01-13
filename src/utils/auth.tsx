import axios from 'axios';

const checkIsAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token; // returns true if token exists, false otherwise
  };

const getUserEmail = async (setEmail: (email: string) => void) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      const response = await axios.get('http://localhost:8000/auth/get_user_email', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error:', error);
    }
  }
};

const logoutUser = async (onAuthenticationChange: (authStatus: boolean) => void) => {
  // Remove tokens or any authentication-related data from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  // Use the callback from the parent component to update the state in the parent
  onAuthenticationChange(false); 
  // Redirect the user to the login page
  // navigate('/auth/login');
};

export { checkIsAuthenticated, getUserEmail, logoutUser };