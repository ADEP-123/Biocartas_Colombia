import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function GuestRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p className="loading-text">Cargando sesión...</p>;
  }

  return isAuthenticated ? <Navigate to="/collection" replace /> : <Outlet />;
}

export default GuestRoute;
