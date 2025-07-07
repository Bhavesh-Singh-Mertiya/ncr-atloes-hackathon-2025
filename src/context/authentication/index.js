import React, { createContext, useState, useEffect, useContext } from "react";
// import * as auth from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStoragedData() {
      const storagedUser = localStorage.getItem("@RJSAuth:user");
      const storagedToken = localStorage.getItem("@RJSAuth:token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  async function login() {
    console.log("login");
    // const response = await auth.signIn();
    // setUser(response.user);
    // localStorage.setItem("@RJSAuth:user", JSON.stringify(response.user));
    // localStorage.setItem("@RJSAuth:token", JSON.stringify(response.user));
  }

  function logout() {
    console.log("logout");
    // localStorage.clear();
    // setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, loading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
