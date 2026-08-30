import { useEffect, useState } from "react";
import apiClient from "../api/client";

function Home() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    apiClient
      .get("/health")
      .then(() => setStatus("ok"))
      .catch(() => setStatus("error"));
  }, []);

  return (
    <div className="status-card">
      <p>Estado del backend:</p>
      {status === "checking" && <p>Verificando conexión...</p>}
      {status === "ok" && (
        <p className="status-ok">Conectado correctamente ✔</p>
      )}
      {status === "error" && (
        <p className="status-error">
          No se pudo conectar al backend. ¿Está corriendo en el puerto 5000?
        </p>
      )}
    </div>
  );
}

export default Home;
