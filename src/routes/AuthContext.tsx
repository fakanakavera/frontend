import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import  {checkIsAuthenticated, getUserEmail}   from '../utils/auth';

interface AuthContextType {
  userEmail: string;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  onAuthenticationChange: (authStatus: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkIsAuthenticated());
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    if (isAuthenticated){
      getUserEmail(setUserEmail);
    }else{
      setUserEmail('');
    }
  }, [isAuthenticated]);

  const onAuthenticationChange = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
  };

  return (
    <AuthContext.Provider value={{ userEmail, isAuthenticated, setIsAuthenticated, onAuthenticationChange }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

