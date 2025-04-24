alert("Single Post Page");
import { youStoryApi } from "../../api/apiClient.js";
import { authGuard } from "../../utilities/authGuard.js";
import { API_SOCIAL_POSTS } from "../../api/constants.js";

let apiClient = new youStoryApi();
authGuard();


const postId = new URLSearchParams(window.location.search).get("id");

