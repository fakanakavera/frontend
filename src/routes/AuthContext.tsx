import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import  checkIsAuthenticated   from '../utils/auth';

interface AuthContextType {
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

  const onAuthenticationChange = (authStatus: boolean) => {
    console.log('onAuthenticationChange');
    setIsAuthenticated(authStatus);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, onAuthenticationChange }}>
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

