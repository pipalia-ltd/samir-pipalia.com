import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://samir-pipalia.com",
  output: "static",
  compressHTML: false,
  build: {
    format: "preserve",
  },
});
