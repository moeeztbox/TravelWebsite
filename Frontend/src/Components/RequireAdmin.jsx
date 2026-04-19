import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function RequireAdmin({ children }) {
  const location = useLocation();
  const { ready, isAuthenticated, user } = useAuth();

  if (!ready) return null;

  if (!isAuthenticated) {
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  if (user?.role !== "isAdmin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
