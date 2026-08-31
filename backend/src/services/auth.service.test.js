jest.mock("../repositories/user.repository");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");
const authService = require("./auth.service");

describe("auth.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register", () => {
    it("rechaza con 409 si el correo ya esta registrado", async () => {
      userRepository.findByEmail.mockResolvedValue({ id: "usuario-existente" });

      await expect(
        authService.register({
          name: "Ana",
          email: "ana@example.com",
          password: "secreta123",
        }),
      ).rejects.toMatchObject({ status: 409 });
    });

    it("encripta la contraseña y devuelve un token con el nuevo usuario", async () => {
      userRepository.findByEmail.mockResolvedValue(null);
      bcrypt.hash.mockResolvedValue("hash-simulado");
      userRepository.create.mockResolvedValue({
        id: "user-1",
        name: "Ana",
        email: "ana@example.com",
        passwordHash: "hash-simulado",
      });
      jwt.sign.mockReturnValue("token-simulado");

      const result = await authService.register({
        name: "Ana",
        email: "ana@example.com",
        password: "secreta123",
      });

      expect(bcrypt.hash).toHaveBeenCalledWith("secreta123", 10);
      expect(result).toEqual({
        token: "token-simulado",
        user: { id: "user-1", name: "Ana", email: "ana@example.com" },
      });
    });
  });

  describe("login", () => {
    it("rechaza con 401 si el usuario no existe", async () => {
      userRepository.findByEmail.mockResolvedValue(null);

      await expect(
        authService.login({ email: "nadie@example.com", password: "x" }),
      ).rejects.toMatchObject({
        status: 401,
      });
    });

    it("rechaza con 401 si la contraseña no coincide", async () => {
      userRepository.findByEmail.mockResolvedValue({
        id: "user-1",
        passwordHash: "hash",
      });
      bcrypt.compare.mockResolvedValue(false);

      await expect(
        authService.login({ email: "ana@example.com", password: "incorrecta" }),
      ).rejects.toMatchObject({ status: 401 });
    });

    it("devuelve un token cuando las credenciales son validas", async () => {
      userRepository.findByEmail.mockResolvedValue({
        id: "user-1",
        name: "Ana",
        email: "ana@example.com",
        passwordHash: "hash",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token-simulado");

      const result = await authService.login({
        email: "ana@example.com",
        password: "secreta123",
      });

      expect(result.token).toBe("token-simulado");
      expect(result.user).toEqual({
        id: "user-1",
        name: "Ana",
        email: "ana@example.com",
      });
    });
  });
});
