const questionRepository = require("../repositories/question.repository");
const userCardRepository = require("../repositories/userCard.repository");
const speciesService = require("./species.service");

function normalize(text) {
  return text.trim().toLowerCase();
}

async function answerQuestion({
  userId,
  speciesId,
  questionId,
  selectedOption,
}) {
  const question = await questionRepository.findById(questionId);

  if (!question || question.speciesId !== speciesId) {
    const error = new Error("Pregunta no encontrada para esta especie");
    error.status = 404;
    throw error;
  }

  const correctText = question.options[question.correctOptionIndex];
  const isCorrect = normalize(selectedOption) === normalize(correctText);

  if (!isCorrect) {
    return {
      correct: false,
      hint:
        question.hint || "Vuelve a leer la ficha de la especie con atención.",
    };
  }

  const alreadyOwned = await userCardRepository.exists(userId, speciesId);
  if (!alreadyOwned) {
    await userCardRepository.unlock(userId, speciesId);
  }

  const card = await speciesService.getSpeciesById(speciesId);

  return { correct: true, alreadyOwned, card };
}

module.exports = { answerQuestion };
