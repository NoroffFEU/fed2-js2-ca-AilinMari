// Use Postman, or JavaScript to get your API key
// In Workflow we will learn how to secure this information
export const API_KEY = "replace-with-your-key";

export const API_BASE_URL = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE_URL}/auth`;

export const API_AUTH_LOGIN = `${API_BASE_URL}/auth/login`;

export const API_AUTH_REGISTER = `${API_BASE_URL}/auth/register`;

export const API_AUTH_KEY = `${API_AUTH}/create-api-key`;

export const API_SOCIAL = `${API_BASE_URL}/social`;

export const API_SOCIAL_POSTS = `${API_BASE_URL}/social/posts`;

export const API_SOCIAL_PROFILES = `${API_BASE_URL}/social/profiles`;
