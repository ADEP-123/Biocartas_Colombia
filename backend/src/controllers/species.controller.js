const speciesService = require("../services/species.service");

async function listSpecies(req, res, next) {
  try {
    const { group } = req.query;
    const species = await speciesService.getAllSpecies({ group });
    res.json(species);
  } catch (error) {
    next(error);
  }
}

async function getSpecies(req, res, next) {
  try {
    const species = await speciesService.getSpeciesById(req.params.id);
    res.json(species);
  } catch (error) {
    next(error);
  }
}

module.exports = { listSpecies, getSpecies };
