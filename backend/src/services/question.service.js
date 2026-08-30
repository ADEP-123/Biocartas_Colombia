const questionRepository = require("../repositories/question.repository");

// La selección aleatoria y validación de respuestas se construye
// en la Fase 4 (motor de gamificación).

async function getQuestionsBySpecies(speciesId) {
  return questionRepository.findBySpecies(speciesId);
}

module.exports = { getQuestionsBySpecies };
