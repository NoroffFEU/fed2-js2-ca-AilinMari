import { API_KEY } from "./constants";

export function headers() {
  const headers = new Headers();

  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY); // Include API key in headers
  }

  headers.append("Content-Type", "application/json"); // Ensure JSON content type
  headers.append("Accept", "application/json"); // Ensure client expects JSON responses
  headers.append(
    "authorization",
    `Bearer ${localStorage.getItem("token")}`
  ); // Include access token if available

  return headers;
}
