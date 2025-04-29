// import { SocialApi } from "../apiClient.js";

// let apiClient = new SocialApi();



// export function renderProfileInfo(author) {
//   console.log(author);
//   const profileInfo = document.getElementById("profileInfo");
//   if (!profileInfo) {
//     console.error("Error: #profileInfo container not found in DOM");
//     return;
//   }
//   profileInfo.innerHTML = ""; // Clear existing content

//   if (!author || !author.name || !author.avatar) {
//     console.error("Error: Missing author data in API response");
//     profileInfo.innerHTML = "<p>Profile information is not available.</p>";
//     return;
//   }
//   const authorName = document.createElement("h1");
//   authorName.textContent = author.name;

//   const profileInfoContainer = document.createElement("div");
//   profileInfoContainer.className = "profile-info-container";

//   const authorAvatar = document.createElement("img");
//   authorAvatar.src = author.avatar.url;
//   authorAvatar.alt = author.avatar.alt || `${author.name}'s avatar`;
//   authorAvatar.className = "profile-avatar";

//   const followersAndPostsContainer = document.createElement("div");
//   followersAndPostsContainer.className = "followers-postst-count";

//   const postsCount = document.createElement("p");
//   postsCount.textContent = `Posts: ${author._count.posts}`; // Assuming author object has postsCount property

//   const followersCount = document.createElement("p");
//   followersCount.textContent = `Followers: ${author._count.followers}`; // Assuming author object has followersCount property

//   const followingCount = document.createElement("p");
//   followingCount.textContent = `Following: ${author._count.following}`; // Assuming author object has followingCount property

//   profileInfo.appendChild(profileInfoContainer);
//   profileInfoContainer.append(authorAvatar, authorName);
//   profileInfo.appendChild(followersAndPostsContainer);
//   followersAndPostsContainer.append(postsCount, followersCount, followingCount);
// }

// async function handleProfileView() {
//   const username = localStorage.getItem("name"); // Get the username from local storage
//   console.log("Username from local storage:", username); // Debugging log
//   const author = await apiClient.getUserProfile(username);
//   console.log(author);
//   renderProfileInfo(author);
  
// }

// handleProfileView();


