import { useEffect, useState } from "react";
import DeviceFrame, { useDeviceStatus } from "../components/DeviceFrame";
import {
  getSpeciesList,
  getSpeciesQuestions,
  answerSpeciesQuestion,
} from "../api/species.api";
import { getMyCollection } from "../api/collection.api";
import { rarityColor } from "../utils/rarity";

function SpeciesList({ species, unlockedIds, onSelect }) {
  return (
    <>
      <p className="auth-heading">Especies · Módulo Aves</p>
      <ul className="species-list">
        {species.map(s => {
          const unlocked = unlockedIds.has(s.id);
          return (
            <li key={s.id}>
              <button
                type="button"
                className="species-row"
                onClick={() => onSelect(s, unlocked)}
              >
                <img
                  src={s.imageUrl}
                  alt=""
                  className={`species-thumb ${unlocked ? "" : "species-thumb-locked"}`}
                />
                <span className="species-row-info">
                  <span className="species-row-name">{s.commonName}</span>
                  <span
                    className="species-row-rarity"
                    style={{ color: rarityColor(s.rarity) }}
                  >
                    {s.rarity}
                  </span>
                </span>
                <span
                  className={`species-row-status ${unlocked ? "unlocked" : "locked"}`}
                >
                  {unlocked ? "Obtenida" : "Bloqueada"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function Quiz({ species, question, onAnswered, onCancel }) {
  const { setStatus } = useDeviceStatus();
  const [submitting, setSubmitting] = useState(false);

  async function handleAnswer(option) {
    if (submitting) return;
    setSubmitting(true);
    setStatus("Comprobando...", "idle");
    try {
      const result = await answerSpeciesQuestion(
        species.id,
        question.id,
        option,
      );
      if (result.correct) {
        setStatus(
          `¡Felicidades! Desbloqueaste a ${species.commonName}`,
          "success",
        );
        onAnswered(result.card);
      } else {
        setStatus(result.hint, "error");
        setSubmitting(false);
      }
    } catch (err) {
      setStatus(
        err.response?.data?.error || "Algo salió mal, intenta de nuevo.",
        "error",
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <p className="auth-heading">{species.commonName}</p>
      <p className="quiz-prompt">{question.prompt}</p>
      <div className="quiz-options">
        {question.options.map(option => (
          <button
            key={option}
            type="button"
            className="quiz-option"
            disabled={submitting}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="quiz-cancel"
        onClick={onCancel}
        disabled={submitting}
      >
        Volver a la lista
      </button>
    </>
  );
}

function CardReveal({ species, card, onBack }) {
  const displayed = card || species;
  const stats = [
    ["Velocidad", displayed.speed],
    ["Camuflaje", displayed.camouflage],
    ["Resistencia", displayed.resistance],
    ["Adaptabilidad", displayed.adaptability],
  ];

  return (
    <div className="card-reveal">
      <div
        className="card-panel"
        style={{ borderColor: rarityColor(displayed.rarity) }}
      >
        <img
          src={displayed.imageUrl}
          alt={displayed.commonName}
          className="card-image"
        />
        <div className="card-name-row">
          <span className="card-name">{displayed.commonName}</span>
          <span
            className="card-rarity"
            style={{ color: rarityColor(displayed.rarity) }}
          >
            {displayed.rarity}
          </span>
        </div>
        <p className="card-scientific">{displayed.scientificName}</p>
        <div className="card-stats">
          {stats.map(([label, value]) => (
            <div key={label} className="card-stat">
              <span className="card-stat-label">{label}</span>
              <div className="card-stat-bar">
                <div
                  className="card-stat-fill"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="card-stat-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <button type="button" className="quiz-cancel" onClick={onBack}>
        Volver a la lista
      </button>
    </div>
  );
}

function PlayScreen() {
  const { setStatus } = useDeviceStatus();
  const [view, setView] = useState("loading");
  const [speciesList, setSpeciesList] = useState([]);
  const [unlockedIds, setUnlockedIds] = useState(new Set());
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [question, setQuestion] = useState(null);
  const [unlockedCard, setUnlockedCard] = useState(null);

  async function loadData() {
    setView("loading");
    try {
      const [species, collection] = await Promise.all([
        getSpeciesList("AVES"),
        getMyCollection(),
      ]);
      setSpeciesList(species);
      setUnlockedIds(new Set(collection.map(entry => entry.species.id)));
      setStatus("Listo", "idle");
      setView("list");
    } catch (err) {
      setStatus("No se pudo cargar el módulo.", "error");
      setView("list");
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSelect(species, unlocked) {
    if (unlocked) {
      setSelectedSpecies(species);
      setUnlockedCard(null);
      setView("result");
      return;
    }
    setStatus("Cargando pregunta...", "idle");
    try {
      const questions = await getSpeciesQuestions(species.id);
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      setSelectedSpecies(species);
      setQuestion(randomQuestion);
      setView("quiz");
      setStatus("Listo", "idle");
    } catch (err) {
      setStatus("No se pudieron cargar las preguntas.", "error");
    }
  }

  function handleAnswered(card) {
    setUnlockedCard(card);
    setView("result");
  }

  function backToList() {
    setSelectedSpecies(null);
    setQuestion(null);
    setUnlockedCard(null);
    loadData();
  }

  if (view === "loading") {
    return <p className="quiz-prompt">Cargando módulo Aves...</p>;
  }

  if (view === "quiz") {
    return (
      <Quiz
        species={selectedSpecies}
        question={question}
        onAnswered={handleAnswered}
        onCancel={backToList}
      />
    );
  }

  if (view === "result") {
    return (
      <CardReveal
        species={selectedSpecies}
        card={unlockedCard}
        onBack={backToList}
      />
    );
  }

  return (
    <SpeciesList
      species={speciesList}
      unlockedIds={unlockedIds}
      onSelect={handleSelect}
    />
  );
}

function Play() {
  return (
    <DeviceFrame title="BioCartas · Juego">
      <PlayScreen />
    </DeviceFrame>
  );
}

export default Play;
