import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function RequireAuth({
  children,
  redirectTo = "/register",
}) {
  const { isAuthenticated, ready } = useAuth();
  const location = useLocation();

  if (!ready) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-stone-500 text-sm">
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={redirectTo} state={{ from: location }} replace />
    );
  }

  return children;
}
