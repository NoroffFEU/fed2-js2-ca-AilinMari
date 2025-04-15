import { API_AUTH_LOGIN, API_KEY } from "../constants.js";
import { readPost } from "../post/read.js";


/**
 * Logs in a user by sending their credentials to the API.
 * @param {Object} credentials - The user's login credentials.
 * @param {string} credentials.email - The user's email.
 * @param {string} credentials.password - The user's password.
 * @returns {Promise<Object>} The response data containing the access token.
 */
console.log(readPost(8032));

export async function login({ email, password }) {
  try {
    console.log("Sending login request to:", API_AUTH_LOGIN); // Debugging log
    console.log("Request payload:", { email, password }); // Debugging log

    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": `${API_KEY}`,
       },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status); // Debugging log

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response data:", errorData); // Debugging log
      throw new Error(
        `Login failed: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Login successful:", data); // Debugging log
    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
  
}
