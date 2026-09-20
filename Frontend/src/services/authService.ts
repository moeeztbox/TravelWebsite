import axios, { type AxiosError } from "axios";
import type { AuthUser, LoginPayload, LoginResponse } from "../types/auth";

/**
 * Backend routes live under /api (e.g. GET /api/packages).
 * If NEXT_PUBLIC_API_URL is set to http://localhost:5000 without /api, requests
 * would hit /packages and return 404 — always normalize to end with /api.
 *
 * When NEXT_PUBLIC_API_URL isn't set at all, requests go to the relative
 * "/api" path on this same origin (proxied to the local backend in dev via
 * next.config.ts's rewrites). This intentionally never falls back to a
 * hardcoded localhost URL — in production that would silently point the
 * deployed frontend at a backend that doesn't exist there. Production
 * deployments MUST set NEXT_PUBLIC_API_URL to the real backend URL at build
 * time.
 *
 * In the browser during development, ALWAYS use the relative "/api" path
 * and ignore NEXT_PUBLIC_API_URL, even when it's set to an absolute
 * http://localhost:5000/api. An absolute URL containing "localhost" only
 * resolves to the backend when the browser happens to be on the same PC as
 * the dev server — opening the dev server's "Network" URL (e.g.
 * http://192.168.x.x:3000) from that same PC makes the browser send an
 * Origin the backend's dev CORS allowlist (localhost/127.0.0.1 only)
 * rejects, and from a different LAN device "localhost:5000" would point at
 * that device instead of this one. Routing through next.config.ts's rewrite
 * instead makes the request same-origin (whatever origin loaded the page),
 * so the browser never triggers CORS at all — the Next.js server does the
 * cross-origin hop to the backend itself, server-to-server.
 */
export function resolveApiBase(): string {
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    return "/api";
  }

  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (!raw) {
    return "/api";
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
    delete config.headers["Content-Type"];
    delete config.headers["content-type"];
  }
  return config;
});

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function setSession(token: string, user: AuthUser): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", payload);
  return data;
}

/** User-facing message for failed API calls (network, 404 HTML, JSON body). */
export function formatAxiosError(error: AxiosError): string {
  const data = error.response?.data;
  if (data && typeof data === "object" && "message" in data && data.message) {
    return String(data.message);
  }
  if (typeof data === "string" && data.length > 0 && data.length < 400) {
    const trimmed = data.replace(/\s+/g, " ").trim();
    if (trimmed.startsWith("<!") || trimmed.includes("<!DOCTYPE")) {
      return "Server returned an error page. Is the backend running on port 5000?";
    }
    return trimmed;
  }
  if (!error.response) {
    return "Cannot reach the API. Start the backend (port 5000) and set NEXT_PUBLIC_API_URL=http://localhost:5000/api, then restart the dev server.";
  }
  const status = error.response.status;
  if (status === 404) {
    return "Login API not found (404). Check NEXT_PUBLIC_API_URL ends with /api and the backend exposes POST /api/auth/login.";
  }
  if (status === 401) {
    return "Invalid email or password.";
  }
  return error.response.statusText || "Something went wrong. Please try again.";
}
