import { authGuard } from "../../utilities/authGuard";

authGuard();

import { SocialApi } from "../../api/apiClient";
import { updatePost } from "../../ui/post/update";

let apiClient = new SocialApi();

const form = document.forms.updatePost;

form.addEventListener("submit", updatePost);
