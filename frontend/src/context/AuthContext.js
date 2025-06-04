import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const showToast = (message, type = 'info') => {
  console.log(`[${type.toUpperCase()}]: ${message}`);
  if (type === 'error') {
    alert(`Error: ${message}`);
  }
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tokens, setTokens] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedTokens = localStorage.getItem('tokens');
        if (storedTokens) {
          const parsedTokens = JSON.parse(storedTokens);
          const decoded = jwt_decode(parsedTokens.access);
          const expirationTime = decoded.exp * 1000;

          if (Date.now() < expirationTime) {
            setTokens(parsedTokens);
            axios.defaults.headers.common['Authorization'] = `Bearer ${parsedTokens.access}`;
            const response = await axios.get('/api/users/me/');
            setCurrentUser(response.data);
            setIsAuthenticated(true);
          } else {
            await attemptRefreshToken(parsedTokens.refresh);
          }
        }
      } catch (error) {
        console.error('Failed to load user from storage:', error);
        await performLogout(); 
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  const attemptRefreshToken = async (refreshTokenValue) => {
    try {
      const response = await axios.post('/api/token/refresh/', { refresh: refreshTokenValue });
      const { access } = response.data;
      const newTokens = { access, refresh: refreshTokenValue };
      localStorage.setItem('tokens', JSON.stringify(newTokens));
      setTokens(newTokens);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      const userResponse = await axios.get('/api/users/me/');
      setCurrentUser(userResponse.data);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      await performLogout(); // Token refresh failed, logout user
      return false;
    }
  };

  const login = async (username, password) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/login/', { username, password });
      const { user, access, refresh } = response.data;
      const newTokens = { access, refresh };
      localStorage.setItem('tokens', JSON.stringify(newTokens));
      setTokens(newTokens);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      setCurrentUser(user);
      setIsAuthenticated(true);
      showToast('Login successful!', 'success');
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.detail || 'Login failed. Please check credentials.';
      setAuthError(errorMessage);
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setAuthError(null);
    setIsLoading(true);
    try {
      const response = await axios.post('/api/auth/register/', userData);
      const { user, access, refresh } = response.data;
      const newTokens = { access, refresh };
      localStorage.setItem('tokens', JSON.stringify(newTokens));
      setTokens(newTokens);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      setCurrentUser(user);
      setIsAuthenticated(true);
      showToast('Registration successful!', 'success');
      return user;
    } catch (error) {
      console.error('Registration failed:', error);
      let errorMessage = 'Registration failed. Please try again.';
      if (error.response?.data) {
        const errors = error.response.data;
        const fieldErrors = Object.values(errors).flat().join(' ');
        if (fieldErrors) errorMessage = fieldErrors;
      }
      setAuthError(errorMessage);
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const performLogout = async () => {
    try {
      const currentTokens = JSON.parse(localStorage.getItem('tokens')); // Get fresh tokens
      if (currentTokens?.refresh) {
        await axios.post('/api/auth/logout/', { refresh: currentTokens.refresh });
      }
    } catch (error) {
      console.error('Logout request failed (token might be invalid):', error);
    } finally {
      localStorage.removeItem('tokens');
      setTokens(null);
      setCurrentUser(null);
      setIsAuthenticated(false);
      delete axios.defaults.headers.common['Authorization'];
      showToast('Logged out.', 'info');
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await performLogout();
    setIsLoading(false);
  };

  const updateUserProfileContext = async (userData) => {
    // Renamed to avoid conflict with updateUser in API file
    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/users/${currentUser.id}/`, userData);
      setCurrentUser(response.data);
      showToast('Profile updated successfully!', 'success');
      return response.data;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to update profile.';
      showToast(errorMessage, 'error');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    tokens,
    isAuthenticated,
    isLoading,
    authError,
    login,
    register,
    logout,
    attemptRefreshToken, // Expose this for manual refresh if needed elsewhere
    updateUserProfileContext,
    showToast,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 