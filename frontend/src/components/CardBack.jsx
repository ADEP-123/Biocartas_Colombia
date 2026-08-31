import { getGroupMeta } from "../utils/groups";

function CardBack({ group }) {
  const { label, color, icon: Icon } = getGroupMeta(group);
  return (
    <div className="card-back" style={{ backgroundColor: color }}>
      <span className="card-back-brand">BioCartas</span>
      <div className="card-back-icon">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      <span className="card-back-group">{label}</span>
    </div>
  );
}

export default CardBack;
