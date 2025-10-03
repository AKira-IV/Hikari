"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthenticatedUser } from '@/lib/types';
import { tokenStorage } from '@/lib/api-client';

interface AuthContextType {
  user: AuthenticatedUser | null;
  isAuthenticated: boolean;
  login: (user: AuthenticatedUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on component mount
    const checkAuthStatus = () => {
      const token = tokenStorage.getAccessToken();
      const refreshToken = tokenStorage.getRefreshToken();

      if (token && refreshToken) {
        // Try to get user info from localStorage
        const storedUser = localStorage.getItem('hikari_user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setUser(userData);
          } catch (error) {
            console.error('Error parsing stored user data:', error);
            tokenStorage.clearTokens();
          }
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (userData: AuthenticatedUser) => {
    setUser(userData);
    localStorage.setItem('hikari_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hikari_user');
    tokenStorage.clearTokens();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
