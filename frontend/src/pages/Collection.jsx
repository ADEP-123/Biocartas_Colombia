import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeviceFrame, { useDeviceStatus } from "../components/DeviceFrame";
import FlipCard from "../components/FlipCard";
import ScrollBox from "../components/ScrollBox";
import {
  getMyCollection,
  getMyProgress,
  getMyAchievements,
} from "../api/collection.api";
import { rarityColor } from "../utils/rarity";
import SpeciesImage from "../components/SpeciesImage";

const GROUP_LABELS = {
  AVES: "Aves",
  MAMIFEROS: "Mamíferos",
  REPTILES: "Reptiles",
  ANFIBIOS: "Anfibios",
  PECES: "Peces",
  INSECTOS: "Insectos",
};

function ProgressBar({ label, unlocked, total, percentage }) {
  return (
    <div className="progress-row">
      <span className="progress-label">{label}</span>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <span className="progress-value">
        {unlocked}/{total}
      </span>
    </div>
  );
}

function AchievementRow({ title, description, unlocked }) {
  return (
    <li
      className={`achievement-row ${unlocked ? "unlocked" : "locked"}`}
      tabIndex={0}
    >
      <span className="achievement-title">{title}</span>
      <span className="achievement-desc">{description}</span>
      <span
        className={`species-row-status ${unlocked ? "unlocked" : "locked"}`}
      >
        {unlocked ? "Lograda" : "Pendiente"}
      </span>
    </li>
  );
}

function Gallery({ collection, progress, achievements, onSelect }) {
  const [search, setSearch] = useState("");
  const activeGroups = progress.byGroup.filter(g => g.total > 0);

  const filteredCollection = collection.filter(entry =>
    entry.species.commonName
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  );

  return (
    <>
      <p className="auth-heading">Mi colección</p>
      <p className="collection-summary">
        {progress.totalUnlocked} / {progress.totalSpecies} especies
        desbloqueadas
      </p>

      <div className="progress-list">
        {activeGroups.map(g => (
          <ProgressBar key={g.group} label={GROUP_LABELS[g.group]} {...g} />
        ))}
      </div>

      <p className="collection-subheading">Logros</p>
      <ScrollBox maxHeight={150}>
        <ul className="achievement-list">
          {achievements.map(a => (
            <AchievementRow key={a.id} {...a} />
          ))}
        </ul>
      </ScrollBox>

      <p className="collection-subheading">Cartas obtenidas</p>
      {collection.length === 0 ? (
        <p className="empty-state">
          Aún no tienes cartas. Ve a Jugar para conseguir la primera.
        </p>
      ) : (
        <>
          <input
            type="search"
            className="collection-search"
            placeholder="Buscar en mi colección..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {filteredCollection.length === 0 ? (
            <p className="empty-state">
              Ninguna carta coincide con "{search}".
            </p>
          ) : (
            <ScrollBox maxHeight={220}>
              <div className="gallery-grid">
                {filteredCollection.map(({ species }) => (
                  <button
                    key={species.id}
                    type="button"
                    className="gallery-item"
                    onClick={() => onSelect(species)}
                  >
                    <SpeciesImage species={species} className="gallery-thumb" />
                    <span className="gallery-name">{species.commonName}</span>
                    <span
                      className="gallery-rarity"
                      style={{ color: rarityColor(species.rarity) }}
                    >
                      {species.rarity}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollBox>
          )}
        </>
      )}
    </>
  );
}

function CollectionScreen() {
  const { setStatus } = useDeviceStatus();
  const [view, setView] = useState("loading");
  const [collection, setCollection] = useState([]);
  const [progress, setProgress] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [collectionData, progressData, achievementsData] =
          await Promise.all([
            getMyCollection(),
            getMyProgress(),
            getMyAchievements(),
          ]);
        setCollection(collectionData);
        setProgress(progressData);
        setAchievements(achievementsData);
        setStatus("Listo", "idle");
        setView("gallery");
      } catch (err) {
        setStatus("No se pudo cargar tu colección.", "error");
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (view === "loading") {
    return <p className="quiz-prompt">Cargando tu colección...</p>;
  }

  if (view === "detail") {
    return (
      <div className="card-reveal">
        <FlipCard card={selectedSpecies} />
        <button
          type="button"
          className="quiz-cancel"
          onClick={() => setView("gallery")}
        >
          Volver a la colección
        </button>
      </div>
    );
  }

  return (
    <Gallery
      collection={collection}
      progress={progress}
      achievements={achievements}
      onSelect={species => {
        setSelectedSpecies(species);
        setView("detail");
      }}
    />
  );
}

function Collection() {
  const navigate = useNavigate();
  return (
    <DeviceFrame
      title="BioCartas · Colección"
      onHomeClick={() => navigate("/dashboard")}
    >
      <CollectionScreen />
    </DeviceFrame>
  );
}

export default Collection;
