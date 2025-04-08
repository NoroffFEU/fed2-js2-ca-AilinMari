import { API_AUTH_REGISTER } from "../constants";

export async function register({ name, email, password, bio, banner, avatar }) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, bio, banner, avatar }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Registration failed: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error.message);
    throw error;
  }
}
