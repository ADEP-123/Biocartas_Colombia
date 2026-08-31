import { rarityColor } from "../utils/rarity";
import SpeciesImage from "../components/SpeciesImage";

function CardPanel({ card }) {
  const stats = [
    ["Velocidad", card.speed],
    ["Camuflaje", card.camouflage],
    ["Resistencia", card.resistance],
    ["Adaptabilidad", card.adaptability],
  ];

  return (
    <div
      className="card-panel"
      style={{ borderColor: rarityColor(card.rarity) }}
    >
      <SpeciesImage species={card} className="card-image" />
      <div className="card-name-row">
        <span className="card-name">{card.commonName}</span>
        <span
          className="card-rarity"
          style={{ color: rarityColor(card.rarity) }}
        >
          {card.rarity}
        </span>
      </div>
      <p className="card-scientific">{card.scientificName}</p>
      <div className="card-stats">
        {stats.map(([label, value]) => (
          <div key={label} className="card-stat">
            <span className="card-stat-label">{label}</span>
            <div className="card-stat-bar">
              <div className="card-stat-fill" style={{ width: `${value}%` }} />
            </div>
            <span className="card-stat-value">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardPanel;
