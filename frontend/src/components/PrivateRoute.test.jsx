import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useAuth } from "../hooks/useAuth";

vi.mock("../hooks/useAuth");

function renderWithRoute() {
  return render(
    <MemoryRouter initialEntries={["/protegido"]}>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/protegido" element={<div>Contenido protegido</div>} />
        </Route>
        <Route path="/login" element={<div>Pantalla de login</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("PrivateRoute", () => {
  it("muestra un indicador de carga mientras se restaura la sesion", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, loading: true });
    renderWithRoute();
    expect(screen.getByText(/cargando sesión/i)).toBeInTheDocument();
  });

  it("redirige a /login si el usuario no esta autenticado", () => {
    useAuth.mockReturnValue({ isAuthenticated: false, loading: false });
    renderWithRoute();
    expect(screen.getByText("Pantalla de login")).toBeInTheDocument();
  });

  it("muestra el contenido si el usuario esta autenticado", () => {
    useAuth.mockReturnValue({ isAuthenticated: true, loading: false });
    renderWithRoute();
    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
  });
});
