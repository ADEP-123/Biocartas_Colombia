const userCardRepository = require("../repositories/userCard.repository");

// La lógica completa de colección y progreso se construye en la Fase 5.

async function getUserCollection(userId) {
  return userCardRepository.findByUser(userId);
}

module.exports = { getUserCollection };
