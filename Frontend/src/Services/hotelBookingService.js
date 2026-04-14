import { api } from "../Services/authService";

export async function createHotelBooking(payload) {
  const { data } = await api.post("/hotels/bookings", payload);
  return data.booking;
}

export async function listMyHotelBookings() {
  const { data } = await api.get("/hotels/bookings/me");
  return data.bookings ?? [];
}

export async function setHotelPaymentMethod(bookingId, method) {
  const { data } = await api.patch(
    `/hotels/bookings/${encodeURIComponent(bookingId)}/payment-method`,
    { method }
  );
  return data.booking;
}

export async function uploadHotelPaymentReceipt(bookingId, formData) {
  const { data } = await api.post(
    `/hotels/bookings/${encodeURIComponent(bookingId)}/payment-receipt`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data.booking;
}

export async function dismissHotelBooking(bookingId) {
  const { data } = await api.delete(
    `/hotels/bookings/${encodeURIComponent(bookingId)}`
  );
  return data;
}

export async function createHotelStripePaymentIntent(bookingId) {
  const { data } = await api.post(
    `/hotels/bookings/${encodeURIComponent(bookingId)}/stripe/payment-intent`
  );
  return data;
}

export async function confirmHotelStripePayment(bookingId, paymentIntentId) {
  const { data } = await api.post(
    `/hotels/bookings/${encodeURIComponent(bookingId)}/stripe/confirm`,
    { paymentIntentId }
  );
  return data.booking;
}

