import { authGuard } from "../../utilities/authGuard";
import { youStoryApi } from "../../api/apiClient";
import { renderProfileInfo } from "../../api/profile/logedin.js";

authGuard();

let apiClient = new youStoryApi();

// Extract the username from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("author");

if (!username) {
  console.error("Error: No username specified in the URL.");
}


