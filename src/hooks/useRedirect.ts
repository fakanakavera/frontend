// useRedirect.ts
import { useNavigate } from 'react-router-dom';

export const useRedirect = () => {
  const navigate = useNavigate();

  const redirectToLogin = () => {
    console.log('redirected to login');
    navigate('/auth/login');
  };

  const redirectToItems = () => {
    navigate('/items');
  };

  // You can add more redirect functions here if needed

  return { redirectToLogin, redirectToItems };
};
