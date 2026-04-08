import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  clearSession,
  getStoredToken,
  getStoredUser,
  setSession,
} from "../Services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
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

  const signIn = useCallback((token, userPayload) => {
    setSession(token, userPayload);
    setUser(userPayload);
  }, []);

  const signOut = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const updateUser = useCallback((nextUser) => {
    if (!nextUser) return;
    const t = getStoredToken();
    if (t) setSession(t, nextUser);
    setUser(nextUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
      updateUser,
    }),
    [user, ready, signIn, signOut, updateUser]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
