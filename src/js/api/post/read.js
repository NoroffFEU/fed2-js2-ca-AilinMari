import { API_SOCIAL_POSTS, API_KEY } from "../constants";
// import { headers } from "../headers";

export async function readPost(id) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "GET",
      accept: "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
      XNoroffAPIKey: `${API_KEY}`,
      contentType: "application/json",
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

export async function readPostsByUser(username, limit = 12, page = 1, tag) {
  try {
    const url = new URL(`${API_SOCIAL_POSTS}?author=${username}`);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
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
