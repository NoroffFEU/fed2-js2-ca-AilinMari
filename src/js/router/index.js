// This function controls which JavaScript file is loaded on which page
// In order to add additional pages, you will need to implement them below
// You may change the behaviour or approach of this file if you choose

import { repoUrl } from "../api/constants.js";
export default async function router(pathname = window.location.pathname) {
  const repoFolderName = "fed2-js2-ca-AilinMari"; // Define the repo folder name

  // Remove repo folder name if it exists at the start of the path
  const repoPrefix = `/${repoFolderName}/`;
  if (pathname.startsWith(repoPrefix)) {
    pathname = pathname.substring(repoPrefix.length - 1); // Keep the leading slash
  }

  // Remove /index.html if it exists
  if (pathname.endsWith("/index.html")) {
    pathname = pathname.slice(0, -11); // Remove "/index.html"
    // Ensure the path ends with a slash if it's not the root path
    if (pathname === "") {
      pathname = "/";
    } else if (!pathname.endsWith("/")) {
      pathname += "/";
    }
  }

  switch (pathname) {
    case "/":
      await import("./views/home.js");
      break;
    case "/auth/":
      await import("./views/auth.js");
      break;
    case "/auth/login/":
      await import("./views/login.js");
      break;
    case "/auth/register/":
      await import("./views/register.js");
      break;
    case "/post/":
      await import("./views/post.js");
      break;
    case "/post/edit/":
      await import("./views/postEdit.js");
      break;
    case "/post/create/":
      await import("./views/postCreate.js");
      break;
    case "/profile/":
      await import("./views/myProfile.js");
      break;
    case "/profile/me/":
      await import("./views/myProfile.js");
      break;
    case "/profile/view/":
      await import("./views/viewProfile.js");
      break;
    default:
      await import("./views/notFound.js");
  }
}
