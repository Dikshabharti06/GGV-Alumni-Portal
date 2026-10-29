export const API = (
  import.meta.env.VITE_API_URL || "http://localhost:8000/api"
).replace(/\/$/, "");

export async function request(path, options = {}) {
  const isForm = options.body instanceof FormData;
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      ...(isForm ? {} : { "Content-Type": "application/json" }),
      ...(options.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok)
    throw new Error(
      body.detail || body.message || `Request failed (${res.status})`,
    );
  return body;
}

export const api = {
  me: () => request("/auth/me"),
  login: (data) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  register: (data) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  dashboard: () => request("/dashboard"),
  alumni: (q = "", department = "") =>
    request(
      `/alumni?q=${encodeURIComponent(q)}&department=${encodeURIComponent(department)}`,
    ),
  announcements: () => request("/announcements"),
  events: () => request("/events"),
  stats: () => request("/admin/stats"),
  pending: () => request("/admin/pending"),
  publish: (data) =>
    request("/admin/announcements", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  graduate: () => request("/student/graduate", { method: "POST" }),
  mentor: (id, value) =>
    request(`/alumni/${id}/mentorship`, {
      method: "PATCH",
      body: JSON.stringify({ mentorship: value }),
    }),
  approve: (id) => request(`/admin/graduate/${id}/approve`, { method: "POST" }),
};
