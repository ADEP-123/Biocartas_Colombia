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

async function createSpecies(req, res, next) {
  try {
    const species = await speciesService.createSpecies(req.body);
    res.status(201).json(species);
  } catch (error) {
    next(error);
  }
}

async function updateSpecies(req, res, next) {
  try {
    const species = await speciesService.updateSpecies(req.params.id, req.body);
    res.json(species);
  } catch (error) {
    next(error);
  }
}

async function deleteSpecies(req, res, next) {
  try {
    await speciesService.deleteSpecies(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listSpecies,
  getSpecies,
  createSpecies,
  updateSpecies,
  deleteSpecies,
};
