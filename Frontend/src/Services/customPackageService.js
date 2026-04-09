import { api } from "./authService";

export async function createCustomPackageRequest(payload) {
  const { data } = await api.post("/custom-packages", payload);
  return data.request;
}

export async function listMyCustomPackageRequests() {
  const { data } = await api.get("/custom-packages/me");
  return data.requests ?? [];
}

export async function acceptCustomPackageRequest(id) {
  const { data } = await api.post(`/custom-packages/${id}/accept`);
  return data;
}

