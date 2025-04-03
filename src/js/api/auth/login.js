export async function login({ email, password }) {
  try {
    const response = await fetch("https://api.noroff.dev/v2/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status); // Log response status
    console.log("Response details:", response); // Log full response object

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Login failed: ${errorData.message || response.statusText}`
      );
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    console.log("Login successful:", data);

    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
}
