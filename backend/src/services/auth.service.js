const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user.repository");
const env = require("../config/env");

const SALT_ROUNDS = 10;

async function register({ name, email, password }) {
  const existing = await userRepository.findByEmail(email);
  if (existing) {
    const error = new Error("Ya existe una cuenta con ese correo");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userRepository.create({ name, email, passwordHash });

  return buildAuthResponse(user);
}

async function login({ email, password }) {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);
  if (!validPassword) {
    const error = new Error("Credenciales inválidas");
    error.status = 401;
    throw error;
  }

  return buildAuthResponse(user);
}

function buildAuthResponse(user) {
  const token = jwt.sign({ sub: user.id }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn,
  });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

module.exports = { register, login };
