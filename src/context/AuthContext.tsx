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
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { getClientAuth, isFirebaseConfigured } from "@/lib/firebase";

const AUTH_NOT_CONFIGURED =
  "Firebase is not configured. Add your keys to .env.local (see .env.example), then restart the dev server.";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configured: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = isFirebaseConfigured();

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const requireAuth = useCallback(() => {
    const auth = getClientAuth();
    if (!auth) throw new Error(AUTH_NOT_CONFIGURED);
    return auth;
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(requireAuth(), email, password);
    },
    [requireAuth],
  );

  const register = useCallback(
    async (email: string, password: string) => {
      await createUserWithEmailAndPassword(requireAuth(), email, password);
    },
    [requireAuth],
  );

  const loginWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(requireAuth(), provider);
  }, [requireAuth]);

  const logout = useCallback(async () => {
    await signOut(requireAuth());
  }, [requireAuth]);

  const value = useMemo(
    () => ({
      user,
      loading,
      configured,
      login,
      register,
      loginWithGoogle,
      logout,
    }),
    [user, loading, configured, login, register, loginWithGoogle, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
