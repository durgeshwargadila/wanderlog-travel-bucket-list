import React, { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import toast from 'react-hot-toast';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('wanderlog_token'));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('wanderlog_email'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('wanderlog_token');
    const storedEmail = localStorage.getItem('wanderlog_email');
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setUserEmail(storedEmail);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('wanderlog_token', data.token);
      localStorage.setItem('wanderlog_email', email);
      setToken(data.token);
      setUserEmail(email);
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  }, []);

  const signup = useCallback(async (email, password) => {
    try {
      const data = await registerUser(email, password);
      localStorage.setItem('wanderlog_token', data.token);
      localStorage.setItem('wanderlog_email', email);
      setToken(data.token);
      setUserEmail(email);
      toast.success('Registered and logged in!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('wanderlog_token');
    localStorage.removeItem('wanderlog_email');
    setToken(null);
    setUserEmail(null);
    toast.success('Logged out successfully.');
  }, []);

  const value = {
    isAuthenticated: !!token,
    token,
    userEmail,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
