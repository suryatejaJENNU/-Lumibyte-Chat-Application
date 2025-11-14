const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

async function request(path, opts = {}) {
  const res = await fetch(`${API_BASE}${path}`, opts);
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`${res.status} ${txt}`);
  }
  return res.json().catch(()=>null);
}

export const fetchSessions = () => request("/sessions");
export const createNewChat = (title = "New Chat") => request(`/new-chat?title=${encodeURIComponent(title)}`);
export const deleteSession = (id) => request(`/session/${id}`, { method: "DELETE" });
export const renameSession = (id, title) => request(`/session/${id}`, {
  method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title })
});
export const fetchSessionHistory = (id) => request(`/session/${id}`);
export const postChat = (id, message) => request(`/chat/${id}`, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message })
});
export const postFeedback = (sId, mId, feedback) => request(`/feedback/${sId}/${mId}`, {
  method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ feedback })
});
