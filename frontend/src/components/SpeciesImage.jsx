import { getGroupMeta } from "../utils/groups";

function SpeciesImage({ species, className }) {
  if (species.imageUrl) {
    return <img src={species.imageUrl} alt="" className={className} />;
  }

  const { color, icon: Icon } = getGroupMeta(species.group);
  return (
    <div
      className={`${className} image-fallback`}
      style={{ backgroundColor: color }}
    >
      <Icon size={20} strokeWidth={1.75} />
    </div>
  );
}

export default SpeciesImage;
