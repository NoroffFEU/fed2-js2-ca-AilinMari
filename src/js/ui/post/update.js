import { SocialApi } from "../../api/apiClient";

let apiClient = new SocialApi();
export async function updatePost() {

    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to update a post.");
        window.location.href = "/auth/login/";
        return;
    }

    url = new URL(window.location.href);
    const postId = url.searchParams.get("id"); // Get the post ID from the URL
    

    if (!postId) {
        console.error("Post ID not found in the URL.");
        return;
    }
    console.log("Post ID:", postId); // Debugging line
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
        const updatedPost = await apiClient.updatePost(postId, title, body, tags, media);
        console.log("Post updated successfully:", updatedPost);

        window.location.href = "/post/?id=" + updatedPost.data.id; // Redirect to the updated post page

    } catch (error) {
        console.error("Error updating post:", error);
        alert("Failed to update post. Please try again.");
    }

}
