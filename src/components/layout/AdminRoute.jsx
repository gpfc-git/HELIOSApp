import { Navigate } from "react-router-dom";

export function AdminRoute({ children }) {
  const token = localStorage.getItem("helios_token");
  if (!token) return <Navigate to="/login" replace />;

  try {
    const user = JSON.parse(localStorage.getItem("helios_user") ?? "null");
    if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  } catch {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
