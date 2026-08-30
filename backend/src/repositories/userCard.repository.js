const prisma = require("../config/prisma");

async function findByUser(userId) {
  return prisma.userCard.findMany({
    where: { userId },
    include: { species: true },
  });
}

async function unlock(userId, speciesId) {
  return prisma.userCard.create({ data: { userId, speciesId } });
}

async function exists(userId, speciesId) {
  const found = await prisma.userCard.findUnique({
    where: { userId_speciesId: { userId, speciesId } },
  });
  return Boolean(found);
}

module.exports = { findByUser, unlock, exists };
