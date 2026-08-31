jest.mock("../repositories/question.repository");
jest.mock("../repositories/userCard.repository");
jest.mock("./species.service");

const questionRepository = require("../repositories/question.repository");
const userCardRepository = require("../repositories/userCard.repository");
const speciesService = require("./species.service");
const gamificationService = require("./gamification.service");

describe("gamification.service.answerQuestion", () => {
  const baseQuestion = {
    id: "q1",
    speciesId: "species-1",
    options: ["Correcta", "Incorrecta A", "Incorrecta B"],
    correctOptionIndex: 0,
    hint: "Piensa de nuevo",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("lanza un 404 si la pregunta no pertenece a la especie indicada", async () => {
    questionRepository.findById.mockResolvedValue({
      ...baseQuestion,
      speciesId: "otra-especie",
    });

    await expect(
      gamificationService.answerQuestion({
        userId: "user-1",
        speciesId: "species-1",
        questionId: "q1",
        selectedOption: "Correcta",
      }),
    ).rejects.toMatchObject({ status: 404 });
  });

  it("devuelve correct: false con la pista cuando el texto no coincide", async () => {
    questionRepository.findById.mockResolvedValue(baseQuestion);

    const result = await gamificationService.answerQuestion({
      userId: "user-1",
      speciesId: "species-1",
      questionId: "q1",
      selectedOption: "Incorrecta A",
    });

    expect(result).toEqual({ correct: false, hint: "Piensa de nuevo" });
    expect(userCardRepository.unlock).not.toHaveBeenCalled();
  });

  it("compara la respuesta sin importar mayusculas ni espacios extra", async () => {
    questionRepository.findById.mockResolvedValue(baseQuestion);
    userCardRepository.exists.mockResolvedValue(false);
    speciesService.getSpeciesById.mockResolvedValue({
      id: "species-1",
      rarity: "Común",
    });

    const result = await gamificationService.answerQuestion({
      userId: "user-1",
      speciesId: "species-1",
      questionId: "q1",
      selectedOption: "  correcta  ",
    });

    expect(result.correct).toBe(true);
  });

  it("desbloquea la carta en una respuesta correcta si el usuario no la tenia", async () => {
    questionRepository.findById.mockResolvedValue(baseQuestion);
    userCardRepository.exists.mockResolvedValue(false);
    speciesService.getSpeciesById.mockResolvedValue({
      id: "species-1",
      rarity: "Raro",
    });

    const result = await gamificationService.answerQuestion({
      userId: "user-1",
      speciesId: "species-1",
      questionId: "q1",
      selectedOption: "Correcta",
    });

    expect(userCardRepository.unlock).toHaveBeenCalledWith(
      "user-1",
      "species-1",
    );
    expect(result).toEqual({
      correct: true,
      alreadyOwned: false,
      card: { id: "species-1", rarity: "Raro" },
    });
  });

  it("no duplica la carta si el usuario ya la tenia", async () => {
    questionRepository.findById.mockResolvedValue(baseQuestion);
    userCardRepository.exists.mockResolvedValue(true);
    speciesService.getSpeciesById.mockResolvedValue({
      id: "species-1",
      rarity: "Raro",
    });

    const result = await gamificationService.answerQuestion({
      userId: "user-1",
      speciesId: "species-1",
      questionId: "q1",
      selectedOption: "Correcta",
    });

    expect(userCardRepository.unlock).not.toHaveBeenCalled();
    expect(result.alreadyOwned).toBe(true);
  });
});
