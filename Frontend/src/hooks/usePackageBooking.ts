"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { createDraftBooking } from "../services/adminService";
import type { ApiErrorPayload } from "../types/api";
import type { BookingPayload, PackageLike } from "../types/package";

function bookingErrorMessage(err: unknown): string {
  if (axios.isAxiosError<ApiErrorPayload | string>(err)) {
    const status = err.response?.status;
    const data = err.response?.data;
    if (typeof data === "string" && data.trim()) {
      return data.length > 180 ? `${data.slice(0, 180)}…` : data;
    }
    if (data && typeof data === "object") {
      if (data.message) return data.message;
      if (Array.isArray(data.errors) && data.errors[0]?.msg) {
        return data.errors[0].msg;
      }
    }
    if (status === 401) {
      return "Session expired or not logged in. Please log in again.";
    }
    if (status === 502 || status === 503) {
      return "API server is not responding. Start it from the Backend folder: npm run dev";
    }
    if (status) {
      return `Booking failed (HTTP ${status}). Check that the backend is running on port 5000.`;
    }
    if (
      err.code === "ERR_NETWORK" ||
      err.code === "ECONNREFUSED" ||
      err.message?.includes("Network Error")
    ) {
      return "Cannot reach the API. Open a terminal, run: cd Backend && npm run dev — then restart the dev server.";
    }
  }
  return err instanceof Error
    ? err.message
    : "Could not save booking. Try again.";
}

/** Normalize home / featured / packages card objects into API payload */
export function toBookingPayload(pkg: PackageLike): BookingPayload {
  const packageId =
    pkg.packageId ||
    (pkg.id != null
      ? String(pkg.id)
      : pkg.title?.toLowerCase().replace(/\s+/g, "-")) ||
    "package";
  return {
    packageId,
    packageTitle: pkg.title || pkg.packageTitle || "Package",
    packageSubtitle: pkg.subtitle || pkg.packageSubtitle || "",
    packagePrice: pkg.price || pkg.packagePrice || "",
    packageDuration: pkg.duration || pkg.days || pkg.packageDuration || "",
    packageImage: pkg.image || pkg.packageImage || "",
    badge: pkg.badge || "",
  };
}

export interface BookPackageOptions {
  redirectToDashboard?: boolean;
}

export function usePackageBooking() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const promptLoginForBooking = useCallback(() => {
    toast.error("Please log in to book a package.", {
      description: "Sign in or create an account to continue.",
      duration: 5000,
      action: {
        label: "Log in",
        onClick: () => router.push("/login?from=%2Fpackages"),
      },
    });
  }, [router]);

  /** Hero / CTA: guest → toast; logged-in → packages section */
  const goToPackagesOrPromptLogin = useCallback(() => {
    if (!isAuthenticated) {
      promptLoginForBooking();
      return;
    }
    router.push("/packages");
  }, [isAuthenticated, router, promptLoginForBooking]);

  const bookPackage = useCallback(
    async (pkg: PackageLike, opts: BookPackageOptions = {}) => {
      const { redirectToDashboard = true } = opts || {};
      if (!isAuthenticated) {
        promptLoginForBooking();
        return;
      }
      try {
        const payload = toBookingPayload(pkg);
        const res = await createDraftBooking(payload);
        if (res?.message?.toLowerCase().includes("already")) {
          toast.info("Already in your drafts", {
            description: "This package is already pending approval.",
          });
        } else {
          toast.success("Package added to your draft bookings", {
            description: "Pending admin approval. View it on your dashboard.",
          });
        }
        if (redirectToDashboard) {
          router.push("/dashboard");
        }
      } catch (err) {
        toast.error(bookingErrorMessage(err));
      }
    },
    [isAuthenticated, router, promptLoginForBooking],
  );

  return { bookPackage, goToPackagesOrPromptLogin, promptLoginForBooking };
}
