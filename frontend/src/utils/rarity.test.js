import { describe, it, expect } from "vitest";
import { rarityColor } from "./rarity";

describe("rarityColor", () => {
  it("devuelve el color correcto para cada rareza conocida", () => {
    expect(rarityColor("Común")).toBe("var(--rarity-comun)");
    expect(rarityColor("Poco Común")).toBe("var(--rarity-poco-comun)");
    expect(rarityColor("Raro")).toBe("var(--rarity-raro)");
    expect(rarityColor("Épico")).toBe("var(--rarity-epico)");
    expect(rarityColor("Legendario")).toBe("var(--rarity-legendario)");
  });

  it("devuelve un color de respaldo para una rareza desconocida", () => {
    expect(rarityColor("Inventada")).toBe("var(--color-border)");
  });
});
