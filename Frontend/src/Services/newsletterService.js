import { api } from "./authService";

export async function newsletterStatus(email) {
  const { data } = await api.get("/newsletter/status", { params: { email } });
  return data;
}

export async function subscribeNewsletter(email) {
  const { data } = await api.post("/newsletter/subscribe", { email });
  return data;
}

export async function unsubscribeNewsletter(email) {
  const { data } = await api.post("/newsletter/unsubscribe", { email });
  return data;
}

