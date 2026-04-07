import axios from "axios";
import { resolveApiBase } from "./authService";

const baseURL = resolveApiBase();

export const ADMIN_TOKEN_KEY = "admin_token";
export const ADMIN_USER_KEY = "admin_user";

export const adminApi = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

adminApi.interceptors.request.use((config) => {
  const t = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

export function getStoredAdminToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminSession(token, admin) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_USER_KEY);
}

export async function adminLogin(payload) {
  const { data } = await adminApi.post("/admin/login", payload);
  return data;
}

export async function adminCreatePackage(payload) {
  const { data } = await adminApi.post("/packages", payload);
  return data.package;
}

export async function adminUpdatePackage(packageId, payload) {
  const { data } = await adminApi.patch(
    `/packages/${encodeURIComponent(packageId)}`,
    payload
  );
  return data.package;
}

export async function adminDeletePackage(packageId) {
  await adminApi.delete(`/packages/${encodeURIComponent(packageId)}`);
}

export async function adminListBookings(status = "pending") {
  const { data } = await adminApi.get("/admin/bookings", {
    params: { status },
  });
  return data.bookings ?? [];
}

export async function adminSetBookingStatus(id, status) {
  const { data } = await adminApi.patch(`/admin/bookings/${id}`, { status });
  return data.booking;
}

export async function adminSetPaymentStatus(id, status) {
  const { data } = await adminApi.patch(`/admin/bookings/${id}/payment`, {
    status,
  });
  return data.booking;
}

export async function adminScheduleJourney(id, startAt) {
  const { data } = await adminApi.patch(`/admin/bookings/${id}/journey`, {
    startAt,
  });
  return data.booking;
}

export async function adminSetJourneyStage(id, stage) {
  const { data } = await adminApi.patch(`/admin/bookings/${id}/journey-stage`, {
    stage,
  });
  return data.booking;
}
