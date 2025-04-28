import { authGuard } from "../../utilities/authGuard.js";
import { SocialApi } from "../../api/apiClient.js";

authGuard();

const apiClient = new SocialApi();
const urlParams = new URLSearchParams(window.location.search);
const profileUsername = urlParams.get("author");
let loggedInUsername = localStorage.getItem("name"); // Henter ditt brukernavn

if (!profileUsername) {
  console.error("Error: No author specified in the URL.");
} else {
  fetchAndRenderProfile(profileUsername);
  fetchAndRenderPosts(profileUsername);
}

async function fetchAndRenderProfile(author) {
  try {
    const profileData = await apiClient.getUserProfileByAuthor(author);
    console.log("Fetched profile:", profileData);
    renderProfile(profileData.data);
  } catch (error) {
    console.error("Error fetching profile:", error);
  }
}

function renderProfile(profile) {
  const profileContainer = document.getElementById("view-profile");
  if (!profileContainer) {
    console.error("Error: #view-profile not found in DOM");
    return;
  }
  profileContainer.innerHTML = ""; // Viktig å tømme container først!

  const profileInfoContainer = document.createElement("div");
  profileInfoContainer.className = "profile-info-container";

  const authorAvatar = document.createElement("img");
  authorAvatar.src = profile.avatar?.url;
  authorAvatar.alt = profile.avatar?.alt || `${profile.name}'s avatar`;
  authorAvatar.className = "profile-avatar";

  const authorName = document.createElement("h1");
  authorName.textContent = profile.name;

  const followersAndPostsContainer = document.createElement("div");
  followersAndPostsContainer.className = "followers-posts-count";

  const postsCount = document.createElement("p");
  postsCount.textContent = `Posts: ${profile._count?.posts}`;

  const followersCount = document.createElement("p");
  followersCount.textContent = `Followers: ${profile._count?.followers}`;

  const followingCount = document.createElement("p");
  followingCount.textContent = `Following: ${profile._count?.following}`;


  let isFollowing = profile.followers?.some(
    (follower) => follower.name === loggedInUsername
  );

  const followButton = document.createElement("button");
  followButton.id = "follow-button";
  followButton.textContent = isFollowing ? "Unfollow" : "Follow";

  followButton.addEventListener("click", async () => {
    followButton.disabled = true; // Deaktiver knappen mens vi venter
    try {
      if (!isFollowing) {
        await apiClient.followUser(profile.name);
        // alert(`You are now following ${profile.name}`);
      } else {
        await apiClient.unfollowUser(profile.name);
        // alert(`You unfollowed ${profile.name}`);
      }
      await fetchAndRenderProfile(profile.name); // Henter profilen på nytt etter endring
    } catch (error) {
      console.error("Error updating follow status:", error);
      alert("Something went wrong. Try again.");
    } finally {
      followButton.disabled = false;
    }
  });

  // Sett sammen elementene
  profileContainer.appendChild(profileInfoContainer);
  profileInfoContainer.append(authorAvatar, authorName);
  profileContainer.appendChild(followersAndPostsContainer);
  followersAndPostsContainer.append(postsCount, followersCount, followingCount);
  profileContainer.appendChild(followButton);
}

async function fetchAndRenderPosts(author) {
  try {
    const posts = await apiClient.getAllPostsByAuthor(author);
    console.log("Fetched posts:", posts);
    renderPosts(posts.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function renderPosts(posts) {
  const postGrid = document.getElementById("view-posts-grid");
  if (!postGrid) {
    console.error("Error: #view-posts-grid not found in DOM");
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
    img.src = post.media?.url;
    img.alt = post.media?.alt || `${post.title}'s image`;
    img.className = "post-image";

    const title = document.createElement("h2");
    title.textContent = post.title;
    title.className = "post-title";

    const content = document.createElement("p");
    content.textContent = post.body;
    content.className = "post-description";

    postContainer.appendChild(img);
    postContainer.appendChild(link);
    postContainer.appendChild(title);
    postContainer.appendChild(content);
    postGrid.appendChild(postContainer);
  });
}

// import { authGuard } from "../../utilities/authGuard.js";
// import { SocialApi } from "../../api/apiClient.js";

// authGuard();

// const apiClient = new SocialApi();

// // Extract the username (author) from the URL query parameters
// const urlParams = new URLSearchParams(window.location.search);
// const profile = urlParams.get("author");

// if (!profile) {
//   console.error("Error: No author specified in the URL.");
// } else {
//   fetchAndRenderProfile(profile);
//   fetchAndRenderPosts(profile); // Fetch and render posts by the author
// }

// // Fetch and render the profile of the user who owns the post
// async function fetchAndRenderProfile(author) {
//   try {
//     const profile = await apiClient.getUserProfileByAuthor(author);
//     console.log("Fetched profile:", profile); // Debugging log
//     renderProfile(profile);
//   } catch (error) {
//     console.error("Error fetching profile:", error);
//   }
// }

// // Render the profile information
// function renderProfile(profile) {
//   const profileContainer = document.getElementById("view-profile");

//   const authorName = document.createElement("h1");
//   authorName.textContent = profile.data?.name;

//   const profileInfoContainer = document.createElement("div");
//   profileInfoContainer.className = "profile-info-container";

//   const authorAvatar = document.createElement("img");
//   authorAvatar.src = profile.data?.avatar.url;
//   authorAvatar.alt = profile.data?.avatar.alt || `${profile.name}'s avatar`;
//   authorAvatar.className = "profile-avatar";

//   const followersAndPostsContainer = document.createElement("div");
//   followersAndPostsContainer.className = "followers-postst-count";

//   const postsCount = document.createElement("p");
//   postsCount.textContent = `Posts: ${profile.data._count.posts}`; // Assuming author object has postsCount property

//   const followersCount = document.createElement("p");
//   followersCount.textContent = `Followers: ${profile.data._count.followers}`; // Assuming author object has followersCount property

//   const followingCount = document.createElement("p");
//   followingCount.textContent = `Following: ${profile.data._count.following}`; // Assuming author object has followingCount property

//   profileContainer.appendChild(profileInfoContainer);
//   profileInfoContainer.append(authorAvatar, authorName);
//   profileContainer.appendChild(followersAndPostsContainer);
//   followersAndPostsContainer.append(postsCount, followersCount, followingCount);
// }
// renderProfile(profile);

// const post = await apiClient.getAllPostsByAuthor(profile);
// console.log(post); // Debugging log

// function renderPosts(posts) {
//   const postGrid = document.getElementById("view-posts-grid");
//   if (!postGrid) {
//     console.error("Error: #view-posts-grid not found in DOM");
//     return;
//   }
//   postGrid.innerHTML = ""; // Clear existing content

//   if (!Array.isArray(posts) || posts.length === 0) {
//     postGrid.innerHTML = "<p>No blog posts available.</p>";
//     return;
//   }

//   posts.forEach((post) => {
//     const postContainer = document.createElement("div");
//     postContainer.className = "container";

//     const link = document.createElement("a");
//     link.href = `../../post/?id=${post.id}`;

//     const img = document.createElement("img");
//     img.src = post.image?.data.url;
//     img.alt = post.image?.alt || `${post.title}'s image`;
//     img.className = "post-image";

//     const title = document.createElement("h2");
//     title.textContent = post.data.title;
//     title.className = "post-title";

//     const content = document.createElement("p");
//     content.textContent = post.body;
//     content.className = "post-description";

//     postGrid.appendChild(postContainer);
//     postContainer.appendChild(title)
//   });
// }
// async function fetchAndRenderPosts(author) {
//     try {
//       const posts = await apiClient.getAllPostsByAuthor(author);
//       console.log("Fetched posts:", posts); // Debugging log
//       renderPosts(posts);
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   }
//   fetchAndRenderPosts(); // Fetch and render posts by the author
