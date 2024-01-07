// src/App.tsx
import { AuthProvider } from './routes/AuthContext';
import AuthRoutes from './routes/AuthRoutes';

const App = () => {
  return <AuthProvider><AuthRoutes /></AuthProvider>;
};

export default App;
