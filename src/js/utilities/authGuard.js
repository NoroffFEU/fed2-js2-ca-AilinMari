const repoUrl = "https://norofffeu.github.io/fed2-js2-ca-AilinMari"; // Get the base URL of the repository

export function authGuard() {
  if (!localStorage.token) {
    alert("You must be logged in to view this page");
    window.location.href = repoUrl + "/auth/login/";
  }
}
