import { useState, useCallback } from "react";
import {
  clearAuthSession,
  getStoredUser,
  hasStoredSession,
  loginUser,
} from "../services/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = hasStoredSession();
  const user = getStoredUser();

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      return await loginUser(username, password);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
  }, []);

  return { login, logout, isAuthenticated, user, loading, error };
}
