// alert('Single Post Page');
import { SocialApi } from "../../api/apiClient.js";
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

  const profileLink = document.createElement("a");
  profileLink.href = `../../profile/view/?author=${post.data.author?.name}`;
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
  
  postContainer.appendChild(userInfo);
  postContainer.appendChild(img);
  postContainer.appendChild(postTitle);
  postContainer.appendChild(postContent);
}

async function main() {
  const post = await getPostById();
  console.log(post);
  renderPost(post);
}

main();

//   const createdDate = document.createElement("p");
//   createdDate.textContent = "published " + blogpost.created.split("T")[0];
//   createdDate.className = "created-date";

//   const editDate = document.createElement("p");
//   editDate.textContent = "updated " + blogpost.updated.split("T")[0];
//   editDate.className = "updated-date";

//   const postButtonContainer = document.getElementById("blogpost-buttons");
//   const editPostButton = document.createElement("button");
//   editPostButton.textContent = "Edit post";
//   editPostButton.className = "edit-btn";
//   editPostButton.addEventListener("click", () => {
//     window.location.href = `../post/edit.html?id=${blogpost.id}`;
//   });

//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "Delete post";
//   deleteButton.className = "delete-btn";
//   deleteButton.setAttribute("data-id", blogpost.id);
//   deleteButton.addEventListener("click", async (event) => {
//     event.preventDefault();
//     const postId = event.target.getAttribute("data-id");
//     await deleteBlogpost(postId);
//     window.location.href = `../index.html`;
//   });

//   const accessToken = localStorage.getItem("accessToken");
//   const name = localStorage.getItem("name");
//   if (!accessToken || blogpost.author.name !== name) {
//     editPostButton.style.display = "none";
//     deleteButton.style.display = "none";
//   }

//   postButtonContainer.appendChild(editPostButton);
//   postButtonContainer.appendChild(deleteButton);
// }

// async function deleteBlogpost(postId) {
//   try {
//     await blogApi.deleteBlogpost(postId);
//     window.location.href = `../index.html`;
//   } catch (error) {
//     if (error instanceof AuthError) {
//       alert("Failed to delete post. You must be logged in to delete a post.");
//       return;
//     }
//     alert("Failed to delete post");
//   }
// }
document.addEventListener("DOMContentLoaded", () => {
  getPostById();
});
