const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4005";

export function getApiBase() {
  return apiBase;
}

export function getToken() {
  try {
    return localStorage.getItem("adminToken");
  } catch (e) {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminAuth", "true");
  } catch (e) {}
}

export function clearAuth() {
  try {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminLoginTime");
  } catch (e) {}
}

export async function refreshToken() {
  try {
    const res = await fetch(`${apiBase}/api/auth/refresh`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (data.token) setToken(data.token);
    return !!data.token;
  } catch (e) {
    return false;
  }
}

export async function fetchWithAuth(input, init = {}) {
  const base = apiBase;
  const url = input.startsWith("http") ? input : `${base}${input}`;
  let token = getToken();

  const merged = Object.assign({ headers: {} }, init);
  if (token) merged.headers["Authorization"] = `Bearer ${token}`;

  let res = await fetch(url, merged);
  if (res.status === 401 || res.status === 403) {
    const ok = await refreshToken();
    if (!ok) {
      clearAuth();
      throw new Error("Unauthorized");
    }
    token = getToken();
    merged.headers["Authorization"] = `Bearer ${token}`;
    res = await fetch(url, merged);
  }

  return res;
}

export async function logout() {
  try {
    const token = getToken();
    await fetch(`${apiBase}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: { Authorization: token ? `Bearer ${token}` : undefined },
    });
  } catch (e) {}
  clearAuth();
}

export default { getApiBase, getToken, setToken, clearAuth, fetchWithAuth, refreshToken, logout };
