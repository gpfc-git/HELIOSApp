import { AUTH_ME_URL, AUTH_URL } from "../lib/constants";

export async function loginUser(username, password) {
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
  const meRes = await fetch(AUTH_ME_URL, {
    headers: { Authorization: `Bearer ${data.accessToken}` },
  });
  const me = meRes.ok ? await meRes.json() : data;

  const sessionUser = {
    id: me.id,
    username: me.username,
    firstName: me.firstName,
    role: me.role,
  };

  localStorage.setItem("helios_token", data.accessToken);
  localStorage.setItem("helios_user", JSON.stringify(sessionUser));

  return data;
}

export function clearAuthSession() {
  localStorage.removeItem("helios_token");
  localStorage.removeItem("helios_user");
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("helios_user") ?? "null");
  } catch {
    return null;
  }
}

export function hasStoredSession() {
  return Boolean(localStorage.getItem("helios_token"));
}
