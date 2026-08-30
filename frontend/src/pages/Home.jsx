import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/client";

function Home() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    apiClient
      .get("/health")
      .then(() => setStatus("ok"))
      .catch(() => setStatus("error"));
  }, []);

  const statusText = {
    checking: "Verificando conexión con el servidor...",
    ok: "Conectado al servidor",
    error: "Sin conexión con el servidor",
  }[status];

  return (
    <div className="home-hero">
      <h1>Fauna silvestre colombiana, una carta a la vez</h1>
      <p>
        BioCartas Colombia es un juego de cartas coleccionables sobre la
        biodiversidad del país. Cada especie —desde el turpial hasta el paujil
        piquiazul— se desbloquea respondiendo preguntas sobre su hábitat, su
        dieta y su estado real de conservación según la UICN.
      </p>
      <p>
        Entre más rara y amenazada es una especie en la vida real, más difícil
        es conseguir su carta.
      </p>
      <Link to="/register" className="home-cta">
        Empieza tu colección
      </Link>
      <div className="home-status">
        <span className={`status-dot ${status}`} />
        {statusText}
      </div>
    </div>
  );
}

export default Home;
