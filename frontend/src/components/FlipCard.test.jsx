import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";
import FlipCard from "./FlipCard";

const card = {
  id: "species-1",
  commonName: "Turpial",
  scientificName: "Icterus icterus",
  group: "AVES",
  rarity: "Común",
  description: "Un dato curioso",
  imageUrl: null,
  speed: 50,
  camouflage: 20,
  resistance: 50,
  adaptability: 90,
};

describe("FlipCard", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("inicia mostrando el reverso (sin la clase is-flipped)", () => {
    const { container } = render(<FlipCard card={card} />);
    expect(container.querySelector(".flip-card")).not.toHaveClass("is-flipped");
  });

  it("voltea hacia el frente despues del tiempo de espera automatico", () => {
    const { container } = render(<FlipCard card={card} />);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(container.querySelector(".flip-card")).toHaveClass("is-flipped");
  });

  it("permite voltear manualmente con clic una vez revelada", () => {
    const { container } = render(<FlipCard card={card} />);

    act(() => {
      vi.advanceTimersByTime(600);
    });

    const flipCard = container.querySelector(".flip-card");
    expect(flipCard).toHaveClass("is-flipped");

    fireEvent.click(flipCard);
    expect(flipCard).not.toHaveClass("is-flipped");
  });
});
