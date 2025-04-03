import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function deletePost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
