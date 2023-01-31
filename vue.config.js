// const autoprefixer = require("autoprefixer");
// const pxtorem = require("postcss-pxtorem");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/fwbz-cockpit" : "/",
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: "http://121.196.214.133:9100",
  },
});
