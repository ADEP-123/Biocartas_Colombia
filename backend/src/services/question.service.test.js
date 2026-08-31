jest.mock("../repositories/question.repository");
const questionRepository = require("../repositories/question.repository");
const questionService = require("./question.service");

describe("question.service.getPublicQuestionsBySpecies", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("nunca expone correctOptionIndex al llamador", async () => {
    questionRepository.findBySpecies.mockResolvedValue([
      {
        id: "q1",
        prompt: "¿Pregunta?",
        options: ["A", "B", "C", "D"],
        correctOptionIndex: 2,
        hint: "una pista",
      },
    ]);

    const result =
      await questionService.getPublicQuestionsBySpecies("species-1");

    expect(result[0]).not.toHaveProperty("correctOptionIndex");
  });

  it("conserva el mismo conjunto de opciones, solo reordenadas", async () => {
    const options = ["A", "B", "C", "D"];
    questionRepository.findBySpecies.mockResolvedValue([
      {
        id: "q1",
        prompt: "¿Pregunta?",
        options,
        correctOptionIndex: 0,
        hint: "x",
      },
    ]);

    const result =
      await questionService.getPublicQuestionsBySpecies("species-1");

    expect(result[0].options.slice().sort()).toEqual(options.slice().sort());
  });
});
