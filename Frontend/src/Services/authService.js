import axios from "axios";

/**
 * Backend routes live under /api (e.g. GET /api/packages).
 * If VITE_API_URL is set to http://localhost:5000 without /api, requests
 * would hit /packages and return 404 — always normalize to end with /api.
 */
export function resolveApiBase() {
  const raw = import.meta.env.VITE_API_URL?.trim();
  if (!raw) {
    return import.meta.env.DEV ? "/api" : "http://localhost:5000/api";
  }
  const noTrailing = raw.replace(/\/+$/, "");
  if (noTrailing.endsWith("/api")) return noTrailing;
  if (/^https?:\/\//i.test(noTrailing)) return `${noTrailing}/api`;
  return noTrailing === "/api" ? "/api" : noTrailing;
}

const baseURL = resolveApiBase();

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const t = getStoredToken();
  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  // Let the browser set proper multipart boundaries for FormData.
  if (config.data instanceof FormData) {
    if (!config.headers) config.headers = {};
    delete config.headers["Content-Type"];
    delete config.headers["content-type"];
  }
  return config;
});

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function getStoredToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getStoredUser() {
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setSession(token, user) {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export async function register(payload) {
  const { data } = await api.post("/auth/register", payload);
  return data;
}

export async function login(payload) {
  const { data } = await api.post("/auth/login", payload);
  return data;
}

export async function fetchMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

export async function updateProfile(payload) {
  const { data } = await api.patch("/auth/profile", payload);
  return data;
}

/** User-facing message for failed API calls (network, 404 HTML, JSON body). */
export function formatAxiosError(error) {
  const data = error.response?.data;
  if (data && typeof data === "object" && data.message) {
    return data.message;
  }
  if (typeof data === "string" && data.length > 0 && data.length < 400) {
    const trimmed = data.replace(/\s+/g, " ").trim();
    if (trimmed.startsWith("<!") || trimmed.includes("<!DOCTYPE")) {
      return "Server returned an error page. Is the backend running on port 5000?";
    }
    return trimmed;
  }
  if (!error.response) {
    return "Cannot reach the API. Start the backend (port 5000) and set VITE_API_URL=http://localhost:5000/api, then restart Vite.";
  }
  const status = error.response.status;
  if (status === 404) {
    return "Login API not found (404). Check VITE_API_URL ends with /api and the backend exposes POST /api/auth/login.";
  }
  if (status === 401) {
    return "Invalid email or password.";
  }
  return (
    error.response.statusText ||
    "Something went wrong. Please try again."
  );
}
