<template>
  <router-view v-wechat-title="$route.meta.title"></router-view>
</template>

<style lang="less">
html,
body {
  background-color: rgb(6, 13, 39);
  > div > div > div.ant-select-dropdown {
    background-color: rgba(12, 32, 89, 0.7);
    color: #fff;
    .ant-select-item {
      color: #fff;
    }
    .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
      background-color: rgba(12, 32, 89);
      color: #fff;
    }
    .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
      color: rgba(12, 32, 89);
      background-color: rgba(12, 32, 89, 0.4);
    }
  }
}
</style>
