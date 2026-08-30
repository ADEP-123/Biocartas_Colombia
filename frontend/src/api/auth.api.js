import apiClient from "./client";

export async function loginRequest(email, password) {
  const { data } = await apiClient.post("/auth/login", { email, password });
  return data;
}

export async function registerRequest(name, email, password) {
  const { data } = await apiClient.post("/auth/register", {
    name,
    email,
    password,
  });
  return data;
}

export async function getMeRequest() {
  const { data } = await apiClient.get("/auth/me");
  return data;
}
