export interface CachedAuthUser {
  name: string;
  email: string;
  phone?: string;
}

// Holds only non-sensitive display fields (never the access token) so the
// server can render the logged-in navbar/home variant on the very first
// HTML response — eliminating the "logged out" flash that a purely
// client-side (localStorage) cache can't avoid, since the browser paints
// the server-rendered markup before any client JS runs. The actual session
// is still independently validated client-side via /auth/refresh-token;
// this cookie is a UI hint only.
//
// Namespaced "tiu_website_..." (not just "tea_user_cache") because cookies
// are host-scoped, not port-scoped — on localhost the website (3000) and
// dashboard (3001) share the same cookie jar, so an unprefixed name here
// would risk colliding with whatever the dashboard names its equivalent.
export const USER_CACHE_COOKIE = "tiu_website_user_cache";

export const parseUserCacheCookie = (raw: string | undefined | null): CachedAuthUser | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (parsed && typeof parsed.name === "string" && typeof parsed.email === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};
