const questionRepository = require("../repositories/question.repository");

async function getQuestionsBySpecies(speciesId) {
  return questionRepository.findBySpecies(speciesId);
}

// Nunca se envía correctOptionIndex al cliente: se validará en el
// servidor cuando se construya el motor de gamificación (Fase 4).
async function getPublicQuestionsBySpecies(speciesId) {
  const questions = await questionRepository.findBySpecies(speciesId);
  return questions.map(({ correctOptionIndex, ...rest }) => rest);
}

module.exports = { getQuestionsBySpecies, getPublicQuestionsBySpecies };
