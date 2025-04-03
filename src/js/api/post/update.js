import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function updatePost(id, { title, body, tags, media }) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({ title, body, tags, media }),
    });
    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
