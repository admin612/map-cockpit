<template>
  <h1>
    <span v-for="(item, index) in timeList" :key="index" :data-text="item" />
    <span
      class="sec"
      v-for="(item, index) in times"
      :key="index"
      :data-text="item"
    />
  </h1>
</template>

<script>
export default {
  name: "TimeNow",
  data() {
    return {
      time: 0,
      times: [],
      timeList: [],
    };
  },
  watch: {
    time() {
      this.getTimeList();
    },
  },
  created() {
    this.getNext();
  },
  beforeUnmount() {},
  methods: {
    getNext() {
      this.time = new Date().getTime();
    },
    getTimeList() {
      const now = new Date();
      let day = now.getDay();
      switch (day) {
        case 1:
          day = "一";
          break;
        case 2:
          day = "二";
          break;
        case 3:
          day = "三";
          break;
        case 4:
          day = "四";
          break;
        case 5:
          day = "五";
          break;
        case 6:
          day = "六";
          break;
        default:
          day = "天";
          break;
      }
      const nowStr = `${now.getFullYear()}年${
        now.getMonth() + 1
      }月${now.getDate()}日 星期${day} `;
      const nowTim = `${String(now.getHours()).padStart(2, 0)}:${String(
        now.getMinutes()
      ).padStart(2, 0)}:${String(now.getSeconds()).padStart(2, 0)}`;
      this.timeList = nowStr.split("");
      this.times = nowTim.split("");
      setTimeout(this.getNext, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
h1 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  color: #fff;
  width: 265px;
  height: 30px;
  margin-left: 20px;
  span {
    display: inline-block;
    font-family: "PingFang SC";
    font-weight: 300;
    font-size: 16px;
    text-align: left;
    width: 16px;
    height: 18px;
    &:before {
      content: attr(data-text);
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 100%;
    }
    &[data-text="年"],
    &[data-text="月"],
    &[data-text="日"] {
      width: 18px;
    }
  }
  .sec {
    display: inline-block;
    width: 12px;
    height: 18px;
    font-family: "DIN Alternate Bold";
    font-weight: 700;
    font-size: 19px;
    letter-spacing: 0.1px;
    &:before {
      content: attr(data-text);
      display: inline-block;
      width: 100%;
      height: 100%;
      line-height: 100%;
    }
    &[data-text=":"] {
      width: 5px;
    }
  }
}
</style>
