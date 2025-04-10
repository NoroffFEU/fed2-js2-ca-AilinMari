import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";

export async function createPost({ title, body, tags, media }) {
  try {
    const response = await fetch(API_SOCIAL_POSTS, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ title, body, tags, media }),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
