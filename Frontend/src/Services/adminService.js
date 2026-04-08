import { api } from "./authService";

export async function adminCreatePackage(payload) {
  const { data } = await api.post("/packages", payload);
  return data.package;
}

export async function adminUpdatePackage(packageId, payload) {
  const { data } = await api.patch(
    `/packages/${encodeURIComponent(packageId)}`,
    payload
  );
  return data.package;
}

export async function adminDeletePackage(packageId) {
  await api.delete(`/packages/${encodeURIComponent(packageId)}`);
}

export async function adminListBookings(status = "pending") {
  const { data } = await api.get("/admin/bookings", {
    params: { status },
  });
  return data.bookings ?? [];
}

export async function adminSetBookingStatus(id, status) {
  const { data } = await api.patch(`/admin/bookings/${id}`, { status });
  return data.booking;
}

export async function adminSetPaymentStatus(id, status) {
  const { data } = await api.patch(`/admin/bookings/${id}/payment`, {
    status,
  });
  return data.booking;
}

export async function adminScheduleJourney(id, startAt) {
  const { data } = await api.patch(`/admin/bookings/${id}/journey`, {
    startAt,
  });
  return data.booking;
}

export async function adminSetJourneyStage(id, stage) {
  const { data } = await api.patch(`/admin/bookings/${id}/journey-stage`, {
    stage,
  });
  return data.booking;
}
