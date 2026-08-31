jest.mock("../repositories/userCard.repository");
jest.mock("../repositories/species.repository");

const userCardRepository = require("../repositories/userCard.repository");
const speciesRepository = require("../repositories/species.repository");
const collectionService = require("./collection.service");

function makeSpecies(id, group, conservationStatus) {
  return { id, group, conservationStatus };
}

describe("collection.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserProgress", () => {
    it("cuenta especies desbloqueadas y totales por grupo taxonomico", async () => {
      speciesRepository.findAll.mockResolvedValue([
        makeSpecies("a1", "AVES", "LC"),
        makeSpecies("a2", "AVES", "VU"),
        makeSpecies("m1", "MAMIFEROS", "LC"),
      ]);
      userCardRepository.findByUser.mockResolvedValue([
        { species: makeSpecies("a1", "AVES", "LC") },
      ]);

      const progress = await collectionService.getUserProgress("user-1");
      const aves = progress.byGroup.find(g => g.group === "AVES");
      const mamiferos = progress.byGroup.find(g => g.group === "MAMIFEROS");

      expect(progress.totalUnlocked).toBe(1);
      expect(progress.totalSpecies).toBe(3);
      expect(aves).toMatchObject({ unlocked: 1, total: 2, percentage: 50 });
      expect(mamiferos).toMatchObject({ unlocked: 0, total: 1, percentage: 0 });
    });
  });

  describe("getUserAchievements", () => {
    it('desbloquea "primera-carta" solo despues de la primera carta', async () => {
      speciesRepository.findAll.mockResolvedValue([
        makeSpecies("a1", "AVES", "LC"),
      ]);
      userCardRepository.findByUser.mockResolvedValue([]);

      const sinCartas = await collectionService.getUserAchievements("user-1");
      expect(sinCartas.find(a => a.id === "primera-carta").unlocked).toBe(
        false,
      );

      userCardRepository.findByUser.mockResolvedValue([
        { species: makeSpecies("a1", "AVES", "LC") },
      ]);
      const conUnaCarta = await collectionService.getUserAchievements("user-1");
      expect(conUnaCarta.find(a => a.id === "primera-carta").unlocked).toBe(
        true,
      );
    });

    it('desbloquea "coleccion-completa" solo cuando se tienen todas las especies', async () => {
      const todas = [
        makeSpecies("a1", "AVES", "LC"),
        makeSpecies("a2", "AVES", "VU"),
      ];
      speciesRepository.findAll.mockResolvedValue(todas);
      userCardRepository.findByUser.mockResolvedValue(
        todas.map(s => ({ species: s })),
      );

      const achievements =
        await collectionService.getUserAchievements("user-1");
      expect(
        achievements.find(a => a.id === "coleccion-completa").unlocked,
      ).toBe(true);
    });
  });
});
