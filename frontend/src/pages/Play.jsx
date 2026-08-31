import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceFrame, { useDeviceStatus } from "../components/DeviceFrame";
import FlipCard from "../components/FlipCard";
import {
  getSpeciesList,
  getSpeciesQuestions,
  answerSpeciesQuestion,
} from "../api/species.api";
import { getMyCollection, getMyProgress } from "../api/collection.api";
import { rarityColor } from "../utils/rarity";
import { getGroupMeta } from "../utils/groups";
import SpeciesImage from "../components/SpeciesImage";

const GROUP_LABELS = {
  AVES: "Aves",
  MAMIFEROS: "Mamíferos",
  REPTILES: "Reptiles",
  ANFIBIOS: "Anfibios",
  PECES: "Peces",
  INSECTOS: "Insectos",
};

function ModuleGrid({ groups, onSelect }) {
  return (
    <>
      <p className="auth-heading">Elige un módulo</p>
      <div className="app-grid">
        {groups.map(group => {
          const { color, icon: Icon } = getGroupMeta(group);
          return (
            <button
              key={group}
              type="button"
              className="app-icon"
              onClick={() => onSelect(group)}
            >
              <span
                className="app-icon-glyph"
                style={{ backgroundColor: color }}
              >
                <Icon size={22} strokeWidth={1.75} />
              </span>
              <span className="app-icon-label">{GROUP_LABELS[group]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

function SpeciesList({ group, species, unlockedIds, onSelect, onBack }) {
  return (
    <>
      <p className="auth-heading">Especies · Módulo {GROUP_LABELS[group]}</p>
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
                <SpeciesImage
                  species={s}
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
      <button type="button" className="quiz-cancel" onClick={onBack}>
        Elegir otro módulo
      </button>
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
  return (
    <div className="card-reveal">
      <FlipCard card={displayed} />
      <button type="button" className="quiz-cancel" onClick={onBack}>
        Volver a la lista
      </button>
    </div>
  );
}

function PlayScreen() {
  const { setStatus } = useDeviceStatus();
  const [view, setView] = useState("loading");
  const [availableGroups, setAvailableGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [speciesList, setSpeciesList] = useState([]);
  const [unlockedIds, setUnlockedIds] = useState(new Set());
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [question, setQuestion] = useState(null);
  const [unlockedCard, setUnlockedCard] = useState(null);

  useEffect(() => {
    async function loadModules() {
      setView("loading");
      try {
        const progress = await getMyProgress();
        const groups = progress.byGroup
          .filter(g => g.total > 0)
          .map(g => g.group);
        setAvailableGroups(groups);
        setStatus("Listo", "idle");
        setView("modules");
      } catch (err) {
        setStatus("No se pudieron cargar los módulos.", "error");
        setView("modules");
      }
    }
    loadModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function openModule(group) {
    setView("loading");
    setSelectedGroup(group);
    setStatus("Cargando especies...", "idle");
    try {
      const [species, collection] = await Promise.all([
        getSpeciesList(group),
        getMyCollection(),
      ]);
      setSpeciesList(species);
      setUnlockedIds(new Set(collection.map(entry => entry.species.id)));
      setStatus("Listo", "idle");
      setView("list");
    } catch (err) {
      setStatus("No se pudo cargar el módulo.", "error");
      setView("modules");
    }
  }

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
    openModule(selectedGroup);
  }

  function backToModules() {
    setSelectedGroup(null);
    setSpeciesList([]);
    setView("modules");
  }

  if (view === "loading") {
    return <p className="quiz-prompt">Cargando...</p>;
  }

  if (view === "modules") {
    return <ModuleGrid groups={availableGroups} onSelect={openModule} />;
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
      group={selectedGroup}
      species={speciesList}
      unlockedIds={unlockedIds}
      onSelect={handleSelect}
      onBack={backToModules}
    />
  );
}

function Play() {
  const navigate = useNavigate();
  return (
    <DeviceFrame
      title="BioCartas · Juego"
      onHomeClick={() => navigate("/dashboard")}
    >
      <PlayScreen />
    </DeviceFrame>
  );
}

export default Play;
