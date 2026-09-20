import { api } from "../services/authService";
import type { Package, PackageWritePayload, BookingPayload } from "../types/package";
import type { Review, ReviewStatus } from "../types/review";
import type { ApiMessageResponse } from "../types/api";

export async function adminCreatePackage(
  payload: PackageWritePayload,
): Promise<Package> {
  const { data } = await api.post<{ package: Package }>("/packages", payload);
  return data.package;
}

export async function adminUpdatePackage(
  packageId: string,
  payload: Partial<PackageWritePayload>,
): Promise<Package> {
  const { data } = await api.patch<{ package: Package }>(
    `/packages/${encodeURIComponent(packageId)}`,
    payload,
  );
  return data.package;
}

export async function adminDeletePackage(packageId: string): Promise<void> {
  await api.delete(`/packages/${encodeURIComponent(packageId)}`);
}

export async function adminListPackages(): Promise<Package[]> {
  const { data } = await api.get<{ packages: Package[] }>("/admin/packages");
  return data.packages ?? [];
}

/**
 * The following admin-booking / transportation / visa / hotel functions have
 * no backing Backend route or model today (confirmed repo-wide — the Backend
 * only implements Package, Review, and Newsletter resources). They're kept
 * as-is per the "preserve existing behavior, don't invent new backend
 * features" migration rule, typed honestly with an unconfirmed/loose shape
 * rather than a fabricated precise interface, since nothing downstream
 * consumes their return values (no UI currently calls them).
 */
export interface AdminEntityLike {
  _id?: string;
  status?: string;
  [key: string]: unknown;
}

export async function adminListBookings(
  status: string = "pending",
): Promise<AdminEntityLike[]> {
  const { data } = await api.get<{ bookings: AdminEntityLike[] }>(
    "/admin/bookings",
    { params: { status } },
  );
  return data.bookings ?? [];
}

export async function adminSetBookingStatus(
  id: string,
  status: string,
  reason: string = "",
): Promise<AdminEntityLike> {
  const cleaned = String(reason || "").trim();
  const { data } = await api.patch<{ booking: AdminEntityLike }>(
    `/admin/bookings/${id}`,
    { status, ...(cleaned ? { reason: cleaned } : {}) },
  );
  return data.booking;
}

/** Creates a draft package booking for the signed-in user (dashboard flow). */
export async function createDraftBooking(
  payload: BookingPayload,
): Promise<ApiMessageResponse> {
  const { data } = await api.post<ApiMessageResponse>("/bookings", payload);
  return data;
}

export async function adminDeleteBooking(
  id: string,
): Promise<ApiMessageResponse> {
  const { data } = await api.delete<ApiMessageResponse>(`/admin/bookings/${id}`);
  return data;
}

export async function adminSetPaymentStatus(
  id: string,
  status: string,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ booking: AdminEntityLike }>(
    `/admin/bookings/${id}/payment`,
    { status },
  );
  return data.booking;
}

/** `middlePlan` — stages between scheduled and completed (e.g. flight_takeoff … return_flight) */
export async function adminScheduleJourney(
  id: string,
  startAt: string,
  middlePlan: string[] = [],
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ booking: AdminEntityLike }>(
    `/admin/bookings/${id}/journey`,
    { startAt, plan: Array.isArray(middlePlan) ? middlePlan : [] },
  );
  return data.booking;
}

export async function adminSetJourneyStage(
  id: string,
  stage: string,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ booking: AdminEntityLike }>(
    `/admin/bookings/${id}/journey-stage`,
    { stage },
  );
  return data.booking;
}

export async function adminListTransportationBookings(
  status: string = "all",
): Promise<AdminEntityLike[]> {
  const { data } = await api.get<{ bookings: AdminEntityLike[] }>(
    "/admin/transportation-bookings",
    { params: { status } },
  );
  return data.bookings ?? [];
}

export async function adminSetTransportationStatus(
  id: string,
  status: string,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ booking: AdminEntityLike }>(
    `/admin/transportation-bookings/${id}`,
    { status },
  );
  return data.booking;
}

export async function adminSetTransportationPaymentStatus(
  id: string,
  status: string,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ booking: AdminEntityLike }>(
    `/admin/transportation-bookings/${id}/payment`,
    { status },
  );
  return data.booking;
}

export async function adminDeleteTransportationBooking(
  id: string,
): Promise<ApiMessageResponse> {
  const { data } = await api.delete<ApiMessageResponse>(
    `/admin/transportation-bookings/${id}`,
  );
  return data;
}

export async function adminListVisaRequests(
  status: string = "all",
): Promise<AdminEntityLike[]> {
  const { data } = await api.get<{ visaRequests: AdminEntityLike[] }>(
    "/admin/visa-requests",
    { params: { status } },
  );
  return data.visaRequests ?? [];
}

export async function adminSetVisaRequestStatus(
  id: string,
  status: string,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ visaRequest: AdminEntityLike }>(
    `/admin/visa-requests/${id}`,
    { status },
  );
  return data.visaRequest;
}

export async function adminSetVisaPaymentStatus(
  id: string,
  status: string,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ visaRequest: AdminEntityLike }>(
    `/admin/visa-requests/${id}/payment`,
    { status },
  );
  return data.visaRequest;
}

export async function adminDeleteVisaRequest(
  id: string,
): Promise<ApiMessageResponse> {
  const { data } = await api.delete<ApiMessageResponse>(
    `/admin/visa-requests/${id}`,
  );
  return data;
}

/** Catalog options (transportation & visa booking forms) */
export async function adminListTransportationOptionsCatalog(): Promise<
  AdminEntityLike[]
> {
  const { data } = await api.get<{ options: AdminEntityLike[] }>(
    "/admin/transportation-options",
  );
  return data.options ?? [];
}

export async function adminCreateTransportationOption(
  payload: Record<string, unknown>,
): Promise<AdminEntityLike> {
  const { data } = await api.post<{ option: AdminEntityLike }>(
    "/admin/transportation-options",
    payload,
  );
  return data.option;
}

export async function adminUpdateTransportationOption(
  id: string,
  payload: Record<string, unknown>,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ option: AdminEntityLike }>(
    `/admin/transportation-options/${encodeURIComponent(id)}`,
    payload,
  );
  return data.option;
}

export async function adminDeleteTransportationOption(
  id: string,
): Promise<void> {
  await api.delete(`/admin/transportation-options/${encodeURIComponent(id)}`);
}

export async function adminListVisaOptionsCatalog(): Promise<
  AdminEntityLike[]
> {
  const { data } = await api.get<{ options: AdminEntityLike[] }>(
    "/admin/visa-options",
  );
  return data.options ?? [];
}

export async function adminCreateVisaOption(
  payload: Record<string, unknown>,
): Promise<AdminEntityLike> {
  const { data } = await api.post<{ option: AdminEntityLike }>(
    "/admin/visa-options",
    payload,
  );
  return data.option;
}

export async function adminUpdateVisaOption(
  id: string,
  payload: Record<string, unknown>,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ option: AdminEntityLike }>(
    `/admin/visa-options/${encodeURIComponent(id)}`,
    payload,
  );
  return data.option;
}

export async function adminDeleteVisaOption(id: string): Promise<void> {
  await api.delete(`/admin/visa-options/${encodeURIComponent(id)}`);
}

/** Hotel bookings (admin) */
export async function adminListHotelBookings(
  status: string = "all",
): Promise<AdminEntityLike[]> {
  const { data } = await api.get<{ bookings: AdminEntityLike[] }>(
    "/admin/hotel-bookings",
    { params: { status } },
  );
  return data.bookings ?? [];
}

export async function adminSetHotelBookingStatus(
  id: string,
  status: string,
  adminTotal?: string | Record<string, unknown>,
): Promise<AdminEntityLike> {
  const reason = typeof adminTotal === "string" ? adminTotal : "";
  const maybeTotal =
    adminTotal && typeof adminTotal === "object" ? adminTotal : null;
  const { data } = await api.patch<{ booking: AdminEntityLike }>(
    `/admin/hotel-bookings/${id}`,
    {
      status,
      ...(reason ? { reason } : {}),
      ...(maybeTotal ? { adminTotal: maybeTotal } : {}),
    },
  );
  return data.booking;
}

export async function adminSetHotelPaymentStatus(
  id: string,
  status: string,
): Promise<AdminEntityLike> {
  const { data } = await api.patch<{ booking: AdminEntityLike }>(
    `/admin/hotel-bookings/${id}/payment`,
    { status },
  );
  return data.booking;
}

export async function adminDeleteHotelBooking(
  id: string,
): Promise<ApiMessageResponse> {
  const { data } = await api.delete<ApiMessageResponse>(
    `/admin/hotel-bookings/${id}`,
  );
  return data;
}

/** Reviews (admin) */
export async function adminListReviews(): Promise<Review[]> {
  const { data } = await api.get<{ reviews: Review[] }>("/reviews/admin/all");
  return data.reviews ?? [];
}

export async function adminSetReviewStatus(
  id: string,
  status: ReviewStatus,
): Promise<Review> {
  const { data } = await api.patch<{ review: Review }>(
    `/reviews/admin/${id}`,
    { status },
  );
  return data.review;
}

export async function adminDeleteReview(
  id: string,
): Promise<ApiMessageResponse> {
  const { data } = await api.delete<ApiMessageResponse>(`/reviews/admin/${id}`);
  return data;
}
