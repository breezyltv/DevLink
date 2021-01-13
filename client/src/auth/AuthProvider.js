import React, { useEffect, useState } from "react";
import { OAuth } from "../actions/authAction";
import isEmpty from "../utils/isEmpty_valid";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    admin: false,
    loading: true,
    user: {}
  };
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    OAuth().then(user => {
      if (user) {
        setCurrentUser({
          isAuthenticated: true,
          admin: user.role === "admin" ? true : false,
          loading: false,
          user: user
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
