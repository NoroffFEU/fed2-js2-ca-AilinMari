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

    const updatedProfile = await response.json();

    // Update localStorage with new avatar and banner
    localStorage.setItem("avatar", updatedProfile.avatar);
    localStorage.setItem("banner", updatedProfile.banner);

    return updatedProfile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
