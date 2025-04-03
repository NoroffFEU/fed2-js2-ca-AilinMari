export async function getKey(name) {
  // Retrieve the API key from local storage
  return localStorage.getItem(name);
}
