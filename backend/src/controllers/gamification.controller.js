const gamificationService = require("../services/gamification.service");

async function answerQuestion(req, res, next) {
  try {
    const { id: speciesId } = req.params;
    const { questionId, selectedOption } = req.body;

    if (!questionId || !selectedOption) {
      return res
        .status(400)
        .json({ error: "questionId y selectedOption son obligatorios" });
    }

    const result = await gamificationService.answerQuestion({
      userId: req.userId,
      speciesId,
      questionId,
      selectedOption,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { answerQuestion };
