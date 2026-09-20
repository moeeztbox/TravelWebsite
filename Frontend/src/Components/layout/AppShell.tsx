"use client";

import { useEffect, useLayoutEffect, useState, Suspense, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Toaster } from "sonner";
import { AuthProvider } from "../../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  forceReleaseScrollLock,
  getScrollLockState,
} from "../../hooks/useScrollLock";

// The browser's own back/forward scroll restoration fights with the scroll-to-top
// reset below (it can reapply the old scroll position after our effect runs),
// which is why navigation sometimes landed mid-page or at the bottom. We own
// scroll position ourselves on every route change, so opt the browser out.
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

function RouteEffects() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Safety net: if any modal left the scroll locked, force-release on navigation.
    forceReleaseScrollLock();
  }, [pathname, searchParams]);

  useLayoutEffect(() => {
    // Keep navigation natural but always land at the top of the new page.
    // If there's a hash, scroll to that section instead.
    // useLayoutEffect (not useEffect) so this runs before the browser paints —
    // otherwise the old page's scroll position can flash briefly on route change.
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace(/^#/, "");
      const el = id ? document.getElementById(id) : null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, searchParams]);

  return null;
}

export default function AppShell({ children }: { children: ReactNode }) {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const done = () => setInitialLoading(false);
    if (document.readyState === "complete") done();
    else window.addEventListener("load", done);
    return () => window.removeEventListener("load", done);
  }, []);

  useEffect(() => {
    // Global safety net: unlock if scroll gets stuck.
    const tryAutoUnlock = () => {
      if (document?.body?.getAttribute("data-scroll-locked") !== "true") return;
      const st = getScrollLockState();
      if (st.lockCount === 0) {
        forceReleaseScrollLock();
        return;
      }
      // If ref-count got stuck > 0 but there is no visible dialog/overlay,
      // prefer unlocking so the site remains usable.
      const hasLikelyModal =
        Boolean(document.querySelector('[data-admin-modal="true"]')) ||
        Boolean(
          document.querySelector('[role="dialog"], [aria-modal="true"]'),
        ) ||
        Boolean(
          document.querySelector(
            ".fixed.inset-0.z-\\[105\\], .fixed.inset-0.z-\\[110\\], .fixed.inset-0.z-\\[100000\\]",
          ),
        );
      const lockedAt =
        Number(document.body.getAttribute("data-scroll-locked-at")) || 0;
      const lockedForMs = lockedAt ? Date.now() - lockedAt : 0;
      // Only override after a short grace window so we don't fight legitimate modal locks.
      if (!hasLikelyModal && lockedForMs > 800) {
        forceReleaseScrollLock();
      }
    };
    const onWheel = () => tryAutoUnlock();
    const onTouchMove = () => tryAutoUnlock();
    const onKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "PageDown" ||
        e.key === "PageUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Home" ||
        e.key === "End" ||
        e.key === " "
      ) {
        tryAutoUnlock();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <AuthProvider>
      <Suspense fallback={null}>
        <RouteEffects />
      </Suspense>

      {initialLoading ? (
        <div className="fixed inset-0 z-[100000] bg-black/35 backdrop-blur-md flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-md border border-white/40 rounded-2xl px-6 py-5 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full border-4 border-[#C9A227]/30 border-t-[#C9A227] animate-spin" />
              <div className="text-sm font-semibold text-gray-800">
                Loading…
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <Navbar />
      {children}
      <Footer />

      <Toaster richColors position="top-center" closeButton />
    </AuthProvider>
  );
}
