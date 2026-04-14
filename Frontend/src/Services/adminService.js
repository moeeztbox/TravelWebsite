import { api } from "../Services/authService";

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

export async function adminListPackages() {
  const { data } = await api.get("/admin/packages");
  return data.packages ?? [];
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

export async function adminDeleteBooking(id) {
  const { data } = await api.delete(`/admin/bookings/${id}`);
  return data;
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

export async function adminListTransportationBookings(status = "all") {
  const { data } = await api.get("/admin/transportation-bookings", {
    params: { status },
  });
  return data.bookings ?? [];
}

export async function adminSetTransportationStatus(id, status) {
  const { data } = await api.patch(`/admin/transportation-bookings/${id}`, {
    status,
  });
  return data.booking;
}

export async function adminSetTransportationPaymentStatus(id, status) {
  const { data } = await api.patch(
    `/admin/transportation-bookings/${id}/payment`,
    { status }
  );
  return data.booking;
}

export async function adminListVisaRequests(status = "all") {
  const { data } = await api.get("/admin/visa-requests", {
    params: { status },
  });
  return data.visaRequests ?? [];
}

export async function adminSetVisaRequestStatus(id, status) {
  const { data } = await api.patch(`/admin/visa-requests/${id}`, { status });
  return data.visaRequest;
}

export async function adminSetVisaPaymentStatus(id, status) {
  const { data } = await api.patch(`/admin/visa-requests/${id}/payment`, {
    status,
  });
  return data.visaRequest;
}

/** Catalog options (transportation & visa booking forms) */
export async function adminListTransportationOptionsCatalog() {
  const { data } = await api.get("/admin/transportation-options");
  return data.options ?? [];
}

export async function adminCreateTransportationOption(payload) {
  const { data } = await api.post("/admin/transportation-options", payload);
  return data.option;
}

export async function adminUpdateTransportationOption(id, payload) {
  const { data } = await api.patch(
    `/admin/transportation-options/${encodeURIComponent(id)}`,
    payload
  );
  return data.option;
}

export async function adminDeleteTransportationOption(id) {
  await api.delete(`/admin/transportation-options/${encodeURIComponent(id)}`);
}

export async function adminListVisaOptionsCatalog() {
  const { data } = await api.get("/admin/visa-options");
  return data.options ?? [];
}

export async function adminCreateVisaOption(payload) {
  const { data } = await api.post("/admin/visa-options", payload);
  return data.option;
}

export async function adminUpdateVisaOption(id, payload) {
  const { data } = await api.patch(
    `/admin/visa-options/${encodeURIComponent(id)}`,
    payload
  );
  return data.option;
}

export async function adminDeleteVisaOption(id) {
  await api.delete(`/admin/visa-options/${encodeURIComponent(id)}`);
}

/** Hotel bookings (admin) */
export async function adminListHotelBookings(status = "all") {
  const { data } = await api.get("/admin/hotel-bookings", { params: { status } });
  return data.bookings ?? [];
}

export async function adminSetHotelBookingStatus(id, status, adminTotal) {
  const { data } = await api.patch(`/admin/hotel-bookings/${id}`, {
    status,
    ...(adminTotal ? { adminTotal } : {}),
  });
  return data.booking;
}

export async function adminSetHotelPaymentStatus(id, status) {
  const { data } = await api.patch(`/admin/hotel-bookings/${id}/payment`, {
    status,
  });
  return data.booking;
}
