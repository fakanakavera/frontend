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

function assessPasswordStrength(password: string): number {
  let strength = 0;
  if (password.length > 5) strength += 1;
  if (password.length > 10) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  return strength; // The strength will be a value between 0 and 6
}

export { checkIsAuthenticated, getUserEmail, logoutUser, assessPasswordStrength };