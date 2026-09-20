/**
 * The Backend has a single hardcoded admin account (no User collection) —
 * login always returns `{ email, role: "isAdmin" }`. `_id`/`bitmojiIndex`
 * are never actually sent by the Backend but are read defensively by
 * `Navbar.tsx`'s avatar logic, so they stay optional here rather than
 * pretending the Backend guarantees them.
 */
export interface AuthUser {
  email: string;
  role: "isAdmin";
  _id?: string;
  bitmojiIndex?: number;
}

export interface AuthContextValue {
  user: AuthUser | null;
  ready: boolean;
  isAuthenticated: boolean;
  signIn: (token: string, user: AuthUser) => void;
  signOut: () => void;
  updateUser: (nextUser: AuthUser) => void;
}

/** Body accepted by POST /api/auth/login. */
export interface LoginPayload {
  email: string;
  password: string;
}

/** Response from POST /api/auth/login. */
export interface LoginResponse {
  message: string;
  token: string;
  user: AuthUser;
}
