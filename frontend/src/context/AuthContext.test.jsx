import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider } from "./AuthContext";
import { useAuth } from "../hooks/useAuth";
import * as authApi from "../api/auth.api";

vi.mock("../api/auth.api");

function TestConsumer() {
  const { user, isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="status">{isAuthenticated ? "dentro" : "fuera"}</span>
      <span data-testid="name">{user?.name || ""}</span>
      <button onClick={() => login("ana@example.com", "secreta123")}>
        Entrar
      </button>
      <button onClick={logout}>Salir</button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("empieza sin sesion cuando no hay token guardado", async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("status")).toHaveTextContent("fuera"),
    );
  });

  it("inicia sesion, guarda el token y expone el usuario", async () => {
    authApi.loginRequest.mockResolvedValue({
      token: "token-simulado",
      user: { id: "1", name: "Ana", email: "ana@example.com" },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await waitFor(() =>
      expect(screen.getByTestId("status")).toHaveTextContent("fuera"),
    );

    await userEvent.click(screen.getByText("Entrar"));

    await waitFor(() =>
      expect(screen.getByTestId("status")).toHaveTextContent("dentro"),
    );
    expect(screen.getByTestId("name")).toHaveTextContent("Ana");
    expect(localStorage.getItem("biocartas_token")).toBe("token-simulado");
  });

  it("cierra sesion y limpia el token guardado", async () => {
    authApi.loginRequest.mockResolvedValue({
      token: "token-simulado",
      user: { id: "1", name: "Ana", email: "ana@example.com" },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );
    await userEvent.click(screen.getByText("Entrar"));
    await waitFor(() =>
      expect(screen.getByTestId("status")).toHaveTextContent("dentro"),
    );

    await userEvent.click(screen.getByText("Salir"));

    expect(screen.getByTestId("status")).toHaveTextContent("fuera");
    expect(localStorage.getItem("biocartas_token")).toBeNull();
  });

  it("restaura la sesion si ya existe un token valido en localStorage", async () => {
    localStorage.setItem("biocartas_token", "token-existente");
    authApi.getMeRequest.mockResolvedValue({
      id: "1",
      name: "Ana",
      email: "ana@example.com",
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("status")).toHaveTextContent("dentro"),
    );
    expect(screen.getByTestId("name")).toHaveTextContent("Ana");
  });

  it("borra el token si resulta invalido al restaurar la sesion", async () => {
    localStorage.setItem("biocartas_token", "token-invalido");
    authApi.getMeRequest.mockRejectedValue(new Error("401"));

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId("status")).toHaveTextContent("fuera"),
    );
    expect(localStorage.getItem("biocartas_token")).toBeNull();
  });
});
