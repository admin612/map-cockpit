<template>
  <div class="childBox">
    <!-- 标题 -->
    <div class="caseTop">
      <div class="left">
        <span class="bag"></span>
        <div class="text">
          <slot name="left"></slot>
        </div>
      </div>
      <div class="right">
        <div>
          <slot name="right"></slot>
        </div>
      </div>
    </div>
    <hr class="hr" />
    <!-- 下面内容模块 -->
    <div class="caseBottom">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "childBox",
};
</script>
<style lang="less" scoped>
.childBox {
  width: 100%;
  // height: 100%;
  padding: 14px 14px 13px 14px;
  background: url("@/assets/child/bag@2x.png") no-repeat;
  background-size: 100% 100%;
  .caseTop {
    width: 100%;
    height: 26px;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .bag {
        margin-right: 8px;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url("@/assets/child/ico@2x.png") no-repeat;
        background-size: 100% 100%;
      }
      .text {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .hr {
    height: 0;
    color: #5f7ee3;
    border-bottom: 1px dashed;
    width: 100%;
    opacity: 0.4;
    // width: 100%;
    // height: 0;
    // background: transparent;
    // border: 1px dashed #5f7ee3;
    // opacity: 0.4;
  }
  .caseBottom {
    width: 100%;
    // height: 100%;
    // background-color: aliceblue;
  }
}
</style>