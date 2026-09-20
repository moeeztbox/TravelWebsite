"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { ready, isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated) {
      router.replace(`/login?from=${encodeURIComponent(pathname)}`);
      return;
    }
    if (user?.role !== "isAdmin") {
      router.replace("/");
    }
  }, [ready, isAuthenticated, user, pathname, router]);

  if (!ready || !isAuthenticated || user?.role !== "isAdmin") return null;

  return children;
}
