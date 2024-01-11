import axios from 'axios';
import { UserCredentials, AuthToken } from '../types/authTypes';

export const login = async (credentials: UserCredentials, onAuthenticationChange: (authState: boolean) => void): Promise<void> => {
  try {
    const response = await axios.post<AuthToken>('http://localhost:8000/auth/token/', credentials);
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    onAuthenticationChange(true);
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};
