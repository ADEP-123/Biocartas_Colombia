import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SpeciesImage from "./SpeciesImage";

describe("SpeciesImage", () => {
  it("renderiza una imagen cuando la especie tiene imageUrl", () => {
    const species = { imageUrl: "https://ejemplo.com/foto.jpg", group: "AVES" };
    render(<SpeciesImage species={species} className="test-class" />);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", species.imageUrl);
    expect(img).toHaveClass("test-class");
  });

  it("renderiza el respaldo con el color del grupo cuando no hay imageUrl", () => {
    const species = { imageUrl: null, group: "MAMIFEROS" };
    const { container } = render(
      <SpeciesImage species={species} className="test-class" />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    const fallback = container.querySelector(".image-fallback");
    expect(fallback).toBeInTheDocument();
    expect(fallback).toHaveStyle({ backgroundColor: "#7a5230" });
  });
});
