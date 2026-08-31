const userRepository = require("../repositories/user.repository");

// Registro con hash de contraseña y JWT se construye en la Fase 2 (autenticación).

async function getUserById(id) {
  return userRepository.findById(id);
}

module.exports = { getUserById };
