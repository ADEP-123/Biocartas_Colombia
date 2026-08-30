const { Router } = require("express");
const speciesController = require("../controllers/species.controller");
const questionController = require("../controllers/question.controller");
const gamificationController = require("../controllers/gamification.controller");
const requireAuth = require("../middlewares/auth.middleware");

const router = Router();

router.get("/", speciesController.listSpecies);
router.get("/:id", speciesController.getSpecies);
router.get("/:id/questions", questionController.listPublicQuestions);
router.post("/:id/answer", requireAuth, gamificationController.answerQuestion);

router.post("/", requireAuth, speciesController.createSpecies);
router.put("/:id", requireAuth, speciesController.updateSpecies);
router.delete("/:id", requireAuth, speciesController.deleteSpecies);

module.exports = router;
