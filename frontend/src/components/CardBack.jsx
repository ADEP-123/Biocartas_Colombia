import { getGroupMeta } from "../utils/groups";

function CardBack({ group, funFact }) {
  const { label, color, icon: Icon } = getGroupMeta(group);
  return (
    <div className="card-back" style={{ backgroundColor: color }}>
      <div className="card-back-top">
        <Icon size={18} strokeWidth={1.75} />
        <span className="card-back-group">{label}</span>
      </div>
      <p className="card-back-fact">{funFact}</p>
      <span className="card-back-brand">BioCartas</span>
    </div>
  );
}

export default CardBack;
