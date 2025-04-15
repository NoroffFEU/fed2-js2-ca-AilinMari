import { youStoryApi } from "../apiClient.js";
let youstoryApi = new youStoryApi();

// async function getBlogpost() {
//   try {
//     const accessToken = localStorage.getItem("token");
//     if (!accessToken) {
//       console.error("User is not logged in. Posts will not be displayed.");
//       return; // Exit if the user is not logged in
//     }

//     let blogposts = await youstoryApi.getBlogposts();
//     renderBlogposts(blogposts);
//     renderProfileInfo(blogposts[0]); // Assuming the first post's author is the logged-in user
//   } catch (error) {
//     console.error("Error fetching blogposts", error);
//   }
// }

import { readPostsByUser } from "../post/read.js";

console.log(readPostsByUser);

function renderProfileInfo(author) {
  const profileInfo = document.getElementById("profileInfo");
  if (!profileInfo) {
    console.error("Error: #profileInfo container not found in DOM");
    return;
  }
  profileInfo.innerHTML = ""; // Clear existing content

author = author.author; // Assuming author is an object with author property
  if (!author || !author.name || !author.avatar) {
    console.error("Error: Missing author data in API response");
    profileInfo.innerHTML = "<p>Profile information is not available.</p>";
    return;
  }
  const authorName = document.createElement("h3");
  authorName.textContent = author.name;

const profileInfoContainer = document.createElement("div");
  profileInfoContainer.className = "profile-info-container";

  const authorAvatar = document.createElement("img");
  authorAvatar.src = author.avatar.url;
  authorAvatar.alt = author.avatar.alt || `${author.name}'s avatar`;
  authorAvatar.className = "profile-avatar";

  profileInfo.appendChild(profileInfoContainer);
  profileInfoContainer.appendChild(authorAvatar);
  profileInfoContainer.appendChild(authorName);

}
function renderBlogposts(posts) {
  const thumbnailGrid = document.getElementById("profileFeed");
  thumbnailGrid.className = "thumbnail-grid";
  thumbnailGrid.innerHTML = "";

  posts.forEach((blogpost) => {
    const postContainer = document.createElement("div");
    postContainer.className = "container";

    const link = document.createElement("a");
    link.href = `/blogpost.html?id=${blogpost.id}`;

    const img = document.createElement("img");
    img.src = blogpost.media.url;
    img.alt = blogpost.media.alt;

    const title = document.createElement("h2");
    title.textContent = blogpost.title;

    const author = document.createElement("p");
    author.textContent = blogpost.author.name;

    postContainer.appendChild(title);
    postContainer.appendChild(author);
    postContainer.appendChild(img);
    postContainer.appendChild(link);
    thumbnailGrid.appendChild(postContainer);
  });
}
getBlogpost();

