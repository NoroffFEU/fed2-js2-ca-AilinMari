import { SocialApi } from "../../api/apiClient";

let apiClient = new SocialApi();


export async function updatePost(event) {
    event.preventDefault(); // Prevent default form submission
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to update a post.");
        window.location.href = "/auth/login/"; // Redirect to login page
        return;
    }

    const url = new URL(window.location.href); // Get current page URL
    const postId = url.searchParams.get("id"); // Get postId from URL query parameters
    console.log("Post ID:", postId); // Debugging line
    
    if (!postId) {
        console.error("Post ID not found in the URL.");
        return;
    }


    const title = document.getElementById("post-title").value.trim();
    const body = document.getElementById("post-body").value.trim();
    const tagsInput = document.getElementById("post-tags").value.trim();
    const imageUrl = document.getElementById("post-image-url").value.trim();
    const imageAlt = document.getElementById("post-image-alt").value.trim() || "Image"; // Fallback to "Image" if empty

    // Validate required fields
    if (!title || !body) {
        alert("Title and body are required fields.");
        return;
    }

    // Convert tags into an array
    const tags = tagsInput ? tagsInput.split(",").map(tag => tag.trim()) : [];

    // Create media object
    const media = imageUrl ? { url: imageUrl, alt: imageAlt } : null;

    try {
        // Send request to update post
        const updatedPost = await apiClient.updatePost(title, body, tags, media);
        console.log("Post updated successfully:", updatedPost);

        // Redirect to the updated post page
        window.location.href = "/post/?id=" + updatedPost.data.id;

    } catch (error) {
        console.error("Error updating post:", error);
        alert("Failed to update post. Please try again.");
    }
}
