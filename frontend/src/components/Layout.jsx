import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Layout() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <Link to="/" className="app-title">
            BioCartas Colombia
          </Link>
          <nav className="app-nav">
            {isAuthenticated ? (
              <>
                <Link to="/collection">Mi colección</Link>
                <Link to="/play">Jugar</Link>
                <span className="app-user">Hola, {user.name}</span>
                <button onClick={logout} className="link-button">
                  Salir
                </button>
              </>
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
