import { API_SOCIAL_PROFILES } from "../constants";
import { SocialApi } from "../apiClient";
import { headers } from "../headers";
import { API_KEY } from "../constants";

const apiClient = new SocialApi();

// Funksjon for å oppdatere profilen med avatar og banner
async function updateProfile({ avatarUrl, bannerUrl }) {
  try {
    const updates = [];

    // Hvis avatarUrl er satt, oppdater avatar
    if (avatarUrl) {
      const avatarUpdate = { avatar: avatarUrl };
      console.log("Sender avatar update:", avatarUpdate);
      updates.push(apiClient.updateUserProfile(avatarUpdate));
    }

    // Hvis bannerUrl er satt, oppdater banner
    if (bannerUrl) {
      const bannerUpdate = { banner: bannerUrl };
      console.log("Sender banner update:", bannerUpdate);
      updates.push(apiClient.updateUserProfile(bannerUpdate));
    }

    // Kjør alle oppdateringer parallelt
    const results = await Promise.all(updates);

    const latestProfile = results[results.length - 1];
    console.log("Updated profile:", latestProfile);

    // Oppdater localStorage
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

// Hent form-elementet for oppdatering av profil
const updateProfileForm = document.getElementById("updateProfileForm");

// Event listener for form submission
updateProfileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Hent avatar og banner URL fra skjemaet
  const avatarUrl = document.getElementById("avatar").value.trim();
  const bannerUrl = document.getElementById("banner").value.trim();

  console.log("Form data:", { avatarUrl, bannerUrl });

  try {
    // Kall funksjonen som oppdaterer profilen
    await updateProfile({ avatarUrl, bannerUrl });
    alert("Profile updated successfully!");
    window.location.reload(); // Reload the page to reflect changes
  } catch (error) {
    alert("Failed to update profile. See console for details.");
  }
});

const editProfileButton = document.getElementById("editProfileButton");

editProfileButton.addEventListener("click", () => {
  const form = document.getElementById("updateProfileForm");
  
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block"; // Vis skjemaet
    editProfileButton.textContent = "Cancel Edit"; // Endre knappetekst
  } else {
    form.style.display = "none"; // Skjul skjemaet
    editProfileButton.textContent = "Edit Profile"; // Tilbake til original
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
