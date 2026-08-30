import { createContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, getMeRequest } from "../api/auth.api";

export const AuthContext = createContext(null);

const TOKEN_KEY = "biocartas_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const me = await getMeRequest();
        setUser(me);
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  async function login(email, password) {
    const { token, user: loggedUser } = await loginRequest(email, password);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(loggedUser);
  }

  async function register(name, email, password) {
    const { token, user: newUser } = await registerRequest(
      name,
      email,
      password,
    );
    localStorage.setItem(TOKEN_KEY, token);
    setUser(newUser);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
