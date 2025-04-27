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

const searchInput = document.querySelector("#search");
const searchButton = document.querySelector("#search-button");

if (searchButton) {
  searchButton.addEventListener("click", () => {
    if (searchInput.style.display === "none" || !searchInput.style.display) {
      // First click: Show the search input
      searchInput.style.display = "inline-block";
      searchInput.focus(); // Focus the input for user convenience
    } else {
      // Second click: Perform the search
      const query = searchInput.value.trim();
      if (query) {
        // Redirect to the profile page with the author query parameter
        window.location.href = `/profile/view/?author=${encodeURIComponent(query)}`;
      } else {
        alert("Please enter a username to search.");
      }
    }
  });
}

// Ensure the search input is hidden by default
searchInput.style.display = "none";
