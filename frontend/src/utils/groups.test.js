import { describe, it, expect } from "vitest";
import { getGroupMeta } from "./groups";

describe("getGroupMeta", () => {
  it("devuelve etiqueta, color e icono para un grupo valido", () => {
    const meta = getGroupMeta("AVES");
    expect(meta.label).toBe("Aves");
    expect(meta.color).toBe("#3b6e8f");
    expect(meta.icon).toBeDefined();
  });

  it("tiene metadatos definidos para los 6 grupos taxonomicos", () => {
    ["AVES", "MAMIFEROS", "REPTILES", "ANFIBIOS", "PECES", "INSECTOS"].forEach(
      group => {
        const meta = getGroupMeta(group);
        expect(meta.label).toBeTruthy();
        expect(meta.color).toMatch(/^#/);
      },
    );
  });

  it("devuelve un valor de respaldo para un grupo desconocido", () => {
    const meta = getGroupMeta("DESCONOCIDO");
    expect(meta.label).toBe("DESCONOCIDO");
    expect(meta.color).toBe("var(--color-primary)");
  });
});
