export const RARITY_STYLE = {
  Común: "var(--rarity-comun)",
  "Poco Común": "var(--rarity-poco-comun)",
  Raro: "var(--rarity-raro)",
  Épico: "var(--rarity-epico)",
  Legendario: "var(--rarity-legendario)",
};

export function rarityColor(rarity) {
  return RARITY_STYLE[rarity] || "var(--color-border)";
}
