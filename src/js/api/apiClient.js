import {
  API_BASE_URL,
  API_AUTH,
  API_AUTH_LOGIN,
  API_KEY,
} from "./constants.js"; // Import API_BASE_URL
import { API_SOCIAL_PROFILES, API_SOCIAL_POSTS } from "./constants.js";
import { headers } from "./headers.js";

/**
 * Custom error class for handling authentication errors.
 */
export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}

export class SocialApi {
  /**
   * Helper method for performing fetch requests.
   * @param {string} url - The endpoint URL.
   * @param {object} options - Fetch options.
   * @param {string} errorMessage - Error message for failures.
   * @returns {Promise<any>} Parsed JSON response.
   */
  async _request(url, options, errorMessage) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `${errorMessage}. Status: ${response.status}. Details: ${errorDetails}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error("Request error:", error);
      throw error;
    }
  }

  /**
   * Retrieves the access token from local storage.
   * @returns {string} The access token.
   * @throws {AuthError} If the user is not logged in.
   */
  _getRequiredAccessToken() {
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      throw new AuthError("User is not logged in");
    }
    console.log("Access Token:", accessToken); // Log the token for debugging
    return accessToken;
  }

  async getUserProfile(username) {
    try {
      const accessToken = this._getRequiredAccessToken();
      const url = new URL(`${API_SOCIAL_PROFILES}/${username}`);
      url.searchParams.append("_followers", "true"); // Include the _author parameter
      url.searchParams.append("_following", "true"); // Include the _author parameter
      url.searchParams.append("_posts", "true"); // Include the _author parameter
      url.searchParams.append("_author", "true"); // Include the _author parameter
      url.searchParams.append("_avatar", "true"); // Include the _author parameter

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
        },
      };
      console.log("username", username); // Debugging API URL
      return await this._request(url.toString(), options, "Error creating ");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserProfileByAuthor(author) {
    try {
      if (!author) {
        throw new Error("Author parameter is missing.");
      }

      const url = new URL(`${API_SOCIAL_PROFILES}/${author}`);
      url.searchParams.append("_followers", "true"); // Include followers
      url.searchParams.append("_following", "true"); // Include following
      url.searchParams.append("_posts", "true"); // Include posts
      url.searchParams.append("_author", "true"); // Include author details
      url.searchParams.append("_avatar", "true"); // Include avatar details

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._getRequiredAccessToken()}`,
          "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
        },
      };

      console.log("Fetching profile for author:", author); // Debugging log
      return await this._request(
        url.toString(),
        options,
        "Error fetching user profile"
      );
    } catch (error) {
      console.error("Error in getUserProfileByauthor:", error);
      throw error;
    }
  }

  async getAllPostsByAuthor(author) {
    try {
      if (!author) {
        throw new Error("Author parameter is missing.");
      }

      const url = new URL(`${API_SOCIAL_PROFILES}/${author}/posts`);
      url.searchParams.append("_author", "true"); // Include the _author parameter
      url.searchParams.append("_media", "true"); // Include the _author parameter
      url.searchParams.append("_tags", "true"); // Include the _author parameter
      url.searchParams.append("_body", "true"); // Include the _author parameter
      url.searchParams.append("_title", "true"); // Include the _author parameter
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this._getRequiredAccessToken()}`,
          "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
        },
      };

      console.log("Fetching posts by author:", author); // Debugging log
      return await this._request(
        url.toString(),
        options,
        "Error fetching user posts"
      );
    } catch (error) {
      console.error("Error in getAllPostsByAuthor:", error);
      throw error;
    }
  }

  async getPostsByLoggedInUser() {
    const accessToken = this._getRequiredAccessToken();
    const username = localStorage.getItem("name"); // Get the username from local storage
    const url = new URL(`${API_SOCIAL_PROFILES}/${username}/posts`);

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
      },
    };

    // Rettet: Bruk username i loggen i stedet for author
    console.log("Fetching posts by username:", username); // Debugging log

    return await this._request(
      url.toString(),
      options,
      "Error fetching user posts"
    );
  }

  async getAllPosts() {
    const accessToken = this._getRequiredAccessToken();
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
      },
    };

    const { data } = await this._request(
      API_SOCIAL_POSTS + `?_author=true`,
      options,
      "Error fetching blogposts"
    );
    return data;
  }

  async getPostById(postId) {
    try {
      const accessToken = this._getRequiredAccessToken();
      const url = new URL(`${API_SOCIAL_POSTS}/${postId}`);
      url.searchParams.append("_author", "true"); // Include the _author parameter

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
        },
      };

      return await this._request(
        url.toString(),
        options,
        "Error creating blog post"
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Creates a new blog post.
   * @param {string} title - The title of the blog post.
   * @param {string} content - The body content.
   * @param {string} imageUrl - The URL of the media.
   * @param {string} [imageAlt="Default image description"] - The media description.
   * @returns {Promise<any>} The created blog post data.
   */
  async createPost(title, body, tags, media) {
    const accessToken = this._getRequiredAccessToken();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
      },
      body: JSON.stringify({ title, body, tags, media }),
    };

    return await this._request(
      API_SOCIAL_POSTS,
      options,
      "Error creating blog post"
    );
  }

/**
 * Updates a blog post by ID.
 * @param {string} postId - The ID of the blog post.
 * @param {string} title - The title of the blog post.
 * @param {string} body - The body content.
 * @param {Array<string>} tags - Tags for the post.
 * @param {Object|null} media - The media object (contains url and alt text).
 * @returns {Promise<any>} The updated blog post data.
 */
async updatePost(postId, title, body, tags, media) {
  const accessToken = this._getRequiredAccessToken();
  
  // Prepare the data to send in the request body
  const data = { title, body, tags, media };

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
    },
    body: JSON.stringify(data),
  };

  // Send the request to the API to update the post
  return await this._request(
    `${API_SOCIAL_POSTS}/${postId}`,  // The postId is in the URL
    options,
    "Error updating post"
  );
}

  /**
   * Deletes a blog post by ID.
   * @param {string} postId - The ID of the blog post.
   * @returns {Promise<void>}
   */
  async deletePost(postId) {
    const accessToken = this._getRequiredAccessToken();
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
      },
    };
    try {
      const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, options);
      if (!response.ok) {
        const errorMessage = "Failed to delete post";
        throw new Error(`${errorMessage}. Status: ${response.status}`);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Logs in a user.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<any>} User data.
   */
  async login(email, password) {
    const body = { email, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
      },
      body: JSON.stringify(body),
    };

    const { data } = await this._request(
      API_AUTH_LOGIN,
      options,
      "Login failed"
    );

    // Store user data in localStorage
    localStorage.setItem("name", data.name);
    localStorage.setItem("avatar", data.avatar.url);

    return data;
  }

  /**
   * Updates the logged-in user's profile (avatar and banner).
   * @param {string} avatar - The new avatar URL.
   * @param {string} banner - The new banner URL.
   * @returns {Promise<any>} The updated profile data.
   */

  async updateUserProfile(data) {
    const username = localStorage.getItem("name"); // Get the username from local storage
    const url = `${API_SOCIAL_PROFILES}/${username}`; // Construct the API URL
    const accessToken = this._getRequiredAccessToken();

    // Ensuring the avatar is formatted correctly as an object
    if (data.avatar && typeof data.avatar === "string") {
      data.avatar = { url: data.avatar };
    }

    if (data.banner && typeof data.banner === "string") {
      data.banner = { url: data.banner };
    }

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
      },
      body: JSON.stringify(data),
    };

    return await this._request(url, options, "Error updating user profile");
  }
  // async updateUserProfile(data) {
  //   const username = localStorage.getItem("name"); // Get the username from local storage
  //   const url = `${API_SOCIAL_PROFILES}/${username}`; // Construct the API URL
  //   const accessToken = this._getRequiredAccessToken();

  //   const options = {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${accessToken}`,
  //       "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
  //     },
  //     body: JSON.stringify(data),
  //   };

  //   return await this._request(url, options, "Error updating user profile");
  // }

  /**
   * Follows a user by username.
   * @param {string} username - The username of the user to follow.
   * @returns {Promise<any>} An array of blog posts.
   */
  async followUser(username) {
    const url = `${API_SOCIAL_PROFILES}/${username}/follow`; // Construct the API URL
    const accessToken = this._getRequiredAccessToken();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": `${API_KEY}`, // Include the API key
      },
    };

    return await this._request(url, options, "Error following user");
  }

  async unfollowUser(username) {
    const url = `${API_SOCIAL_PROFILES}/${username}/unfollow`;
    const accessToken = this._getRequiredAccessToken();

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
      },
      // Ingen body her heller
    };

    return await this._request(url, options, "Error unfollowing user");
  }

  async searchPosts(query) {
    try {
      const accessToken = this._getRequiredAccessToken();
      const url = new URL(`${API_SOCIAL_POSTS}/search`);
      url.searchParams.append("q", query);

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": `${API_KEY}`,
        },
      };

      console.log("Searching posts with query:", query);
      return await this._request(
        url.toString(),
        options,
        "Error searching posts"
      );
    } catch (error) {
      console.error("Error in searchPosts:", error);
      throw error;
    }
  }
}
