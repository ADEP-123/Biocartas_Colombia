import apiClient from "./client";

export async function getMyCollection() {
  const { data } = await apiClient.get("/collection");
  return data;
}
