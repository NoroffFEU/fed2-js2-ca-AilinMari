alert("Single Post Page");
import { youStoryApi } from "../../api/apiClient.js";
import { authGuard } from "../../utilities/authGuard.js";
import { readPostByAuthorAndId } from "../../api/post/read.js";


authGuard();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function getBlogpostByID() {
  try {
    let blogpost = await readPostByAuthorAndId(postId); // Use the fixed readPost function
    renderBlogpostbyId(blogpost);
  } catch (error) {
    console.error("Error fetching blogpost", error);
  }
}

function renderBlogpostbyId(blogpost) {
  const postContainer = document.getElementById("single-post");

  const img = document.createElement("img");
  img.src = blogpost.media.url;
  img.alt = blogpost.media.alt;

  const postTitle = document.createElement("h1");
  postTitle.textContent = blogpost.title;

  const author = document.createElement("p");
  author.textContent = "By: " + blogpost.author.name;

  postContainer.appendChild(img);
  postContainer.appendChild(postTitle);
  postTitle.appendChild(author);

//   const postContentContainer = document.getElementById("blogpost-content");

//   const paragraphs = blogpost.body.split("\n");
//   paragraphs.forEach((paragraph) => {
//     const postContent = document.createElement("p");
//     postContent.textContent = paragraph;
//     postContent.className = "post-content";
//     postContentContainer.appendChild(postContent);
//   });

  const createdDate = document.createElement("p");
  createdDate.textContent = "published " + blogpost.created.split("T")[0];
  createdDate.className = "created-date";

  const editDate = document.createElement("p");
  editDate.textContent = "updated " + blogpost.updated.split("T")[0];
  editDate.className = "updated-date";

  const postButtonContainer = document.getElementById("blogpost-buttons");
  const editPostButton = document.createElement("button");
  editPostButton.textContent = "Edit post";
  editPostButton.className = "edit-btn";
  editPostButton.addEventListener("click", () => {
    window.location.href = `../post/edit.html?id=${blogpost.id}`;
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete post";
  deleteButton.className = "delete-btn";
  deleteButton.setAttribute("data-id", blogpost.id);
  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const postId = event.target.getAttribute("data-id");
    await deleteBlogpost(postId);
    window.location.href = `../index.html`;
  });

  const accessToken = localStorage.getItem("accessToken");
  const name = localStorage.getItem("name");
  if (!accessToken || blogpost.author.name !== name) {
    editPostButton.style.display = "none";
    deleteButton.style.display = "none";
  }

//   postContentContainer.appendChild(createdDate);
//   postContentContainer.appendChild(editDate);
  postButtonContainer.appendChild(editPostButton);
  postButtonContainer.appendChild(deleteButton);
}

async function deleteBlogpost(postId) {
  try {
    await blogApi.deleteBlogpost(postId);
    window.location.href = `../index.html`;
  } catch (error) {
    if (error instanceof AuthError) {
      alert("Failed to delete post. You must be logged in to delete a post.");
      return;
    }
    alert("Failed to delete post");
  }
}
document.addEventListener("DOMContentLoaded", () => {
  getBlogpostByID();
  // copyToClipboard();
});
