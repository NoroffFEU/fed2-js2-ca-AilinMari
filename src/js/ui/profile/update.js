import { youStoryApi } from "../../api/apiClient.js"; // Correct relative path
import { API_SOCIAL_PROFILES, repoUrl } from "../../api/constants.js"; // Correct relative path
import { headers } from "../../api/headers.js";
import { repoUrl } from "../../api/constants.js";

const apiClient = new youStoryApi();

export async function onUpdateProfile(data) {
  try {
    const updatedProfile = await apiClient.updateUserProfile(data);

    // Update localStorage with new avatar and banner
    localStorage.setItem("avatar", updatedProfile.avatar?.url || "");
    localStorage.setItem("banner", updatedProfile.banner?.url || "");

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

      const avatar = { url: form.avatar.value.trim(), alt: "User avatar" };
      const banner = { url: form.banner.value.trim(), alt: "User banner" };
      const bio = "User bio placeholder";

      const data = {
        avatar,
        banner,
        bio,
      };

      try {
        const updatedProfile = await onUpdateProfile(data);

        window.location.href = repoUrl + "/profile/index.html"; // Redirect to the profile page after successful update
      } catch (error) {}
    });
  }
});
