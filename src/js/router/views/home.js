import { authGuard } from "../../utilities/authGuard";
import { API_SOCIAL_POSTS, API_KEY } from "../../api/constants";
import { SocialApi } from "../../api/apiClient";
import { repoUrl } from "../../api/constants";
// import { renderProfileInfo } from "../../api/profile/logedin.js";

authGuard();

let apiClient = new SocialApi();

// Extract the username from the URL query parameters

const username = localStorage.getItem("name"); // Get the username from local storage

const profile = await apiClient.getUserProfile(username);

console.log("profile", profile);

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
}

renderProfile(profile);

const post = await apiClient.getAllPosts();
console.log(post); // Debugging log

function renderAllPosts(posts) {
  const postGrid = document.getElementById("storyfeed");
  if (!postGrid) {
    console.error("Error: #blogpostsContainer not found in DOM");
    return;
  }
  postGrid.innerHTML = ""; // Clear existing content

  if (!Array.isArray(post) || post.length === 0) {
    postGrid.innerHTML = "<p>No blog posts available.</p>";
    return;
  }

  posts.forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.className = "container";

    const link = document.createElement("a");
    link.href = repoUrl + `/post/?id=${post.id}`;

    const profileLink = document.createElement("a");
    profileLink.href = repoUrl + `/profile/view/?author=${post.author.name}`;
    profileLink.className = "profile-link";

    const img = document.createElement("img");
    img.src = post.media?.url;
    img.alt = post.media?.alt;
    img.className = "post-image";

    const title = document.createElement("h2");
    title.textContent = post.title;
    title.className = "post-title";

    const textContentContainer = document.createElement("div");
    textContentContainer.className = "textContentContainer";

    const authorContainer = document.createElement("div");
    authorContainer.className = "author-container";

    const author = document.createElement("p");
    author.textContent = post.author?.name;
    author.className = "author-name";

    const bodyText = document.createElement("p");
    bodyText.textContent = post.body;
    bodyText.className = "bodyText";

    const userAvatar = document.createElement("img");
    userAvatar.src = post.author?.avatar.url;
    userAvatar.alt = post.author?.avatar.alt || `${post.author.name}'s avatar`;
    userAvatar.className = "user-avatar";

    // Correctly append img and title to the link
    link.appendChild(img);
    link.appendChild(title);
    postContainer.appendChild(authorContainer);
    authorContainer.appendChild(userAvatar);
    authorContainer.appendChild(profileLink);
    profileLink.appendChild(author);
    profileLink.appendChild(userAvatar);
    // Append the link to the post container
    postContainer.appendChild(link);

    authorContainer.appendChild(author);
    postContainer.appendChild(textContentContainer);
    textContentContainer.appendChild(bodyText);

    postGrid.appendChild(postContainer);
  });
}

async function handleBlogpostsView() {
  const blogposts = await apiClient.getAllPosts();
  console.log(blogposts);
  renderAllPosts(blogposts);
}

handleBlogpostsView();
