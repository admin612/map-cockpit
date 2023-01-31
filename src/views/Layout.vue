<template>
  <div class="home">
    <TitleBar />
    <LayoutMap node="LayoutMapContainer" />
    <router-view></router-view>
  </div>
</template>

<script>
import TitleBar from "./comp/TitleBar.vue";
import LayoutMap from "@/views/maps/LayoutMap.vue";
export default {
  name: "lay-out",
  components: {
    TitleBar,
    LayoutMap,
  },
  data() {
    return {};
  },
  computed: {},
};
</script>
<style lang="less" scoped>
@import "~@/style/HomeView.less";
</style>
