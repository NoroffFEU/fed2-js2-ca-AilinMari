import { youStoryApi } from "../apiClient.js";
let youstoryApi = new youStoryApi();

async function getBlogpost() {
  try {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      console.error("User is not logged in. Posts will not be displayed.");
      return; // Exit if the user is not logged in
    }

    let blogposts = await youstoryApi.getBlogposts();
    renderBlogposts(blogposts);
  } catch (error) {
    console.error("Error fetching blogposts", error);
  }
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
    postContainer.appendChild(title);
    postContainer.appendChild(img);
    postContainer.appendChild(link);
    thumbnailGrid.appendChild(postContainer);
  });
}

getBlogpost();
