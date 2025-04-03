import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

export async function updateProfile(username, { avatar, banner }) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ avatar, banner }),
    });
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
