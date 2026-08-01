import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

// Protected Route Guard
import ProtectedRoute from "./ProtectedRoute";

// Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Dashboard from "../pages/dashboard/Dashboard";
import CustomersPage from "../pages/customers/CustomersPage";
import PoliciesPage from "../pages/policies/PoliciesPage";
import ClaimsPage from "../pages/claims/ClaimsPage";
import PaymentsPage from "../pages/payments/PaymentsPage";
import DocumentsPage from "../pages/documents/DocumentsPage";
import ReportsPage from "../pages/reports/ReportsPage";
import ProfilePage from "../pages/settings/ProfilePage";
import NotFoundPage from "../pages/common/NotFoundPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public / Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/claims" element={<ClaimsPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Admin Only Protected Route */}
            <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/reports" element={<ReportsPage />} />
            </Route>
          </Route>
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;