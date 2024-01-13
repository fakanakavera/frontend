// useRedirect.ts
import { useNavigate } from 'react-router-dom';

export const useRedirect = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate('/auth/login');
  };

  const redirectToRegister = () => {
    navigate('/auth/register');
  };

  const redirectToLogout = () => {
    navigate('/auth/logout');
  };

  const redirectToItems = () => {
    navigate('/items');
  };

  const redirectToChangePassword = () => {
    navigate('/auth/change-password');
  };

  // You can add more redirect functions here if needed

  return { redirectToLogin, redirectToItems, redirectToChangePassword, redirectToRegister, redirectToLogout };
};
