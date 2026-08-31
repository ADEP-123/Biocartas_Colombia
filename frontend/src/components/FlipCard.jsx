import { useEffect, useState } from "react";
import CardPanel from "./CardPanel";
import CardBack from "./CardBack";

function FlipCard({ card }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
    const timer = setTimeout(() => setFlipped(true), 500);
    return () => clearTimeout(timer);
  }, [card.id]);

  return (
    <div className="flip-card-scene">
      <div className={`flip-card ${flipped ? "is-flipped" : ""}`}>
        <div className="flip-card-face flip-card-back">
          <CardBack group={card.group} />
        </div>
        <div className="flip-card-face flip-card-front">
          <CardPanel card={card} />
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
