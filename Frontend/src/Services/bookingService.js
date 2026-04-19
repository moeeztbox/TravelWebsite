import { api } from "./authService";

export async function createDraftBooking(payload) {
  const { data } = await api.post("/bookings", payload);
  return data;
}

export async function listMyBookings() {
  const { data } = await api.get("/bookings");
  return data;
}

export async function uploadBookingDocuments(bookingId, formData) {
  const { data } = await api.post(`/bookings/${bookingId}/documents`, formData);
  return data;
}

export async function attachCommonDocumentsToBooking(bookingId) {
  const { data } = await api.post(
    `/bookings/${bookingId}/documents/attach-common`
  );
  return data;
}

export async function uploadPaymentReceipt(bookingId, formData) {
  const { data } = await api.post(
    `/bookings/${bookingId}/payment-receipt`,
    formData
  );
  return data;
}

export async function setMyPaymentMethod(bookingId, method) {
  const { data } = await api.patch(`/bookings/${bookingId}/payment-method`, {
    method,
  });
  return data;
}

export async function deleteMyBooking(bookingId) {
  const { data } = await api.delete(`/bookings/${bookingId}`);
  return data;
}

export async function createStripePaymentIntent(bookingId) {
  const { data } = await api.post(
    `/bookings/${bookingId}/stripe/payment-intent`
  );
  return data;
}

export async function confirmStripePayment(bookingId, paymentIntentId) {
  const { data } = await api.post(`/bookings/${bookingId}/stripe/confirm`, {
    paymentIntentId,
  });
  return data;
}
