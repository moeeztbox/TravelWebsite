"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Exposed on window so other components (e.g. admin package modals) can
// pause/resume smooth scroll via window.__lenis while a modal is open.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export default function LenisInit() {
  useEffect(() => {
    const lenis = new Lenis({ autoRaf: true });
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
