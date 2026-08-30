const prisma = require("../config/prisma");

async function findAll({ group } = {}) {
  return prisma.species.findMany({
    where: group ? { group } : undefined,
    orderBy: { commonName: "asc" },
  });
}

async function findById(id) {
  return prisma.species.findUnique({ where: { id } });
}

async function create(data) {
  return prisma.species.create({ data });
}

async function update(id, data) {
  return prisma.species.update({ where: { id }, data });
}

async function remove(id) {
  return prisma.species.delete({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };
