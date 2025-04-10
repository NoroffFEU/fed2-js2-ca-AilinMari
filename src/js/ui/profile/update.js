import { youStoryApi } from "../../api/apiClient.js"; // Correct relative path
import { API_SOCIAL_PROFILES } from "../../api/constants.js"; // Correct relative path
import { headers } from "../../api/headers.js";

const apiClient = new youStoryApi();

export async function onUpdateProfile(avatar, banner) {
  try {
    const updatedProfile = await apiClient.updateUserProfile(avatar, banner);

    // Update localStorage with new avatar and banner
    localStorage.setItem("avatar", updatedProfile.avatar.url);
    localStorage.setItem("banner", updatedProfile.banner.url);

    return updatedProfile;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("updateProfileForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const avatar = form.avatar.value.trim();
      const banner = form.banner.value.trim();

      try {
        const updatedProfile = await onUpdateProfile(avatar, banner);
        console.log("Profile updated successfully:", updatedProfile);
        alert("Profile updated successfully!");
      } catch (error) {
        alert("Failed to update profile. Please try again.");
      }
    });
  }
});
