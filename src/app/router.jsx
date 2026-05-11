import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { AdminRoute } from "../components/layout/AdminRoute";
import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { SignalCatalogPage } from "../pages/SignalCatalogPage";
import { SignalDetailPage } from "../pages/SignalDetailPage";
import { AdminPage } from "../pages/AdminPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="signals" element={<SignalCatalogPage />} />
        <Route path="signals/:id" element={<SignalDetailPage />} />
        <Route
          path="admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
