import { useEffect, useState } from "react";
import CardPanel from "./CardPanel";
import CardBack from "./CardBack";

function FlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);
  const [autoRevealing, setAutoRevealing] = useState(true);

  useEffect(() => {
    setFlipped(false);
    setAutoRevealing(true);
    const timer = setTimeout(() => {
      setFlipped(true);
      setAutoRevealing(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [card.id]);

  function handleClick() {
    if (autoRevealing) return;
    setFlipped(current => !current);
  }

  return (
    <div className="flip-card-scene">
      <button
        type="button"
        className={`flip-card ${flipped ? "is-flipped" : ""}`}
        onClick={handleClick}
      >
        <div className="flip-card-face flip-card-back">
          <CardBack group={card.group} funFact={card.description} />
        </div>
        <div className="flip-card-face flip-card-front">
          <CardPanel card={card} />
        </div>
      </button>
      <p className="flip-card-hint">Toca la carta para voltearla</p>
    </div>
  );
}

export default FlipCard;
