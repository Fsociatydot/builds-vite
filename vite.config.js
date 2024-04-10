import checker from "vite-plugin-checker"
import VitePluginBrowserSync from "vite-plugin-browser-sync"
import path from "path"
import { qrcode } from "vite-plugin-qrcode"
import handlebars from "vite-plugin-handlebars"
import EnvironmentPlugin from "vite-plugin-environment"

export default {
  plugins: [
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
      stylelint: {
        lintCommand: "stylelint ./src/**/**/*.{css,scss}  --fix",
      },
    }),
    EnvironmentPlugin("all"),
    VitePluginBrowserSync(),
    qrcode(),
    handlebars({
      context: {
        title: "Техноберинг",
      },
      partialDirectory: path.resolve(__dirname, "./src/assets/partials"),
    }),
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
        product: path.resolve(__dirname, "product/index.html"),
        login: path.resolve(__dirname, "login/index.html"),
        uikit: path.resolve(__dirname, "uikit/index.html"),
      },
    },
  },
  Build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        product: path.resolve(__dirname, "product/index.html"),
        login: path.resolve(__dirname, "login/index.html"),
        uikit: path.resolve(__dirname, "uikit/index.html"),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1)
          if (/png|jpe?g|svg|gif|tiff|bmp|webp|ico/i.test(extType)) {
            console.log(assetInfo)
            extType = "img"
          } else if (/ttf|woff|woff2/i.test(extType)) {
            extType = "fonts"
          }
          return `assets/${extType}/[name][extname]`
        },
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
      },
    },
  },
}
