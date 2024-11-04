import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig(() => {
export default defineConfig(() => {
  
  return {
    plugins: [react()],

    server: {
      port: 3001,
    },
    //absolute path
    resolve: {
      alias: {
        src: "/src",
      },
    },
    // define: {
    //   VITE_APIURL: JSON.stringify(env.VITE_APIURL),
    // },
  };
  
});
