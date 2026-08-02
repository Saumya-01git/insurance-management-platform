import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuth();
  const userRole = (user?.role || "ADMIN").toUpperCase();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const uppercaseAllowed = allowedRoles.map((r) => r.toUpperCase());
    if (!uppercaseAllowed.includes(userRole)) {
      if (userRole === "CUSTOMER") {
        return <Navigate to="/customer-dashboard" replace />;
      }
      return <Navigate to="/forbidden" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
