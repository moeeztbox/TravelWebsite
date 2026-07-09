import { api } from "./authService";

export async function submitReview(payload) {
  const { data } = await api.post("/reviews", payload);
  return data;
}

export async function fetchApprovedReviews() {
  const { data } = await api.get("/reviews/approved");
  return data.reviews ?? [];
}
