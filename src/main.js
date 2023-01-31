import "amfe-flexible";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Select, message } from "ant-design-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "ant-design-vue/lib/select/style/css"; // 加载 CSS
import "@/assets/style/clear.less";
import "@/assets/font/font.css";
import CountUp from "@/components/countUp";
import "echarts-gl"; // 3d图表库

const app = createApp(App);

app.component("count-up", CountUp);
// const app = createApp(App);
app.use(Select);
app.use(require("vue-wechat-title"));
app.use(store).use(router).use(ElementPlus).mount("#app");
app.config.globalProperties.$message = message;

window.addEventListener(
  "resize",
  () => {
    window.location.reload();
  },
  false
);
