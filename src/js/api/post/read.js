import { API_SOCIAL_POSTS, API_KEY } from "../constants";
import { headers } from "../headers";

export async function readPost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": `${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function readPosts(limit = 12, page = 1, tag) {
  try {
    const url = new URL(API_SOCIAL_POSTS);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    if (tag) url.searchParams.append("tag", tag);

    const response = await fetch(url, { headers: headers() });
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function readPostsByUser(username, postId, limit = 12, page = 1, tag) {
  try {
    const url = new URL(`${API_SOCIAL_POSTS}/${username}`);
    // url.searchParams.append("limit", limit);
    // url.searchParams.append("page", page);
    url.searchParams.append("_author", "true");
    url.searchParams.append("author", username); // Filter by username
    url.searchParams.append("id", postId);
    if (tag) url.searchParams.append("tag", tag);

    const response = await fetch(url, { headers: headers() });
    if (!response.ok) {
      throw new Error("Failed to fetch user's posts");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function readPostsByAuthor(username, limit = 12, page = 1) {
  try {
    const url = new URL(`${API_SOCIAL_POSTS}`);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    url.searchParams.append("_author", "true");
    url.searchParams.append("author", username); // Filter by username

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": `${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts by author");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function readPostBy(postId) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}?_author=true`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": `${API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch post by ID");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
