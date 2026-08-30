const prisma = require("../config/prisma");

async function findBySpecies(speciesId) {
  return prisma.question.findMany({ where: { speciesId } });
}

async function create(data) {
  return prisma.question.create({ data });
}

module.exports = { findBySpecies, create };
