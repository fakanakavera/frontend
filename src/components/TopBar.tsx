import { useRedirect } from '../hooks/useRedirect';
import { useAuth } from '../routes/AuthContext';

const TopBar = () => {
  const { redirectToItems, redirectToChangePassword, redirectToRegister, redirectToLogout } = useRedirect();
  const { userEmail } = useAuth();
 

  return (
    <div className="top-bar">
      {userEmail ? <p>Welcome, {userEmail}</p> : <p>Please log in</p>}
      <button onClick={redirectToItems}>Go to Items</button>
      <button onClick={redirectToChangePassword}>Change Password</button>
      <button onClick={redirectToRegister}>Register</button>
      <button onClick={redirectToLogout}>Logout</button>
    </div>
  );
};

export default TopBar;
