import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { createDraftBooking } from "../Services/bookingService";

function bookingErrorMessage(err) {
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;
    const data = err.response?.data;
    if (typeof data === "string" && data.trim()) {
      return data.length > 180 ? `${data.slice(0, 180)}…` : data;
    }
    if (data?.message) return data.message;
    if (Array.isArray(data?.errors) && data.errors[0]?.msg) {
      return data.errors[0].msg;
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
      return "Cannot reach the API. Open a terminal, run: cd Backend && npm run dev — then restart the Vite dev server.";
    }
  }
  return err?.message || "Could not save booking. Try again.";
}

/** Normalize home / featured / packages card objects into API payload */
export function toBookingPayload(pkg, opts = {}) {
  const journeyStages = Array.isArray(opts?.journeyStages)
    ? opts.journeyStages
    : [];
  const packageId =
    pkg.packageId ||
    (pkg.id != null ? String(pkg.id) : pkg.title?.toLowerCase().replace(/\s+/g, "-")) ||
    "package";
  return {
    packageId,
    packageTitle: pkg.title || pkg.packageTitle || "Package",
    packageSubtitle: pkg.subtitle || pkg.packageSubtitle || "",
    packagePrice: pkg.price || pkg.packagePrice || "",
    packageDuration: pkg.duration || pkg.days || pkg.packageDuration || "",
    packageImage: pkg.image || pkg.packageImage || "",
    badge: pkg.badge || "",
    ...(journeyStages.length ? { journeyStages } : {}),
  };
}

export function usePackageBooking() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const promptLoginForBooking = useCallback(() => {
    toast.error("Please log in to book a package.", {
      description: "Sign in or create an account to continue.",
      duration: 5000,
      action: {
        label: "Log in",
        onClick: () => navigate("/login", { state: { from: { pathname: "/packages" } } }),
      },
    });
  }, [navigate]);

  /** Hero / CTA: guest → toast; logged-in → packages section */
  const goToPackagesOrPromptLogin = useCallback(() => {
    if (!isAuthenticated) {
      promptLoginForBooking();
      return;
    }
    navigate("/packages");
  }, [isAuthenticated, navigate, promptLoginForBooking]);

  const bookPackage = useCallback(
    async (pkg, opts = {}) => {
      const { redirectToDashboard = true, journeyStages } = opts || {};
      if (!isAuthenticated) {
        promptLoginForBooking();
        return;
      }
      try {
        const payload = toBookingPayload(pkg, { journeyStages });
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
          navigate("/dashboard");
        }
      } catch (err) {
        toast.error(bookingErrorMessage(err));
      }
    },
    [isAuthenticated, navigate, promptLoginForBooking]
  );

  return { bookPackage, goToPackagesOrPromptLogin, promptLoginForBooking };
}
