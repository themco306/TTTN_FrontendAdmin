// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../state/actions/authActions';

const AuthContext = createContext(

);
export const useAuth = () => {
    return useContext(AuthContext);
  };
  const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
  

  
    const loginContext = (userData) => {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData.user));
      dispatch(authActions.login(userData.user));
      dispatch(authActions.setToken(userData.token))
    };
  
    const logoutContext = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch(authActions.logout());
    };
  
    return (
      <AuthContext.Provider value={{ loginContext, logoutContext }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  export { AuthProvider };