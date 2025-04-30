import { onRegister } from "../../ui/auth/register";

const form = document.forms.register;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    bio: formData.get("bio") || "", // Optional field
    banner: formData.get("banner") || "", // Optional field
    avatar: formData.get("avatar") || "", // Optional field
  };
  await onRegister(userData);
});

