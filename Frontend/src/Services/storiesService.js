import { api } from "./authService";

export async function listApprovedStories() {
  const { data } = await api.get("/stories");
  return data.stories ?? [];
}

export async function listMyStories() {
  const { data } = await api.get("/stories/me");
  return data.stories ?? [];
}

export async function submitStory({
  title,
  type,
  kind,
  displayName,
  username,
  location,
  rating,
  text,
  videoFile,
}) {
  const fd = new FormData();
  fd.append("title", title);
  fd.append("type", type);
  if (kind) fd.append("kind", kind);
  if (displayName) fd.append("displayName", displayName);
  if (username) fd.append("username", username);
  if (location) fd.append("location", location);
  if (rating != null) fd.append("rating", String(rating));
  if (text) fd.append("text", text);
  if (videoFile) fd.append("video", videoFile);
  const { data } = await api.post("/stories", fd);
  return data.story;
}

