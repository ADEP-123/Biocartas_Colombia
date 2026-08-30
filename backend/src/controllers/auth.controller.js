const authService = require("../services/auth.service");

function validateCredentials(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Correo y contraseña son obligatorios" });
  }
  next();
}

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }
    const result = await authService.register({ name, email, password });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login, validateCredentials };
