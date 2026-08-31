import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, HelpCircle, Sparkles, Layers } from "lucide-react";
import apiClient from "../api/client";
import { getGroupMeta } from "../utils/groups";
import HomeDeviceMock from "../components/HomeDeviceMock";

const STEPS = [
  {
    icon: Compass,
    title: "Elige un módulo",
    text: "Aves, mamíferos, reptiles, anfibios, peces o insectos.",
  },
  {
    icon: HelpCircle,
    title: "Responde trivia real",
    text: "Preguntas sobre hábitat, dieta y comportamiento de cada especie.",
  },
  {
    icon: Sparkles,
    title: "Desbloquea la carta",
    text: "Acierta y la carta es tuya; falla y recibe una pista para reintentar.",
  },
  {
    icon: Layers,
    title: "Arma tu colección",
    text: "Sigue tu progreso por módulo y desbloquea logros.",
  },
];

const RARITY_TIERS = [
  { name: "Común", status: "Preocupación Menor", color: "var(--rarity-comun)" },
  {
    name: "Poco Común",
    status: "Casi Amenazada",
    color: "var(--rarity-poco-comun)",
  },
  { name: "Raro", status: "Vulnerable", color: "var(--rarity-raro)" },
  { name: "Épico", status: "En Peligro", color: "var(--rarity-epico)" },
  {
    name: "Legendario",
    status: "En Peligro Crítico",
    color: "var(--rarity-legendario)",
  },
];

const MODULES = [
  { group: "AVES", count: 8 },
  { group: "MAMIFEROS", count: 10 },
  { group: "REPTILES", count: 10 },
  { group: "ANFIBIOS", count: 10 },
  { group: "PECES", count: 10 },
  { group: "INSECTOS", count: 6 },
];

const GROUP_LABELS = {
  AVES: "Aves",
  MAMIFEROS: "Mamíferos",
  REPTILES: "Reptiles",
  ANFIBIOS: "Anfibios",
  PECES: "Peces",
  INSECTOS: "Insectos",
};

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
    <>
      <section className="home-hero">
        <div className="home-hero-text">
          <p className="home-eyebrow">Propuesta para el Instituto Humboldt</p>
          <h1>Fauna silvestre colombiana, una carta a la vez</h1>
          <p>
            BioCartas Colombia convierte la biodiversidad del país en un juego
            de cartas coleccionables. Cada especie se desbloquea respondiendo preguntas reales sobre
            su biología, y su rareza refleja su estado de conservación real
            según la UICN.
          </p>
          <div className="home-cta-row">
            <Link to="/register" className="home-cta">
              Crear mi colección
            </Link>
            <Link to="/login" className="home-cta-secondary">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
        <div className="home-hero-visual">
          <HomeDeviceMock />
        </div>
      </section>

      <section className="home-section">
        <h2>Cómo funciona</h2>
        <div className="home-steps">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="home-step">
              <span className="home-step-number">{i + 1}</span>
              <Icon size={22} strokeWidth={1.75} />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2>La rareza está basada en datos reales</h2>
        <p className="home-section-intro">
          No inventamos las categorías: usamos las mismas 5 que la UICN usa para
          clasificar el riesgo de extinción de una especie. Entre más amenazada
          está en la vida real, más difícil es conseguir su carta.
        </p>
        <div className="rarity-legend">
          {RARITY_TIERS.map(tier => (
            <div
              key={tier.name}
              className="rarity-chip"
              style={{ borderColor: tier.color }}
            >
              <span
                className="rarity-chip-dot"
                style={{ backgroundColor: tier.color }}
              />
              <span className="rarity-chip-name">{tier.name}</span>
              <span className="rarity-chip-status">{tier.status}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2>6 módulos, 54 especies reales</h2>
        <div className="home-modules-grid">
          {MODULES.map(({ group, count }) => {
            const { color, icon: Icon } = getGroupMeta(group);
            return (
              <div
                key={group}
                className="home-module-card"
                style={{ borderColor: color }}
              >
                <span
                  className="home-module-icon"
                  style={{ backgroundColor: color }}
                >
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="home-module-label">{GROUP_LABELS[group]}</span>
                <span className="home-module-count">{count} especies</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="home-section home-about">
        <h2>Sobre el proyecto</h2>
        <p>
          BioCartas Colombia nació como una propuesta de desarrollo de
          gamificación dirigida al Instituto Humboldt, con el objetivo de
          acercar la biodiversidad del país a más personas a través del juego,
          sin sacrificar el rigor científico de los datos.
        </p>
        <div className="home-developer">
          <div className="home-developer-avatar">👤</div>
          <div>
            <p className="home-developer-name">Andres David Elizalde Peralta</p>
            <p className="home-developer-role">
              Desarrollador full-stack — andep210399@gmail.com
            </p>
          </div>
        </div>
        <div className="home-stack">
          {[
            "React",
            "Node.js",
            "Express",
            "PostgreSQL",
            "Prisma",
            "Docker",
          ].map(tech => (
            <span key={tech} className="home-stack-badge">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
