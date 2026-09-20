import { api } from "./authService";
import type { Review, ReviewSubmitPayload } from "../types/review";
import type { ApiMessageResponse } from "../types/api";

export async function submitReview(
  payload: ReviewSubmitPayload,
): Promise<ApiMessageResponse & { review: Review }> {
  const { data } = await api.post<ApiMessageResponse & { review: Review }>(
    "/reviews",
    payload,
  );
  return data;
}

export async function fetchApprovedReviews(): Promise<Review[]> {
  const { data } = await api.get<{ reviews: Review[] }>("/reviews/approved");
  return data.reviews ?? [];
}
