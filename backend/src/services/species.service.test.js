jest.mock("../repositories/species.repository");
const speciesRepository = require("../repositories/species.repository");
const speciesService = require("./species.service");

describe("species.service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("mapea cada estado de conservación a la rareza correcta", () => {
    expect(speciesService.RARITY_BY_STATUS.LC).toBe("Común");
    expect(speciesService.RARITY_BY_STATUS.NT).toBe("Poco Común");
    expect(speciesService.RARITY_BY_STATUS.VU).toBe("Raro");
    expect(speciesService.RARITY_BY_STATUS.EN).toBe("Épico");
    expect(speciesService.RARITY_BY_STATUS.CR).toBe("Legendario");
  });

  describe("getAllSpecies", () => {
    it("le agrega el campo rarity a cada especie segun su conservationStatus", async () => {
      speciesRepository.findAll.mockResolvedValue([
        { id: "1", commonName: "Turpial", conservationStatus: "LC" },
        { id: "2", commonName: "Cóndor andino", conservationStatus: "VU" },
      ]);

      const result = await speciesService.getAllSpecies();

      expect(result[0].rarity).toBe("Común");
      expect(result[1].rarity).toBe("Raro");
    });
  });

  describe("getSpeciesById", () => {
    it("lanza un error 404 cuando la especie no existe", async () => {
      speciesRepository.findById.mockResolvedValue(null);

      await expect(
        speciesService.getSpeciesById("id-inexistente"),
      ).rejects.toMatchObject({
        status: 404,
      });
    });

    it("devuelve la especie con su rareza cuando existe", async () => {
      speciesRepository.findById.mockResolvedValue({
        id: "1",
        commonName: "Paujil piquiazul",
        conservationStatus: "CR",
      });

      const result = await speciesService.getSpeciesById("1");

      expect(result.rarity).toBe("Legendario");
    });
  });
});
