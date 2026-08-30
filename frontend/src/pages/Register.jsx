import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import DeviceFrame, { useDeviceStatus } from "../components/DeviceFrame";

function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const { setStatus } = useDeviceStatus();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register(name, email, password);
      setStatus("Cuenta creada", "success");
      navigate("/collection");
    } catch (err) {
      setStatus(
        err.response?.data?.error || "No se pudo crear la cuenta.",
        "error",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <p className="auth-heading">Crear cuenta</p>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Nombre
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
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
          {submitting ? "Creando cuenta..." : "Registrarme"}
        </button>
      </form>
      <p className="auth-switch">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </>
  );
}

function Register() {
  return (
    <DeviceFrame title="BioCartas · Registro">
      <RegisterForm />
    </DeviceFrame>
  );
}

export default Register;
