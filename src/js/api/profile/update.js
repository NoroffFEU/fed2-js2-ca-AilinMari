import { API_SOCIAL_PROFILES } from "../constants";
import { SocialApi } from "../apiClient";
import { headers } from "../headers";
import { API_KEY } from "../constants";

const apiClient = new SocialApi();

async function updateProfile({ avatarUrl, bannerUrl }) {
  try {
    const updatedData = {
      avatar: avatarUrl,
      banner: bannerUrl,
    };

    const updatedProfile = await apiClient.updateUserProfile(updatedData);
    console.log("Updated profile:", updatedProfile);

    if (updatedProfile.avatar) {
      localStorage.setItem("avatar", updatedProfile.avatar);
    } else {
      localStorage.removeItem("avatar");
    }

    if (updatedProfile.banner) {
      localStorage.setItem("banner", updatedProfile.banner);
    } else {
      localStorage.removeItem("banner");
    }

    return updatedProfile;

  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

// Nå: Koble til form-skjemaet
const form = document.getElementById("updateProfileForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Hindrer at skjemaet reload-er siden

  const avatarUrl = document.getElementById("avatar").value.trim();
  const bannerUrl = document.getElementById("banner").value.trim();

  try {
    await updateProfile({ avatarUrl, bannerUrl });
    alert("Profilen ble oppdatert!");
    form.reset(); // Tømmer feltene etter vellykket oppdatering (valgfritt)
  } catch (error) {
    alert("Noe gikk galt under oppdateringen.");
  }
});













// export async function updateProfile(data) {
//   try {
//     const username = localStorage.getItem("name"); // Get the username from local storage
//     const response = await fetch(`${API_SOCIAL_PROFILES}/${username}`, {
//       method: "PUT",
//       headers: headers(),
//       "Content-Type": "application/json",
//       accept: "application/json",
//       authorization: `Bearer ${localStorage.getItem("token")}`,
//       "X-Noroff-API-Key": `${API_KEY}`,
//       body: JSON.stringify(data),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to update profile");
//     }

//     const updatedProfile = await response.json();

    // Update localStorage with new avatar and banner
//     localStorage.setItem("avatar", updatedProfile.avatar.url);
//     localStorage.setItem("banner", updatedProfile.banner.url);

//     return updatedProfile;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }
