import { youStoryApi } from "../api/apiClient.js";

const apiClient = new youStoryApi();

document
  .querySelector("form[name='login']")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const data = await apiClient.login(email, password); // Use youStoryApi's login method
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("name", data.name); // Store the logged-in user's name
      alert("Login successful!");

      // Fetch and log arrays for the logged-in user
      const blogPosts = await apiClient.getBlogposts();
      console.log(`Blog posts for user ${data.name}:`, blogPosts);

      // window.location.href = "/index.html"; // Redirect to the main page after successful login
    } catch (error) {
      alert(
        error.message || "Login failed. Please check your username or password."
      );
    }
  });
