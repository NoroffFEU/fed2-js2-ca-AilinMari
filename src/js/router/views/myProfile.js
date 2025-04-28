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
  const editButton = document.getElementById("editProfileButton");

  const authorName = document.createElement("h1");
  authorName.textContent = profile.data.name;

  const profileInfoContainer = document.createElement("div");
  profileInfoContainer.className = "profile-info-container";

  const editProfile = document.createElement("div");
  editProfile.className = "edit-profile-container";

  const authorAvatar = document.createElement("img");
  authorAvatar.src = profile.data.avatar.url;
  authorAvatar.alt = profile.data.avatar.alt || `${profile.name}'s avatar`;
  authorAvatar.className = "profile-avatar";

  const followersAndPostsContainer = document.createElement("div");
  followersAndPostsContainer.className = "followers-posts-count";

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
  profileContainer.appendChild(editProfile);
  editProfile.appendChild(editButton);
}

renderProfile(profile);


async function fetchAndRenderPosts(author) {
  try {
    const posts = await apiClient.getPostsByLoggedInUser(author);
    console.log("Fetched posts:", posts);
    renderPosts(posts.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function renderPosts(posts) {
  const postGrid = document.getElementById("profileFeed");
  if (!postGrid) {
    console.error("Error: #profileFeed not found in DOM");
    return;
  }
  postGrid.innerHTML = "";

  if (!Array.isArray(posts) || posts.length === 0) {
    postGrid.innerHTML = "<p>No blog posts available.</p>";
    return;
  }

  posts.forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.className = "container";

    const link = document.createElement("a");
    link.href = `../../post/?id=${post.id}`;

    const img = document.createElement("img");
    img.src = post.media.url;
    img.alt = post.media.alt || `${post.title}'s image`;
    img.className = "post-image";

    const title = document.createElement("h2");
    title.textContent = post.title;
    title.className = "post-title";

    const content = document.createElement("p");
    content.textContent = post.body;
    content.className = "post-description";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit Post";
    editButton.className = "edit-post-button";
    editButton.onclick = () => {
      window.location.href = `../../post/edit/?id=${post.id}`;
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Post";
    deleteButton.className = "delete-post-button";
    deleteButton.onclick = async () => {
      const confirmDelete = confirm("Are you sure you want to delete this post?");
      if (confirmDelete) {
        try {
          await apiClient.deletePost(post.id);
          alert("Post deleted successfully.");
          window.location.reload(); // Reload the page to reflect changes
        } catch (error) {
          console.error("Error deleting post:", error);
          alert("Failed to delete post. Please try again.");
        }
      }
    };


    postContainer.appendChild(img);
    postContainer.appendChild(link);
    postContainer.appendChild(title);
    postContainer.appendChild(content);
    postContainer.appendChild(editButton);
    postContainer.appendChild(deleteButton);
    postGrid.appendChild(postContainer);
  });
}
fetchAndRenderPosts(profile);