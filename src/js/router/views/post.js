// alert('Single Post Page');
import { SocialApi } from "../../api/apiClient.js";
import { repoUrl } from "../../api/constants.js";
import { authGuard } from "../../utilities/authGuard.js";
let api = new SocialApi();
authGuard();

const urlParams = new URLSearchParams(window.location.search);

const postId = urlParams.get("id");

async function getPostById() {
  try {
    let post = await api.getPostById(postId);
    return post;
  } catch (error) {
    console.error("Error fetching post", error);
  }
}

function renderPost(post) {
  const postContainer = document.getElementById(`single-post`);

  const userInfo = document.createElement("div");
  userInfo.className = "user-info";

  const img = document.createElement("img");
  img.src = post.data.media?.url;
  img.alt = post.data.media?.alt;
  img.className = "post-image";

  const container = document.createElement("div");
  container.className = "container";
  const profileLink = document.createElement("a");
  profileLink.href =
    repoUrl + `/profile/view/?author=${post.data.author?.name}`;
  profileLink.className = "profile-link";

  const postTitle = document.createElement("h1");
  postTitle.textContent = post.data.title;
  postTitle.className = "post-title";

  const postContent = document.createElement("p");
  postContent.textContent = post.data.body;
  postContent.className = "body-text";

  const author = document.createElement("p");
  author.textContent = post.data.author.name;

  const avatar = document.createElement("img");
  avatar.src = post.data.author.avatar.url;
  avatar.className = "user-avatar";

  profileLink.appendChild(avatar);
  profileLink.appendChild(author);
  userInfo.appendChild(profileLink);
  postContainer.appendChild(container);
  container.appendChild(userInfo);
  container.appendChild(img);
  container.appendChild(postTitle);
  container.appendChild(postContent);
}

async function main() {
  const post = await getPostById();

  renderPost(post);
}

main();

document.addEventListener("DOMContentLoaded", () => {
  getPostById();
});
