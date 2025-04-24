import { authGuard } from "../../utilities/authGuard";
import { API_SOCIAL_POSTS, API_KEY } from "../../api/constants";
import { youStoryApi } from "../../api/apiClient";

authGuard();

let apiClient = new youStoryApi();

const blogpost = await apiClient.getAllBlogposts();
console.log(blogpost); // Debugging log

function renderBlogposts(posts) {
  const blogpostsGrid = document.getElementById("storyfeed");
  if (!blogpostsGrid) {
    console.error("Error: #blogpostsContainer not found in DOM");
    return;
  }
  blogpostsGrid.innerHTML = ""; // Clear existing content

  if (!Array.isArray(blogpost) || blogpost.length === 0) {
    blogpostsGrid.innerHTML = "<p>No blog posts available.</p>";
    return;
  }

  posts.forEach((blogpost) => {
    const postContainer = document.createElement("div");
    postContainer.className = "container";

    const link = document.createElement("a");
    link.href = API_SOCIAL_POSTS + "/" + blogpost.id;

    const img = document.createElement("img");
    img.src = blogpost.media?.url;
    img.alt = blogpost.media?.alt;

    const title = document.createElement("h2");
    title.textContent = blogpost.title;

    const textContentContainer = document.createElement("div");
    textContentContainer.className = "textContentContainer";

    const author = document.createElement("p");
    author.textContent = blogpost.author?.name;
    author.className = "author-name";
    author.href = API_SOCIAL_POSTS + "/" + blogpost.author?.id;

    const bodyText = document.createElement("p");
    bodyText.textContent = blogpost.body;
    bodyText.className = "bodyText";
    bodyText.href = API_SOCIAL_POSTS + "/" + blogpost.body;
    bodyText.style.display = "none"; // Hide the body text by default
    bodyText.addEventListener("click", () => {
      bodyText.style.display = bodyText.style.display === "none" ? "block" : "none";
    });

    postContainer.appendChild(title);
    postContainer.appendChild(img);
    postContainer.appendChild(textContentContainer);
    textContentContainer.appendChild(author);
    textContentContainer.appendChild(bodyText);
    postContainer.appendChild(link);
    blogpostsGrid.appendChild(postContainer);
  });
}

async function handleBlogpostsView() {
  const blogposts = await apiClient.getAllBlogposts();
  console.log(blogposts);
  renderBlogposts(blogposts);
}

handleBlogpostsView();
