import React,{useEffect} from 'react';
import {Navigate} from "react-router-dom";


export const PrivateRoutes = ({ children }) => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  
    useEffect(() => {
      // Add dependencies to useEffect to prevent infinite loop
    }, []); // empty dependency array ensures useEffect runs only once
  
    return getTokenFromLocalStorage?.employeeEmail !== undefined ? (
      children
    ) : (
      <Navigate to="/" replace={true} />
    );
  };