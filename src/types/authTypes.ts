// src/types/authTypes.ts
import { ReactNode } from "react";

export interface UserCredentials {
    email: string;
    password: string;
}

export interface AuthToken {
    access: string;
    refresh: string;
}

export interface UserData {
    email: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string; // or Date if you parse the date string to a Date object
}

export interface AuthenticationChangeProps {
    onAuthenticationChange: (authenticated: boolean) => void;
}

export interface AuthenticatedLayoutProps {
    children: ReactNode;
    isAuthenticated: boolean;
  }