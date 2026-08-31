import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Layout() {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="app-title">
            BioCartas Colombia
          </Link>
          <nav className="app-nav">
            {isAuthenticated ? (
              <span className="app-user">Hola, {user.name}</span>
            ) : (
              <>
                <Link to="/login">Iniciar sesión</Link>
                <Link to="/register">Registrarme</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
