const shuffleArray = require("./shuffle");

describe("shuffleArray", () => {
  it("devuelve un arreglo con los mismos elementos, posiblemente reordenados", () => {
    const input = ["a", "b", "c", "d"];
    const result = shuffleArray(input);
    expect(result).toHaveLength(input.length);
    expect(result.slice().sort()).toEqual(input.slice().sort());
  });

  it("no modifica el arreglo original", () => {
    const input = ["a", "b", "c"];
    const copy = [...input];
    shuffleArray(input);
    expect(input).toEqual(copy);
  });

  it("maneja un arreglo vacío", () => {
    expect(shuffleArray([])).toEqual([]);
  });

  it("maneja un arreglo de un solo elemento", () => {
    expect(shuffleArray(["unico"])).toEqual(["unico"]);
  });
});
