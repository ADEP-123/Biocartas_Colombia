const userCardRepository = require("../repositories/userCard.repository");
const speciesRepository = require("../repositories/species.repository");
const { RARITY_BY_STATUS } = require("./species.service");

const GROUPS = [
  "AVES",
  "MAMIFEROS",
  "REPTILES",
  "ANFIBIOS",
  "PECES",
  "INSECTOS",
];

const ACHIEVEMENTS = [
  {
    id: "primera-carta",
    title: "Primer contacto",
    description: "Desbloquea tu primera carta.",
    isUnlocked: ({ totalUnlocked }) => totalUnlocked >= 1,
  },
  {
    id: "diez-cartas",
    title: "Coleccionista dedicado",
    description: "Desbloquea 10 cartas en total.",
    isUnlocked: ({ totalUnlocked }) => totalUnlocked >= 10,
  },
  {
    id: "coleccion-aves-completa",
    title: "Maestro de las Aves",
    description: "Desbloquea todas las cartas del módulo Aves.",
    isUnlocked: ({ progressByGroup }) =>
      Boolean(progressByGroup.AVES?.total) &&
      progressByGroup.AVES.unlocked === progressByGroup.AVES.total,
  },
  {
    id: "coleccion-completa",
    title: "Guardián de la biodiversidad",
    description: "Desbloquea todas las cartas disponibles en la aplicación.",
    isUnlocked: ({ totalUnlocked, totalSpecies }) =>
      totalSpecies > 0 && totalUnlocked === totalSpecies,
  },
];

function withRarity(species) {
  return { ...species, rarity: RARITY_BY_STATUS[species.conservationStatus] };
}

async function getUserCollection(userId) {
  const userCards = await userCardRepository.findByUser(userId);
  return userCards.map(uc => ({
    unlockedAt: uc.unlockedAt,
    species: withRarity(uc.species),
  }));
}

async function getUserProgress(userId) {
  const [userCards, allSpecies] = await Promise.all([
    userCardRepository.findByUser(userId),
    speciesRepository.findAll(),
  ]);

  const totals = Object.fromEntries(
    GROUPS.map(g => [g, { total: 0, unlocked: 0 }]),
  );

  for (const species of allSpecies) totals[species.group].total += 1;
  for (const uc of userCards) totals[uc.species.group].unlocked += 1;

  const byGroup = GROUPS.map(group => ({
    group,
    unlocked: totals[group].unlocked,
    total: totals[group].total,
    percentage: totals[group].total
      ? Math.round((totals[group].unlocked / totals[group].total) * 100)
      : 0,
  }));

  return {
    totalUnlocked: userCards.length,
    totalSpecies: allSpecies.length,
    byGroup,
  };
}

async function getUserAchievements(userId) {
  const progress = await getUserProgress(userId);
  const progressByGroup = Object.fromEntries(
    progress.byGroup.map(g => [g.group, g]),
  );
  const context = { ...progress, progressByGroup };

  return ACHIEVEMENTS.map(a => ({
    id: a.id,
    title: a.title,
    description: a.description,
    unlocked: a.isUnlocked(context),
  }));
}

module.exports = { getUserCollection, getUserProgress, getUserAchievements };
