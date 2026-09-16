"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AUTH_EXPIRED_EVENT, fetchUrl } from "@/lib/fetchUrl";
import { setClientToken } from "@/lib/apiToken";
import { USER_CACHE_COOKIE } from "@/lib/userCache";

export interface AuthUser {
  name: string;
  email: string;
  phone?: string;
  avatar?: string | null;
  role?: string;
}

interface RegisterPayload {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
}

interface UserContextType {
  user: AuthUser | null;
  isLogin: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  signup: (data: RegisterPayload) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshSession: () => Promise<void>;
  updateUser: (patch: Partial<AuthUser>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const toAuthUser = (dbUser: any): AuthUser => ({
  name: dbUser.fullName,
  email: dbUser.email,
  phone: dbUser.phone,
  avatar: dbUser.avatar?.url ?? null,
  role: dbUser.role,
});

// Writes only non-sensitive display fields (never the access token) to a
// plain cookie so the *server* can read it on the next request (see
// src/app/layout.tsx) and render the logged-in navbar/home variant on the
// very first HTML response. A localStorage-only cache can't do this — the
// browser paints server-rendered markup before any client JS runs, so by
// the time JS could "fix" the UI from localStorage, the flash already
// happened. The actual session is still independently validated below via
// /auth/refresh-token; this cookie is a UI hint only.
const writeCachedUser = (authUser: AuthUser | null) => {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; secure" : "";
  if (authUser) {
    const value = encodeURIComponent(JSON.stringify(authUser));
    document.cookie = `${USER_CACHE_COOKIE}=${value}; path=/; max-age=2592000; samesite=lax${secure}`;
  } else {
    document.cookie = `${USER_CACHE_COOKIE}=; path=/; max-age=0; samesite=lax${secure}`;
  }
};

export const UserProvider = ({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: AuthUser | null;
}) => {
  const [user, setUser] = useState<AuthUser | null>(initialUser);
  const [isLoading, setIsLoading] = useState(true);

  // Mints a fresh access token from the refresh cookie (if any) and loads
  // the profile — used both on first mount and after auth state changes
  // elsewhere (e.g. password reset) so the rest of the app can trust `user`.
  const refreshSession = async () => {
    try {
      const refreshResult = await fetchUrl("/auth/refresh-token", { method: "POST" });
      const accessToken = refreshResult.data?.accessToken;
      if (!accessToken) {
        setUser(null);
        writeCachedUser(null);
        return;
      }

      setClientToken(accessToken);
      const profileResult = await fetchUrl("/users/me");
      const authUser = toAuthUser(profileResult.data);
      setUser(authUser);
      writeCachedUser(authUser);
    } catch {
      setUser(null);
      writeCachedUser(null);
    }
  };

  useEffect(() => {
    refreshSession().finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetchUrl dispatches this when a request comes back definitively
  // unauthenticated (expired/invalid token, no valid refresh session).
  // Clearing `user` here flips isLogin -> false immediately, so the navbar
  // shows the Sign In link without waiting for a page reload.
  useEffect(() => {
    const handleSessionExpired = () => {
      setUser(null);
      writeCachedUser(null);
    };
    window.addEventListener(AUTH_EXPIRED_EVENT, handleSessionExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleSessionExpired);
  }, []);

  const login: UserContextType["login"] = async (email, password) => {
    try {
      const result = await fetchUrl("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      const { accessToken, user: dbUser } = result.data;
      const authUser = toAuthUser(dbUser);
      setClientToken(accessToken);
      setUser(authUser);
      writeCachedUser(authUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || "Invalid email or password." };
    }
  };

  const signup: UserContextType["signup"] = async (data) => {
    try {
      const result = await fetchUrl("/auth/register", {
        method: "POST",
        body: data,
      });
      const { accessToken, user: dbUser } = result.data;
      const authUser = toAuthUser(dbUser);
      setClientToken(accessToken);
      setUser(authUser);
      writeCachedUser(authUser);
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.message || "Failed to create account." };
    }
  };

  // Merges fresh fields (e.g. after a profile edit) into `user` without a
  // round-trip through refresh-token + /users/me.
  const updateUser = (patch: Partial<AuthUser>) => {
    setUser((prev) => {
      const next = prev ? { ...prev, ...patch } : prev;
      writeCachedUser(next);
      return next;
    });
  };

  const logout = async () => {
    try {
      await fetchUrl("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout request failed", err);
    } finally {
      setClientToken("");
      setUser(null);
      writeCachedUser(null);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isLogin: Boolean(user), isLoading, login, signup, logout, refreshSession, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useLoginUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useLoginUser must be used within a UserProvider");
  }
  return context;
};

export default useLoginUser;
