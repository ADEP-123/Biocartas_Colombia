import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p className="loading-text">Cargando sesión...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
