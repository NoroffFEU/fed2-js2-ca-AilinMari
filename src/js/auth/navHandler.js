// document.querySelector(".hamburger").addEventListener("click", () => {
//   const navLinks = document.querySelector(".nav-links");
//   navLinks.classList.toggle("active");
// });

// document.querySelector(".hamburger").addEventListener("click", () => {
//   const navLinks = document.querySelector(".nav-links");
//   navLinks.classList.toggle("active");
// });

// Check if the user is logged in
// const token = localStorage.getItem("token");
// const userLinks = document.querySelector("#user-links");

// if (token) {
//   // User is logged in, show user-links
//   userLinks.style.display = "block";
// } else {
//   // User is not logged in, hide user-links
//   userLinks.style.display = "none";
// }

// const searchInput = document.querySelector("#search");
// const searchButton = document.querySelector("#search-button");

// if (searchButton) {
//   searchButton.addEventListener("click", () => {
//     if (searchInput.style.display === "none" || !searchInput.style.display) {
//       // First click: Show the search input
//       searchInput.style.display = "block";
//       searchInput.focus(); // Focus the input for user convenience
//     } else {
//       // Second click: Perform the search
//       const query = searchInput.value.trim();
//       if (query) {
//         // Redirect to the profile page with the author query parameter
//         window.location.href = `/profile/?author=${encodeURIComponent(query)}`;
//       } else {
//         alert("Please enter a username to search.");
//       }
//     }
//   });
// }

// // Ensure the search input is hidden by default
// searchInput.style.display = "none";
