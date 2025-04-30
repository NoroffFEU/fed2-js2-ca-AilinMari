import { SocialApi } from "../../api/apiClient.js";
import { repoUrl } from "../../api/constants.js"; // Import the repoUrl constant
const apiClient = new SocialApi();

export async function createPost() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to create a post.");
    window.location.href = repoUrl + "/auth/login/";
    return;
  }

  // Check if the user is logged in
  const user = await apiClient.getUser(token);
  if (!user) {
    alert("You must be logged in to create a post.");
    window.location.href = repoUrl + "/auth/login/";
    return;
  }
}
const form = document.getElementById("create-post-form"); // Assuming you have a form
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get values from input fields
    const title = document.getElementById("post-title").value.trim();
    const body = document.getElementById("post-body").value.trim();
    const tagsInput = document.getElementById("post-tags").value.trim();
    const imageUrl = document.getElementById("post-image-url").value.trim();
    const imageAlt = document.getElementById("post-image-alt").value.trim() || "Image"; // Fallback if empty

    // Convert tags into an array
    const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [];

    // Create media object
    const media = imageUrl ? { url: imageUrl, alt: imageAlt } : null;

    try {
      const createdPost = await apiClient.createPost(title, body, tags, media);
      console.log("Post created successfully:", createdPost);

window.location.href = repoUrl + "/post/?id=" + createdPost.data.id; // Redirect to the new post page

      // Optional: Redirect to the homepage or the new post
      // window.location.href = `/post/?id=${createdPost.data.id}`;

    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    }
  });
}
