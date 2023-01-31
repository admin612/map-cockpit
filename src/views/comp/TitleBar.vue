<template>
  <div class="titleBox">
    <TimeNow />
    <div class="title">地图驾驶舱模板</div>
    <h1></h1>
  </div>
</template>

<script>
import TimeNow from "./TimeNow.vue";
export default {
  name: "title-bar",
  components: {
    TimeNow,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.titleBox {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 88px;
  background: url("~@/assets/layout/Titlebg.png") center center / 100% 100%
    no-repeat;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > .title {
    width: 638px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #fff;
    font-size: 32px;
  }
  > h1 {
    width: 260px;
    height: 30px;
    margin-left: 20px;
  }
}
</style>
