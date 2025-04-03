import { login } from "../api/auth/login.js";

document
  .querySelector("form[name='login']")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    try {
      const userData = await login({ email, password });
      alert("Login successful!");
      // Redirect to another page or perform additional actions
      window.location.href = "/dashboard"; // Example redirect
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  });
