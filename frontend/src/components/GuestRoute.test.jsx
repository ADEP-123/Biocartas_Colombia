import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import GuestRoute from "./GuestRoute";
import { useAuth } from "../hooks/useAuth";

vi.mock("../hooks/useAuth");

function renderWithRoute() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<div>Pantalla de login</div>} />
        </Route>
        <Route path="/dashboard" element={<div>Panel principal</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("GuestRoute", () => {
  it("muestra el formulario si el usuario no esta autenticado", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, loading: false });
    renderWithRoute();
    expect(screen.getByText("Pantalla de login")).toBeInTheDocument();
  });

  it("redirige al dashboard si el usuario ya esta autenticado", () => {
    useAuth.mockReturnValue({ isAuthenticated: true, loading: false });
    renderWithRoute();
    expect(screen.getByText("Panel principal")).toBeInTheDocument();
  });
});
