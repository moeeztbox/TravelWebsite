import { useLayoutEffect } from "react";

/**
 * Prevents the page behind modals from scrolling (including iOS overscroll).
 * Uses position:fixed + saved scrollY; supports nested overlays via ref-counting.
 */
let lockCount = 0;
let savedScrollY = 0;
let locked = false;

let prevBody = {};
let prevHtml = {};
let pendingScrollY = null;
let pendingReleaseRaf = null;

// Capture scrollY synchronously (e.g. in a click handler) so the lock
// doesn't accidentally snapshot 0 after a re-render/focus event.
export function captureScrollPosition() {
  pendingScrollY = window.scrollY || window.pageYOffset || 0;
}

function applyLock() {
  if (pendingReleaseRaf != null) {
    cancelAnimationFrame(pendingReleaseRaf);
    pendingReleaseRaf = null;
  }
  const y =
    typeof pendingScrollY === "number"
      ? pendingScrollY
      : window.scrollY || window.pageYOffset || 0;
  pendingScrollY = null;
  savedScrollY = y;
  prevBody = {
    position: document.body.style.position,
    top: document.body.style.top,
    left: document.body.style.left,
    right: document.body.style.right,
    width: document.body.style.width,
    overflow: document.body.style.overflow,
  };
  prevHtml = {
    overflow: document.documentElement.style.overflow,
    overscrollBehavior: document.documentElement.style.overscrollBehavior,
  };
  document.body.setAttribute("data-scroll-locked", "true");
  document.body.setAttribute("data-scroll-locked-at", String(Date.now()));
  document.body.style.setProperty("--scroll-lock-top", `-${savedScrollY}px`);
  // Keep inline styles too (helps in case CSS isn't loaded yet).
  document.body.style.position = "fixed";
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
  document.documentElement.style.overscrollBehavior = "none";
  locked = true;
}

function releaseLock() {
  if (!locked) return;
  locked = false;
  document.body.style.position = prevBody.position ?? "";
  document.body.style.top = prevBody.top ?? "";
  document.body.style.left = prevBody.left ?? "";
  document.body.style.right = prevBody.right ?? "";
  document.body.style.width = prevBody.width ?? "";
  document.body.style.overflow = prevBody.overflow ?? "";
  document.body.removeAttribute("data-scroll-locked");
  document.body.removeAttribute("data-scroll-locked-at");
  document.body.style.removeProperty("--scroll-lock-top");
  document.documentElement.style.overflow = prevHtml.overflow ?? "";
  document.documentElement.style.overscrollBehavior =
    prevHtml.overscrollBehavior ?? "";
  // If the page has `scroll-behavior: smooth`, a programmatic scrollTo will animate
  // and looks like a "jump" after closing a modal. Force instant restore.
  const prevScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, savedScrollY);
  requestAnimationFrame(() => {
    document.documentElement.style.scrollBehavior = prevScrollBehavior ?? "";
  });
}

export function useScrollLock(active) {
  useLayoutEffect(() => {
    if (!active) return undefined;
    if (lockCount === 0) applyLock();
    lockCount += 1;
    return () => {
      lockCount -= 1;
      if (lockCount <= 0) {
        lockCount = 0;
        // Defer release by one frame so React 18 StrictMode double-invocation
        // doesn't briefly unlock + scrollTo(0, savedScrollY) during remount.
        if (pendingReleaseRaf != null) cancelAnimationFrame(pendingReleaseRaf);
        pendingReleaseRaf = requestAnimationFrame(() => {
          pendingReleaseRaf = null;
          if (lockCount === 0) releaseLock();
        });
      }
    };
  }, [active]);
}

/** Debug/escape hatch: current scroll-lock state. */
export function getScrollLockState() {
  return { lockCount, locked, savedScrollY };
}

/**
 * Escape hatch: forcefully release scroll lock even if ref-count got stuck.
 * Use sparingly — only when you detect the UI should be unlocked but isn't.
 */
export function forceReleaseScrollLock() {
  if (pendingReleaseRaf != null) {
    cancelAnimationFrame(pendingReleaseRaf);
    pendingReleaseRaf = null;
  }
  lockCount = 0;
  releaseLock();
}
