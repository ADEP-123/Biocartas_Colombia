const speciesRepository = require("../repositories/species.repository");

const RARITY_BY_STATUS = {
  LC: "Común",
  NT: "Poco Común",
  VU: "Raro",
  EN: "Épico",
  CR: "Legendario",
};

function withRarity(species) {
  if (!species) return species;
  return { ...species, rarity: RARITY_BY_STATUS[species.conservationStatus] };
}

async function getAllSpecies(filters) {
  const species = await speciesRepository.findAll(filters);
  return species.map(withRarity);
}

async function getSpeciesById(id) {
  const species = await speciesRepository.findById(id);
  if (!species) {
    const error = new Error("Especie no encontrada");
    error.status = 404;
    throw error;
  }
  return withRarity(species);
}

async function createSpecies(data) {
  return speciesRepository.create(data);
}

async function updateSpecies(id, data) {
  return speciesRepository.update(id, data);
}

async function deleteSpecies(id) {
  return speciesRepository.remove(id);
}

module.exports = {
  getAllSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies,
  RARITY_BY_STATUS,
};
