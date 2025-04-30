import { API_SOCIAL_PROFILES } from "../constants";
import { SocialApi } from "../apiClient";
import { headers } from "../headers";
import { API_KEY } from "../constants";
const apiClient = new SocialApi();

// Function to update profile with avatar and banner
async function updateProfile({ avatarUrl, bannerUrl }) {
  try {
    const updates = [];

    // If avatarUrl is set, update avatar
    if (avatarUrl) {
      const avatarUpdate = { avatar: avatarUrl };

      updates.push(apiClient.updateUserProfile(avatarUpdate));
    }

    // If bannerUrl is set, update banner
    if (bannerUrl) {
      const bannerUpdate = { banner: bannerUrl };

      updates.push(apiClient.updateUserProfile(bannerUpdate));
    }

    // Execute all updates in parallel
    const results = await Promise.all(updates);

    const latestProfile = results[results.length - 1];

    // Update localStorage
    if (latestProfile.avatar) {
      localStorage.setItem("avatar", latestProfile.avatar);
    } else {
      localStorage.removeItem("avatar");
    }

    if (latestProfile.banner) {
      localStorage.setItem("banner", latestProfile.banner);
    } else {
      localStorage.removeItem("banner");
    }

    return latestProfile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

// Get the update profile form element
const updateProfileForm = document.getElementById("updateProfileForm");

// Event listener for form submission
updateProfileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get avatar and banner URL from the form
  const avatarUrl = document.getElementById("avatar").value.trim();
  const bannerUrl = document.getElementById("banner").value.trim();

  try {
    // Call the function to update the profile
    await updateProfile({ avatarUrl, bannerUrl });
    window.location.reload(); // Reload the page to reflect changes
  } catch (error) {
    alert("Failed to update profile. See console for details.");
  }
});

const editProfileButton = document.getElementById("editProfileButton");

editProfileButton.addEventListener("click", () => {
  const form = document.getElementById("updateProfileForm");

  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block"; // Show the form
    editProfileButton.textContent = "Cancel Edit"; // Change button text
  } else {
    form.style.display = "none"; // Hide the form
    editProfileButton.textContent = "Edit Profile"; // Revert button text
  }
});
