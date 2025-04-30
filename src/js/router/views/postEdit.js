import { authGuard } from "../../utilities/authGuard";
import { SocialApi } from "../../api/apiClient";
import { updatePost } from "../../ui/post/update";

authGuard();

let apiClient = new SocialApi();

// Reference the form
const form = document.forms.updatePost;

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      await updatePost(event); // Call updatePost function
      form.reset(); // Optional: Reset the form after successful submission
    } catch (error) {
      console.error("Error during post update:", error);
    }
  });
} else {
  console.error("Form with name 'updatePost' not found.");
}