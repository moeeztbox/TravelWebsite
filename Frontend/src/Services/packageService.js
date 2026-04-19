import { api } from "./authService";

export async function fetchPackages() {
  const { data } = await api.get("/packages");
  return data.packages ?? [];
}
