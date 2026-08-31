import apiClient from "./client";

export async function getMyCollection() {
  const { data } = await apiClient.get("/collection");
  return data;
}

export async function getMyProgress() {
  const { data } = await apiClient.get("/collection/progress");
  return data;
}

export async function getMyAchievements() {
  const { data } = await apiClient.get("/collection/achievements");
  return data;
}
