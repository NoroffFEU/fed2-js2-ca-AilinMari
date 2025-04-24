import { API_BASE_URL, API_AUTH, API_KEY } from './constants.js'; // Import API_BASE_URL
import { API_SOCIAL_PROFILES, API_SOCIAL_POSTS } from './constants.js';

/**
 * Custom error class for handling authentication errors.
 */
export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}

export class youStoryApi {
  constructor() {
    this.blogName = this.getBlogName();
    this.blogUrl = `${API_SOCIAL_PROFILES}/${this.blogName}/posts`;
    this.authUrl = `${API_AUTH}`;
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
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      throw new AuthError('User is not logged in');
    }
    console.log('Access Token:', accessToken); // Log the token for debugging
    return accessToken;
  }

  /**
   * Retrieves the blog name from local storage.
   * @returns {string} The blog name.
   */
  getBlogName() {
    const loggedInUserName = localStorage.getItem('name');
    return loggedInUserName ? loggedInUserName : 'name';
  }

  /**
   * Fetches a single blog post by ID.
   * @param {string} postId - The ID of the blog post.
   * @returns {Promise<any>} The blog post data.
   */
  async getBlogpostByID(postId) {
    const url = `${this.blogUrl}/${postId}`;
    const { data } = await this._request(url, {}, 'Error fetching blogpost');
    return data;
  }

  /**
   * Fetches all blog posts.
   * @returns {Promise<any>} An array of blog posts.
   */
  async getBlogposts() {
    console.log('Fetching blog posts from:', this.blogUrl); // Debugging API URL

    const accessToken = this._getRequiredAccessToken();

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`, // Include the API key
      },
    };

    const { data } = await this._request(
      this.blogUrl,
      options,
      'Error fetching blogposts',
    );
    return data;
  }

  
async getAllBlogposts() {
  const accessToken = this._getRequiredAccessToken();
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      'X-Noroff-API-Key': `${API_KEY}`, // Include the API key
    },
  };

  const { data } = await this._request(
    API_SOCIAL_POSTS + `/?_author=true`,
    options,
    'Error fetching blogposts',
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
    imageAlt = 'Default image description',
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`, // Include the API key
      },
      body: JSON.stringify(data),
    };

    return await this._request(
      this.blogUrl,
      options,
      'Error creating blog post',
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
    imageAlt = 'Default image description',
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`, // Include the API key
      },
      body: JSON.stringify(data),
    };

    return await this._request(
      `${this.blogUrl}/${postId}`,
      options,
      'Error updating blog post',
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
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`, // Include the API key
      },
    };
    try {
      const errorMessage = 'Failed to delete blog post';
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    };

    const { data } = await this._request(
      `${this.authUrl}/login`,
      options,
      'Login failed',
    );

    // Store user data in localStorage
    localStorage.setItem('name', data.name);
    localStorage.setItem('avatar', data.avatar.url);

    return data;
  }

  /**
   * Fetches the logged-in user's profile information.
   * @returns {Promise<any>} The user's profile data.
   */
  async getUserProfile() {
    const username = this.getBlogName(); // Get the logged-in user's name
    const url = `${API_SOCIAL_PROFILES}/${username}`; // Construct the API URL
    const accessToken = this._getRequiredAccessToken(); // Retrieve the access token

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Include the Authorization header
        'X-Noroff-API-Key': `${API_KEY}`, // Include the API key
      },
    };

    console.log('Request Headers:', options.headers); // Log headers for debugging

    try {
      const profileData = await this._request(
        url,
        options,
        'Error fetching user profile',
      );
      return profileData.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  /**
   * Updates the logged-in user's profile (avatar and banner).
   * @param {string} avatar - The new avatar URL.
   * @param {string} banner - The new banner URL.
   * @returns {Promise<any>} The updated profile data.
   */
  async updateUserProfile(data) {
    const username = this.getBlogName(); // Get the logged-in user's name
    const url = `${API_SOCIAL_PROFILES}/${username}`; // Construct the API URL
    const accessToken = this._getRequiredAccessToken();

    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        'X-Noroff-API-Key': `${API_KEY}`, // Include the API key
      },
      body: JSON.stringify(data),
    };

    return await this._request(url, options, 'Error updating user profile');
  }
}
