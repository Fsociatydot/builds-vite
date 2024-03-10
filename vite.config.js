import checker from "vite-plugin-checker"
import VitePluginBrowserSync from "vite-plugin-browser-sync"
import path from "path"
import { qrcode } from "vite-plugin-qrcode"

export default {
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      stylelint: {
        lintCommand: "stylelint ./src/**/*.{css,scss} --fix",
      },
    }),
    VitePluginBrowserSync(),
    qrcode(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/assets"),
    },
  },
  Host: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        login: path.resolve(__dirname, "login/index.html"),
      },
    },
  },
  Build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        login: path.resolve(__dirname, "login/index.html"),
      },
    },
  },
}
