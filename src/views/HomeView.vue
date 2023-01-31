<template>
  <div class="contentBox">
    <div class="left">
      <HomeLeft></HomeLeft>
    </div>
    <div class="right">
      <warning></warning>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeViewDZ",
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
  watch: {},
  created() {},
  beforeUnmount() {},
};
</script>
<style lang="less" scoped>
@import "~@/style/HomeView.less";

.contentBox {
  .left {
    width: 275px;
    // > div {
    //   &:nth-child(1) {
    //     height: 305px;
    //   }
    //   &:nth-child(2) {
    //     height: 317px;
    //   }
    //   &:nth-child(3) {
    //     height: 317px;
    //   }
    // }
  }

  .right {
    width: 420px;
    height: 457px;
    // height: 145px;
    overflow: hidden;
  }
}
</style>
