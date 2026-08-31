import apiClient from "./client";

export async function getSpeciesList(group) {
  const { data } = await apiClient.get("/species", {
    params: group ? { group } : {},
  });
  return data;
}

export async function getSpeciesQuestions(speciesId) {
  const { data } = await apiClient.get(`/species/${speciesId}/questions`);
  return data;
}

export async function answerSpeciesQuestion(
  speciesId,
  questionId,
  selectedOption,
) {
  const { data } = await apiClient.post(`/species/${speciesId}/answer`, {
    questionId,
    selectedOption,
  });
  return data;
}
