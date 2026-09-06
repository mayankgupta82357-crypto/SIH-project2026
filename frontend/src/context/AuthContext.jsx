import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("uc_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default demo admin for instant presentation readiness
    return {
      id: "usr-admin-01",
      name: "Dr. Rajeshwar Rao",
      email: "admin@urbancascade.gov",
      role: "Admin",
      badge: "ADM-994",
      department: "Urban Resilience & Command Center"
    };
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      if (res.success) {
        setUser(res.user);
        localStorage.setItem("uc_auth_token", res.token);
        localStorage.setItem("uc_user", JSON.stringify(res.user));
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message || "Login failed." };
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (role = "Admin") => {
    setLoading(true);
    try {
      const res = await authAPI.demoLogin(role);
      if (res.success) {
        setUser(res.user);
        localStorage.setItem("uc_auth_token", res.token);
        localStorage.setItem("uc_user", JSON.stringify(res.user));
        return { success: true, user: res.user };
      }
      return { success: false, message: "Demo login failed." };
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const res = await authAPI.register(data);
      if (res.success) {
        setUser(res.user);
        localStorage.setItem("uc_auth_token", res.token);
        localStorage.setItem("uc_user", JSON.stringify(res.user));
        return { success: true, user: res.user };
      }
      return { success: false, message: res.message || "Registration failed." };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("uc_auth_token");
    localStorage.removeItem("uc_user");
  };

  const isAdmin = user?.role === "Admin";
  const isOperator = user?.role === "Emergency Operator" || user?.role === "Admin";
  const isCitizen = user?.role === "Citizen";

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        demoLogin,
        register,
        logout,
        isAdmin,
        isOperator,
        isCitizen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
