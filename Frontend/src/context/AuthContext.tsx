"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearSession,
  getStoredToken,
  getStoredUser,
  setSession,
} from "../services/authService";
import type { AuthContextValue, AuthUser } from "../types/auth";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getStoredToken();
    const stored = getStoredUser();
    if (token && stored) {
      setUser(stored);
    } else {
      clearSession();
      setUser(null);
    }
    setReady(true);
  }, []);

  const signIn = useCallback((token: string, userPayload: AuthUser) => {
    setSession(token, userPayload);
    setUser(userPayload);
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const updateUser = useCallback((nextUser: AuthUser) => {
    if (!nextUser) return;
    const t = getStoredToken();
    if (t) setSession(t, nextUser);
    setUser(nextUser);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
      updateUser,
    }),
    [user, ready, signIn, signOut, updateUser],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
