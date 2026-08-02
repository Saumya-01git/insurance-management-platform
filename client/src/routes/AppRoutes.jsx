import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "../components/layout/AuthLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

// Protected Route Guard
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../components/common/ErrorBoundary";

// Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import Dashboard from "../pages/dashboard/Dashboard";
import CustomerDashboardPage from "../pages/customer/CustomerDashboardPage";
import CustomersPage from "../pages/customers/CustomersPage";
import PoliciesPage from "../pages/policies/PoliciesPage";
import ClaimsPage from "../pages/claims/ClaimsPage";
import PaymentsPage from "../pages/payments/PaymentsPage";
import DocumentsPage from "../pages/documents/DocumentsPage";
import ReportsPage from "../pages/reports/ReportsPage";
import SettingsPage from "../pages/settings/SettingsPage";
import ProfilePage from "../pages/settings/ProfilePage";
import ForbiddenPage from "../pages/common/ForbiddenPage";
import NotFoundPage from "../pages/common/NotFoundPage";
import ServerErrorPage from "../pages/common/ServerErrorPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          {/* Public / Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected Routes Container */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/forbidden" element={<ForbiddenPage />} />

              {/* Customer Portal Route */}
              <Route element={<ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN", "AGENT"]} />}>
                <Route path="/customer-dashboard" element={<CustomerDashboardPage />} />
              </Route>

              {/* Admin & Agent Enterprise Operational Routes */}
              <Route element={<ProtectedRoute allowedRoles={["ADMIN", "AGENT"]} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/customers" element={<CustomersPage />} />
                <Route path="/policies" element={<PoliciesPage />} />
                <Route path="/claims" element={<ClaimsPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/documents" element={<DocumentsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
              </Route>

              {/* Admin System Settings Route */}
              <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Route>

          {/* Error & Fallback Routes */}
          <Route path="/500" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default AppRoutes;