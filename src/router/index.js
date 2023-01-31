import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/views/Layout.vue";
import HomeView from "@/views/HomeView.vue";
// import JYL from "@/views/JYL/index.vue";//这个是详情页的router-view显示的内容
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "index",
        meta: {
          title: "地图驾驶舱模板",
        },
        component: HomeView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
