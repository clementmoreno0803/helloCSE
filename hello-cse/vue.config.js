const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === "production" ? "/helloCSE/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/index.scss";
        `
      }
    }
  }
});
