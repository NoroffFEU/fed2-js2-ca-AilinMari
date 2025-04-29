import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        login: resolve(__dirname, "./auth/login/index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        register: resolve(__dirname, "./auth/register/index.html"),
        Viewprofile: resolve(__dirname, "./profile/view/index.html"),
        Myprofile: resolve(__dirname, "./profile/me/index.html"),
        post: resolve(__dirname, "./post/index.html"),
        editPost: resolve(__dirname, "./post/edit/index.html"),
        createPost: resolve(__dirname, "./post/create/index.html"),
      },
    },
  },
});
