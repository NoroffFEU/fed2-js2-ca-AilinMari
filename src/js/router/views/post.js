alert("Single Post Page");
import { youStoryApi } from "../../api/apiClient.js";
import { authGuard } from "../../utilities/authGuard.js";

let apiClient = new youStoryApi();




authGuard();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
getBlogpostByID();
async function getBlogpostByID() {
  try {
    let blogpost = await apiClient.getBlogpostByIdAndAuthor(postId);

    renderBlogpostbyId(postId, blogpost);
    console.log(blogpost);
  } catch (error) {
    console.error("Error fetching blogpost", error);
  }


// function renderBlogpost(blogpost) {
//   const postContainer = document.getElementById("single-post");
//   if (!postContainer) {
//     console.error("Error: #blogpostsContainer not found in DOM");
//     return;
//   }
//   postContainer.innerHTML = ""; // Clear existing content

//   if (!Array.isArray(blogpost) || blogpost.length === 0) {
//     postContainer.innerHTML = "<p>No blog posts available.</p>";
//     return;
//   }

function renderPost(post) {
    const container = document.getElementById("single-post");
    if (!container) return;
    container.innerHTML = ''; // clear old content

    if (post.media?.url) {
      const img = document.createElement("img");
      img.src = post.media.url;
      img.alt = post.media.alt || '';
      container.appendChild(img);
    }
    const title = document.createElement("h1");
    title.textContent = post.title;
    container.appendChild(title);

    const author = document.createElement("p");
    author.textContent = "By: " + (post.author?.name || 'Unknown');
    container.appendChild(author);

    // …add body, tags, edit/delete buttons etc.…
  }

  renderPost(blogpost);

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
  getBlogpostByID();
});
}
