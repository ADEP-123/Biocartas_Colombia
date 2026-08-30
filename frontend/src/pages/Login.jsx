import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DeviceFrame, { useDeviceStatus } from "../components/DeviceFrame";

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { setStatus } = useDeviceStatus();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      setStatus("Acceso concedido", "success");
      navigate("/collection");
    } catch (err) {
      setStatus(
        err.response?.data?.error || "No se pudo iniciar sesión.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
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
        <button type="submit" disabled={submitting}>
          {submitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      <p className="auth-switch">
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </>
  );
}

function Login() {
  return (
    <DeviceFrame title="BioCartas · Acceso">
      <LoginForm />
    </DeviceFrame>
  );
}

export default Login;
