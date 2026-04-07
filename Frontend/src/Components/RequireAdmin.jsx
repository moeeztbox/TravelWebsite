import { Navigate, useLocation } from "react-router-dom";
import { getStoredAdminToken } from "../Services/AdminApi/AdminService";

export default function RequireAdmin({ children }) {
  const location = useLocation();
  if (!getStoredAdminToken()) {
    return (
      <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
    );
  }
  return children;
}
