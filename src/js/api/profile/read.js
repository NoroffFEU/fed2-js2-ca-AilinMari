import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

export async function readProfile(name) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${name}`, {
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function readProfiles(limit, page) {
  try {
    const url = new URL(API_SOCIAL_PROFILES);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);

    const response = await fetch(url, { headers: headers() });
    if (!response.ok) {
      throw new Error("Failed to fetch profiles");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}


