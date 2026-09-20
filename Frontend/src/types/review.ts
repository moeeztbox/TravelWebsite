export type ReviewStatus = "Pending" | "Approved" | "Rejected";

/** Matches Backend/models/reviewModel.js. */
export interface Review {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  review: string;
  rating: number;
  status: ReviewStatus;
  createdAt?: string;
  updatedAt?: string;
}

/** Body accepted by POST /api/reviews. */
export interface ReviewSubmitPayload {
  fullName: string;
  email: string;
  phone: string;
  review: string;
  rating: number;
}
