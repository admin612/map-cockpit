<template>
  <div
    :class="{
      progressBar: true,
      yellow: color == 'yellow',
      green: color == 'green',
    }"
  >
    <p :style="`width:${per}%`" :data-per="label || `${parseInt(per)}﹪`"></p>
  </div>
</template>
<script>
export default {
  props: ["color", "per", "label"],
};
//
</script>
<style lang="less" scoped>
.progressBar {
  width: 100%;
  margin-top: 4px;
  height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 2px;
  p {
    position: relative;
    height: 100%;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%
    );
    background-size: 1% 100%;
    background-repeat: repeat-x;
    &:after {
      position: absolute;
      display: block;
      padding-left: 2px;
      right: 0;
      top: 50%;
      transform: translate(100%, -50%);
      content: attr(data-per);
      white-space: nowrap;
      color: rgba(255, 255, 255, 0.5);
      font-size: 10px;
      zoom: 0.8;
    }
  }
  &.yellow {
    border-color: #ffd15c;
    p {
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        #ffd15c 50%
      );
      &:after {
        color: #ffd15c;
      }
    }
  }
  &.green {
    border-color: #2de350;
    p {
      background-image: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        #2de350 50%
      );
      &:after {
        color: #2de350;
      }
    }
  }
}
</style>
