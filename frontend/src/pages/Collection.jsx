import { useEffect, useState } from "react";
import DeviceFrame, { useDeviceStatus } from "../components/DeviceFrame";
import CardPanel from "../components/CardPanel";
import {
  getMyCollection,
  getMyProgress,
  getMyAchievements,
} from "../api/collection.api";
import { rarityColor } from "../utils/rarity";

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
    <li className={`achievement-row ${unlocked ? "unlocked" : "locked"}`}>
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
  const activeGroups = progress.byGroup.filter(g => g.total > 0);

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
      <ul className="achievement-list">
        {achievements.map(a => (
          <AchievementRow key={a.id} {...a} />
        ))}
      </ul>

      <p className="collection-subheading">Cartas obtenidas</p>
      {collection.length === 0 ? (
        <p className="empty-state">
          Aún no tienes cartas. Ve a Jugar para conseguir la primera.
        </p>
      ) : (
        <div className="gallery-grid">
          {collection.map(({ species }) => (
            <button
              key={species.id}
              type="button"
              className="gallery-item"
              onClick={() => onSelect(species)}
            >
              <img src={species.imageUrl} alt="" className="gallery-thumb" />
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
        <CardPanel card={selectedSpecies} />
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
  return (
    <DeviceFrame title="BioCartas · Colección">
      <CollectionScreen />
    </DeviceFrame>
  );
}

export default Collection;
