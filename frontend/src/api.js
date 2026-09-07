import axios from "axios";

// In dev, Vite proxies /api and /media to Django (see vite.config.js).
const api = axios.create({ baseURL: "/" });

export async function fetchHomepage() {
  const { data } = await api.get("/api/homepage/");
  return data;
}
