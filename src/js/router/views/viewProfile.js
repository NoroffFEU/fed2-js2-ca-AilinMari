import { authGuard } from "../../utilities/authGuard.js";
import { SocialApi } from "../../api/apiClient.js";

authGuard();

const apiClient = new SocialApi();

// Extract the username (author) from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const profile = urlParams.get("author");

if (!profile) {
  console.error("Error: No author specified in the URL.");
} else {
  fetchAndRenderProfile(profile);
}

// Fetch and render the profile of the user who owns the post
async function fetchAndRenderProfile(author) {
  try {
    const profile = await apiClient.getUserProfileByAuthor(author);
    console.log("Fetched profile:", profile); // Debugging log
    renderProfile(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

// Render the profile information
function renderProfile(profile) {
  const profileContainer = document.getElementById("view-profile");

  const authorName = document.createElement("h1");
  authorName.textContent = profile.data?.name;

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


// function renderPosts (posts) {
//     const postGrid = document.getElementById("view-posts-grid");

//     if (!postGrid) {
//         console.error("Error: #blogpostsContainer not found in DOM");
//         return;
//       }
//       postGrid.innerHTML = ""; // Clear existing content
    
//       if (!Array.isArray(posts) || posts.length === 0) {
//         postGrid.innerHTML = "<p>No blog posts available.</p>";
//         return;
//       }

// posts.forEach((posts) => {
//     const postContainer = document.createElement("div");
//     postContainer.className = "container";

//     const link = document.createElement("a");
//     link.href = `../../post/?id=${posts.id}`;

//     const profileLink = document.createElement("a");
//     profileLink.href = `../../profile/view/?author=${posts.author.name}`;
//     profileLink.className = "profile-link";

//     const img = document.createElement("img");
//     img.src = posts.image.url;
//     img.alt = posts.image.alt || `${posts.title}'s image`;
//     img.className = "post-image";

//     const title = document.createElement("h2");
//     title.textContent = posts.title;

//     const description = document.createElement("p");
//     description.textContent = posts.description;

//     postContainer.appendChild(link);
//     link.appendChild(img);
//     postContainer.appendChild(title);
//     postContainer.appendChild(description);

//   postGrid.appendChild(postContainer);
// });

//   renderPosts(posts)