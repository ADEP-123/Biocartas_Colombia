import { Bird, PawPrint, Turtle, Droplet, Fish, Bug } from "lucide-react";

const GROUP_META = {
  AVES: { label: "Aves", color: "#3b6e8f", icon: Bird },
  MAMIFEROS: { label: "Mamíferos", color: "#7a5230", icon: PawPrint },
  REPTILES: { label: "Reptiles", color: "#55684a", icon: Turtle },
  ANFIBIOS: { label: "Anfibios", color: "#2f7a6b", icon: Droplet },
  PECES: { label: "Peces", color: "#1f4e79", icon: Fish },
  INSECTOS: { label: "Insectos", color: "#8a6d1f", icon: Bug },
};

export function getGroupMeta(group) {
  return (
    GROUP_META[group] || {
      label: group,
      color: "var(--color-primary)",
      icon: Bird,
    }
  );
}
