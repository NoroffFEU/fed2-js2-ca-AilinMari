import { authGuard } from "../../utilities/authGuard.js";
import { SocialApi } from "../../api/apiClient.js";
// import { renderProfileInfo } from "../../api/profile/logedin.js";

authGuard();

let apiClient = new SocialApi();

// Extract the username from the URL query parameters

const username = localStorage.getItem("name"); // Get the username from local storage

const profile = await apiClient.getUserProfile(username);

// console.log("profile", profile);

function renderProfile(profile) {
  const profileContainer = document.getElementById("profileInfo");

  const authorName = document.createElement("h1");
  authorName.textContent = profile.data.name;

  const profileInfoContainer = document.createElement("div");
  profileInfoContainer.className = "profile-info-container";

  const authorAvatar = document.createElement("img");
  authorAvatar.src = profile.data.avatar.url;
  authorAvatar.alt = profile.data.avatar.alt || `${profile.name}'s avatar`;
  authorAvatar.className = "profile-avatar";

  const followersAndPostsContainer = document.createElement("div");
  followersAndPostsContainer.className = "followers-postst-count";

  const postsCount = document.createElement("p");
  postsCount.textContent = `Posts: ${profile.data._count.posts}`; // Assuming author object has postsCount property

  const followersCount = document.createElement("p");
  followersCount.textContent = `Followers: ${profile.data._count.followers}`; // Assuming author object has followersCount property

  const followingCount = document.createElement("p");
  followingCount.textContent = `Following: ${profile.data._count.following}`; // Assuming author object has followingCount property

  profileContainer.appendChild(profileInfoContainer);
  profileInfoContainer.append(authorAvatar, authorName);
  profileContainer.appendChild(followersAndPostsContainer);
  followersAndPostsContainer.append(postsCount, followersCount, followingCount);
} 

renderProfile(profile);