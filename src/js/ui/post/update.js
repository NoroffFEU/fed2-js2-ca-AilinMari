import { SocialApi } from "../../api/apiClient";
import { repoUrl } from "../../api/constants";
let apiClient = new SocialApi();

const url = new URL(window.location.href); // Get current page URL
const postId = url.searchParams.get("id"); // Get postId from URL query parameters

async function fetchPostData(postId) {
  try {
    const post = await apiClient.getPostById(postId);

    populateFormFields(post.data);
  } catch (error) {
    console.error("Error fetching post data:", error);
    alert("Failed to fetch post data. Please try again.");
  }
}

function populateFormFields(post) {
  document.getElementById("post-title").value = post.title;
  document.getElementById("post-body").value = post.body;
  if (post.media) {
    document.getElementById("post-image-url").value = post.media.url || "";
    document.getElementById("post-image-alt").value = post.media.alt || "Image";
  }
  document.getElementById("post-tags").value = post.tags
    ? post.tags.join(", ")
    : "";
}

export async function updatePost() {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to update a post.");
    window.location.href = repoUrl + "/auth/login/"; // Redirect to login page
    return;
  }

  if (!postId) {
    console.error("Post ID not found in the URL.");
    return;
  }

  const title = document.getElementById("post-title").value.trim();
  const body = document.getElementById("post-body").value.trim();
  const tagsInput = document.getElementById("post-tags").value.trim();
  const imageUrl = document.getElementById("post-image-url").value.trim();
  const imageAlt =
    document.getElementById("post-image-alt").value.trim() || "Image"; // Fallback to "Image" if empty

  // Validate required fields
  if (!title || !body) {
    alert("Title and body are required fields.");
    return;
  }

  // Convert tags into an array
  const tags = tagsInput ? tagsInput.split(",").map((tag) => tag.trim()) : [];

  // Create media object
  const media = imageUrl ? { url: imageUrl, alt: imageAlt } : null;

  try {
    // Send request to update post
    const updatedPost = await apiClient.updatePost(
      postId,
      title,
      body,
      tags,
      media
    );

    // Redirect to the updated post page
    window.location.href = repoUrl + "/post/?id=" + updatedPost.data.id;
  } catch (error) {
    console.error("Error updating post:", error);
    alert("Failed to update post. Please try again.");
  }
}

// Fetch and populate form fields when the page loads
if (postId) {
  fetchPostData(postId);
}
