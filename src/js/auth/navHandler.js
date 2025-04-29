import { SocialApi } from "../api/apiClient.js";
import { API_SOCIAL_POSTS, API_KEY } from "../api/constants";

const apiClient = new SocialApi();

// Check if the user is logged in
const token = localStorage.getItem("token");

// Select the "Login" and "Register" links
const loginLink = document.querySelector("a[href='/auth/login/']");
const registerLink = document.querySelector("a[href='/auth/register/']");

if (token) {
  // User is logged in, hide "Login" and "Register" links
  if (loginLink) loginLink.style.display = "none";
  if (registerLink) registerLink.style.display = "none";
} else {
  // User is not logged in, ensure "Login" and "Register" links are visible
  if (loginLink) loginLink.style.display = "block";
  if (registerLink) registerLink.style.display = "block";

}

const userLinks = document.querySelector("#user-links");

if (token) {
  // User is logged in, show user-links
  userLinks.style.display = "block";
} else {
  // User is not logged in, hide user-links
  userLinks.style.display = "none";
}

const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const resultsContainer = document.getElementById("search-results");
const searchbar = document.querySelector(".searchbar"); // Søkebaren som inneholder input og knapp

let searchResultsVisible = false;
let searchInputVisible = false;

async function handleSearch() {
  if (!searchInputVisible) {
    searchInput.classList.remove("hidden");
    searchInput.focus();
    searchInputVisible = true;
    return;
  }

  const query = searchInput.value.trim();

  if (searchResultsVisible) {
    resultsContainer.innerHTML = "";
    searchResultsVisible = false;
    return;
  }

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  try {
    const response = await apiClient.searchPosts(query);
    const posts = response.data;
    renderSearchResults(posts);
    searchResultsVisible = true;
  } catch (error) {
    console.error("Error searching for posts:", error);
    resultsContainer.innerHTML = "<p>No posts found</p>";
    searchResultsVisible = false;
  }
}

function renderSearchResults(posts) {
  resultsContainer.innerHTML = "";

  if (posts.length === 0) {
    resultsContainer.innerHTML = "<p>No posts found.</p>";
    return;
  }

  posts.forEach((post) => {
    const link = document.createElement("a");
    link.classList.add("post-card");
    link.href = `../../post/?id=${post.id}`;
    link.innerHTML = `
      <img src="${post.media.url}" alt="${post.media.alt || `${post.title}'s image`}" class="post-image" />
      <h4>${post.title}</h4>
    `;
    resultsContainer.appendChild(link);
  });
}

searchButton.addEventListener("click", handleSearch);

// Enter-søk
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});

// Legg til event listener for å lukke søkefeltet når du klikker utenfor
document.addEventListener("click", (event) => {
  if (!searchbar.contains(event.target)) {
    searchInput.classList.add("hidden");
    searchInputVisible = false;
  }
});