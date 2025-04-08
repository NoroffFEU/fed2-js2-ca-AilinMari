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
      alert("Login successful!");

      // Fetch and log arrays for the logged-in user
      const blogPosts = await apiClient.getBlogposts();
      console.log(`Blog posts for user ${email}:`, blogPosts);

    //   window.location.href = "/feed";
    } catch (error) {
      alert(
        error.message || "Login failed. Please check your username or password."
      );
    }
  });
