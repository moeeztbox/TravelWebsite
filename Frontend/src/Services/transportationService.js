import { api } from "./authService";

export async function getTransportationOptions() {
  const { data } = await api.get("/transportation/options");
  return data.options ?? [];
}

export async function createTransportationBooking(payload) {
  const { data } = await api.post("/transportation/bookings", payload);
  return data.booking;
}

export async function listMyTransportationBookings() {
  const { data } = await api.get("/transportation/bookings/me");
  return data.bookings ?? [];
}

export async function setTransportPaymentMethod(bookingId, method) {
  const { data } = await api.patch(
    `/transportation/bookings/${bookingId}/payment-method`,
    { method }
  );
  return data.booking;
}

export async function uploadTransportPaymentReceipt(bookingId, formData) {
  const { data } = await api.post(
    `/transportation/bookings/${bookingId}/payment-receipt`,
    formData
  );
  return data.booking;
}

export async function dismissTransportationBooking(bookingId) {
  const { data } = await api.delete(`/transportation/bookings/${bookingId}`);
  return data;
}

export async function createTransportStripePaymentIntent(bookingId) {
  const { data } = await api.post(
    `/transportation/bookings/${bookingId}/stripe/payment-intent`
  );
  return data;
}

export async function confirmTransportStripePayment(bookingId, paymentIntentId) {
  const { data } = await api.post(
    `/transportation/bookings/${bookingId}/stripe/confirm`,
    { paymentIntentId }
  );
  return data;
}
