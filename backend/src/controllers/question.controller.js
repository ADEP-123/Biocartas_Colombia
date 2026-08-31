const questionService = require("../services/question.service");

async function listPublicQuestions(req, res, next) {
  try {
    const questions = await questionService.getPublicQuestionsBySpecies(
      req.params.id,
    );
    res.json(questions);
  } catch (error) {
    next(error);
  }
}

module.exports = { listPublicQuestions };
