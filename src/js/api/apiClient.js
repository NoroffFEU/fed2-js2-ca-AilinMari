import { API_BASE_URL } from "./constants.js"; // Import API_BASE_URL

/**
 * Custom error class for handling authentication errors.
 */
export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthError";
  }
}

export class youStoryApi {
  constructor() {
    this.blogName = this.getBlogName();
    this.blogUrl = `${API_BASE_URL}/blog/posts/${this.blogName}`;
    this.authUrl = `${API_BASE_URL}/auth`;
  }

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
        throw new Error(`${errorMessage}. Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves the access token from local storage.
   * @returns {string} The access token.
   * @throws {AuthError} If the user is not logged in.
   */
  _getRequiredAccessToken() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new AuthError("User is not logged in");
    }
    return accessToken;
  }

  /**
   * Retrieves the blog name from local storage.
   * @returns {string} The blog name.
   */
  getBlogName() {
    const loggedInUserName = localStorage.getItem("name");
    return loggedInUserName ? loggedInUserName : "ailin_user";
  }

  /**
   * Fetches a single blog post by ID.
   * @param {string} postId - The ID of the blog post.
   * @returns {Promise<any>} The blog post data.
   */
  async getBlogpostByID(postId) {
    const url = `${this.blogUrl}/${postId}`;
    const { data } = await this._request(url, {}, "Error fetching blogpost");
    return data;
  }

  /**
   * Fetches all blog posts.
   * @returns {Promise<any>} An array of blog posts.
   */
  async getBlogposts() {
    const { data } = await this._request(
      this.blogUrl,
      {},
      "Error fetching blogposts"
    );
    return data;
  }

  /**
   * Creates a new blog post.
   * @param {string} title - The title of the blog post.
   * @param {string} content - The body content.
   * @param {string} imageUrl - The URL of the media.
   * @param {string} [imageAlt="Default image description"] - The media description.
   * @returns {Promise<any>} The created blog post data.
   */
  async createBlogpost(
    title,
    content,
    imageUrl,
    imageAlt = "Default image description"
  ) {
    const accessToken = this._getRequiredAccessToken();
    const data = {
      title,
      body: content,
      media: {
        url: imageUrl,
        alt: imageAlt,
      },
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    return await this._request(
      this.blogUrl,
      options,
      "Error creating blog post"
    );
  }

  /**
   * Updates a blog post by ID.
   * @param {string} postId - The ID of the blog post.
   * @param {string} title - The title of the blog post.
   * @param {string} content - The body content.
   * @param {string} imageUrl - The URL of the media.
   * @param {string} [imageAlt="Default image description"] - The media description.
   * @returns {Promise<any>} The updated blog post data.
   */
  async updateBlogpost(
    postId,
    title,
    content,
    imageUrl,
    imageAlt = "Default image description"
  ) {
    const accessToken = this._getRequiredAccessToken();
    const data = {
      title,
      body: content,
      media: {
        url: imageUrl,
        alt: imageAlt,
      },
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    };

    return await this._request(
      `${this.blogUrl}/${postId}`,
      options,
      "Error updating blog post"
    );
  }

  /**
   * Deletes a blog post by ID.
   * @param {string} postId - The ID of the blog post.
   * @returns {Promise<void>}
   */
  async deleteBlogpost(postId) {
    const accessToken = this._getRequiredAccessToken();
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const errorMessage = "Failed to delete blog post";
      const response = await fetch(`${this.blogUrl}/${postId}`, options);
      if (!response.ok) {
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
      },
      body: JSON.stringify(body),
    };

    const { data } = await this._request(
      `${this.authUrl}/login`,
      options,
      "Login failed"
    );
    return data;
  }

  /**
   * Registers a new user.
   * @param {string} name - The user's name.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<any>} Registration data.
   */
  async register(name, email, password) {
    const body = { name, email, password };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(body),
    };

    const { data } = await this._request(
      `${this.authUrl}/register`,
      options,
      "Registration failed"
    );
    return data;
  }
}
