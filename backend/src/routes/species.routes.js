const { Router } = require("express");
const speciesController = require("../controllers/species.controller");

const router = Router();

router.get("/", speciesController.listSpecies);
router.get("/:id", speciesController.getSpecies);

module.exports = router;
