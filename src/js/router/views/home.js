import { authGuard } from "../../utilities/authGuard";
import { API_SOCIAL_POSTS, API_KEY } from "../../api/constants";
import { youStoryApi } from "../../api/apiClient";
// import { renderProfileInfo } from "../../api/profile/logedin.js";

authGuard();

let apiClient = new youStoryApi();

function renderProfileInfo(author) {
  console.log(author);
  const profileInfo = document.getElementById("profileInfo");
  if (!profileInfo) {
    console.error("Error: #profileInfo container not found in DOM");
    return;
  }
  profileInfo.innerHTML = ""; // Clear existing content

  if (!author || !author.name || !author.avatar) {
    console.error("Error: Missing author data in API response");
    profileInfo.innerHTML = "<p>Profile information is not available.</p>";
    return;
  }
  const authorName = document.createElement("h1");
  authorName.textContent = author.name;

  const profileInfoContainer = document.createElement("div");
  profileInfoContainer.className = "profile-info-container";

  const authorAvatar = document.createElement("img");
  authorAvatar.src = author.avatar.url;
  authorAvatar.alt = author.avatar.alt || `${author.name}'s avatar`;
  authorAvatar.className = "profile-avatar";

  const followersAndPostsContainer = document.createElement("div");
  followersAndPostsContainer.className = "followers-postst-count";

  const postsCount = document.createElement("p");
  postsCount.textContent = `Posts: ${author._count.posts}`; // Assuming author object has postsCount property

  const followersCount = document.createElement("p");
  followersCount.textContent = `Followers: ${author._count.followers}`; // Assuming author object has followersCount property

  const followingCount = document.createElement("p");
  followingCount.textContent = `Following: ${author._count.following}`; // Assuming author object has followingCount property

  // const bannerImage = document.createElement('img');
  // bannerImage.src = author.banner.url;
  // bannerImage.alt = author.banner.alt || `${author.name}'s banner`;
  // bannerImage.className = 'profile-banner';
  profileInfo.appendChild(profileInfoContainer);
  profileInfoContainer.append(authorAvatar, authorName);
  profileInfo.appendChild(followersAndPostsContainer);
  followersAndPostsContainer.append(postsCount, followersCount, followingCount);
}

async function handleProfileView() {
  const author = await apiClient.getUserProfile();
  console.log(author);
  renderProfileInfo(author);
}

handleProfileView();

const blogpost = await apiClient.getAllBlogposts();
console.log(blogpost); // Debugging log

function renderBlogposts(posts) {
  const blogpostsGrid = document.getElementById("storyfeed");
  if (!blogpostsGrid) {
    console.error("Error: #blogpostsContainer not found in DOM");
    return;
  }
  blogpostsGrid.innerHTML = ""; // Clear existing content

  if (!Array.isArray(blogpost) || blogpost.length === 0) {
    blogpostsGrid.innerHTML = "<p>No blog posts available.</p>";
    return;
  }

  posts.forEach((blogpost) => {
    const postContainer = document.createElement("div");
    postContainer.className = "container";

    const link = document.createElement("a");
    link.href = `../../post/?id=${blogpost.id}&author=${blogpost.author?.name}`;

    const img = document.createElement("img");
    img.src = blogpost.media?.url;
    img.alt = blogpost.media?.alt;
    img.className = "post-image";

    const title = document.createElement("h2");
    title.textContent = blogpost.title;

    const textContentContainer = document.createElement("div");
    textContentContainer.className = "textContentContainer";

    const authorContainer = document.createElement("div");
    authorContainer.className = "author-container";

    const author = document.createElement("p");
    author.textContent = blogpost.author?.name;
    author.className = "author-name";

    const bodyText = document.createElement("p");
    bodyText.textContent = blogpost.body;
    bodyText.className = "bodyText";

    const userAvatar = document.createElement("img");
    userAvatar.src = blogpost.author?.avatar.url;
    userAvatar.alt =
      blogpost.author?.avatar.alt || `${blogpost.author.name}'s avatar`;
    userAvatar.className = "user-avatar";

    // Correctly append img and title to the link
    link.appendChild(img);
    link.appendChild(title);
    postContainer.appendChild(authorContainer);
    authorContainer.appendChild(userAvatar);
    // Append the link to the post container
    postContainer.appendChild(link);

    authorContainer.appendChild(author);
    postContainer.appendChild(textContentContainer);
    textContentContainer.appendChild(bodyText);

    blogpostsGrid.appendChild(postContainer);
  });
}

async function handleBlogpostsView() {
  const blogposts = await apiClient.getAllBlogposts();
  console.log(blogposts);
  renderBlogposts(blogposts);
}

handleBlogpostsView();
