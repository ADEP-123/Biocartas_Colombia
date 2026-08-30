import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DeviceFrame from "../components/DeviceFrame";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/collection");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "No se pudo iniciar sesión. Intenta de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <DeviceFrame title="BioCartas · Acceso">
      <p className="auth-heading">Iniciar sesión</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Correo
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      <p className="auth-switch">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </DeviceFrame>
  );
}

export default Login;
