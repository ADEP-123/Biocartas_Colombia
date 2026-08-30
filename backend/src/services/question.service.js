const questionRepository = require("../repositories/question.repository");
const shuffleArray = require("../utils/shuffle");

async function getQuestionsBySpecies(speciesId) {
  return questionRepository.findBySpecies(speciesId);
}

async function getPublicQuestionsBySpecies(speciesId) {
  const questions = await questionRepository.findBySpecies(speciesId);
  return questions.map(({ correctOptionIndex, options, ...rest }) => ({
    ...rest,
    options: shuffleArray(options),
  }));
}

module.exports = { getQuestionsBySpecies, getPublicQuestionsBySpecies };
