import { useState, useCallback } from "react";
import { AUTH_URL, AUTH_ME_URL } from "../lib/constants";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAuthenticated = Boolean(localStorage.getItem("helios_token"));
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("helios_user") ?? "null");
    } catch {
      return null;
    }
  })();

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(AUTH_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, expiresInMins: 60 }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message ?? "Invalid credentials");
      }
      const data = await res.json();
      // Fetch full profile to get role
      const meRes = await fetch(AUTH_ME_URL, {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });
      const me = meRes.ok ? await meRes.json() : data;
      localStorage.setItem("helios_token", data.accessToken);
      localStorage.setItem(
        "helios_user",
        JSON.stringify({
          id: me.id,
          username: me.username,
          firstName: me.firstName,
          role: me.role,
        }),
      );
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("helios_token");
    localStorage.removeItem("helios_user");
  }, []);

  return { login, logout, isAuthenticated, user, loading, error };
}
