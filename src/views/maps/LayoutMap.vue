<template>
  <div>
    <div class="mapBox">
      <aMap
        ref="JAMap"
        :node="node"
        :positions="positions"
        :mapName="mapName"
        @complete="mapComplete"
        @polClick="change"
        @iconClick="iconClick"
      />
    </div>
    <div
      ref="JinfoContent"
      class="centerDialog mapContent"
      v-if="dialogVisible"
    >
      <p class="close" @click="dialogClose"></p>
      <h1>{{ content.name }}</h1>
      <div class="address">
        {{ content.address }}
      </div>
    </div>
    <div class="adress">
      <div @click="defaultMap">当前位置：上城区-{{ address }}</div>
    </div>
    <!-- <div class="bottom">
      <div
        :class="[{ btn: true }, { active: MapShow }]"
        @click="check('三色图')"
      >
        三色图
      </div>
      <div
        :class="[{ btn: true }, { active: !MapShow }]"
        @click="check('点位图')"
      >
        点位图
      </div>
    </div> -->
  </div>
</template>

<script>
import aMap from "@/components/aMap/index.vue";
import { getScale } from "@/utils/tools.js";

export default {
  name: "layout-map",
  components: {
    aMap,
  },
  props: ["node"],
  data() {
    return {
      content: {
        name: "上城区退役军人服务站",
        address: "地址：上城区武林街道武林社区",
      },
      boxLabel: "",
      dialogVisible: false,
      nextVisible: false,
      positions: null,
      list: {},
      bzLayer: {},
      zlLayer: {},
      pointList: [
        [120.293461, 30.315084],
        [120.295505, 30.306291],
        [120.295196, 30.300981],
        [120.29377, 30.289566],
      ],
      MapShow: true,
      mapName: "三色图",
      title: "信息预警",
      address: "全部街道",
    };
  },
  computed: {},
  watch: {
    mapName(mapName) {
      this.address = "全部街道";
      this.resetMap(mapName);
    },
  },
  mounted() {},
  beforeUnmount() {},
  methods: {
    change(msg) {
      this.address = msg;
    },
    check(name) {
      if (name != this.mapName) {
        this.mapName = name;
        this.MapShow = !this.MapShow;
        console.log(this.MapShow);
        this.$refs.JAMap.initPosition(this.bzLayer, [], true);
      }
    },
    resetMap(nv) {
      this.positions = nv == "三色图" ? [[120.19306, 30.23589]] : null;
      this.dialogClose();
      if (this.$refs.JAMap.map) {
        this.$refs.JAMap.initMapCZ();
        this.bzLayer.layer &&
          this.$refs.JAMap.initPosition(this.bzLayer, [], true);
        nv == "点位图"
          ? this.getZLPoints()
          : this.$refs.JAMap.initPosition(this.zlLayer, [], true);
      }
    },
    iconClick(position) {
      // this.dialogClose();
      this.pointList.child.map((i) => {
        if (i.lonlat[0] == position.lng && i.lonlat[1] == position.lat) {
          console.log(i);
          this.content = i;
        }
      });
      this.dialogVisible = true;
      this.$refs.JAMap.initPosition(this.bzLayer, [], true);
      this.$nextTick(() => {
        this.$refs.JAMap.openContent(position, this.$refs.JinfoContent);
      });
    },
    dialogClose() {
      // this.closePlayer();
      this.dialogVisible = false;
      this.nextVisible = false;
    },
    nextDialogClose() {
      this.nextVisible = false;
    },
    handleDetail(label) {
      this.boxLabel = label;
      this.nextVisible = true;
    },
    getZLPoints() {
      let points = this.pointList.lonlatList;
      this.$nextTick(() => {
        this.$refs.JAMap.map &&
          this.$refs.JAMap.initPosition(this.zlLayer, points, true, "green");
      });
    },
    mapComplete() {
      this.resetMap(this.$route.name);
    },
    defaultMap() {
      this.address = "全部街道";
      this.$refs.JAMap.map.setZoomAndCenter(
        12.3 + getScale() - 1,
        [120.2153, 30.30084]
      );
    },
  },
};
</script>
<style lang="less" scoped>
@c-o: #679cff;
@c-b: rgb(17, 39, 97);
.mapBox {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
}
.centerDialog {
  text-align: center;
  &:not(.mapContent) {
    position: absolute;
    z-index: 1500;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  width: 210px;
  height: 135px;
  padding: 10px 10px 17px 10px;
  background: url("@/assets/map/tips.png") no-repeat;
  background-size: 210px 135px;
  font-family: "PuHuiTi";
  font-weight: 500;
  font-size: 16px;
  color: #e0ecff;
  position: relative;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  span {
    font-weight: 400;
    font-size: 14px;
    // color: #6b9ceb;
  }
  .close {
    position: absolute;
    top: -18px;
    right: -24px;
    width: 68px;
    height: 56px;
    cursor: pointer;
    background: url("~@/assets/close.svg") center center/16px 16px no-repeat;
  }
  h1 {
    font-family: "PingFang SC";
    font-weight: 500;
    font-size: 16px;
    color: #fff;
  }
  .address {
    font-family: "PingFang SC";
    font-weight: 400;
    font-size: 12px;
    color: #fff;
    opacity: 0.5;
    padding-bottom: 11px;
  }
}
/* —————————————————— 数据相关 —————————————————— */
@c: #93c1ff;
.bzfList {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 40px;
  > p {
    font-size: 20px;
    color: #fff;
    white-space: nowrap;
    padding: 1px 0;
    overflow: hidden;
    span {
      display: inline-block;
      padding: 0 2px;
      border-left: 2px solid @c;
      text-align: center;
      &:first-child {
        border: none;
      }
      &:nth-child(1) {
        width: 37%;
      }
      &:nth-child(2) {
        width: 14%;
      }
      &:nth-child(3) {
        width: 14%;
        &[data-status="70.5"] {
          color: #2de350;
        }
        &[data-status="68.28"] {
          color: #ffd15c;
        }
      }
      &:nth-child(4) {
        width: 35%;
      }
    }
    &:first-child {
      color: @c;
      position: absolute;
      top: 60px;
      left: 35px;
      z-index: 1;
      width: 100%;
      width: ~"calc(100% - 70px)";
      height: 40px;
      background: @c-b;
    }
  }
}
.adress {
  cursor: pointer;
  width: 410px;
  height: 39px;
  background: url("@/assets/layout/adressbg.png") no-repeat;
  position: fixed;
  top: 120px;
  background-size: 410px 39px;
  left: 50%;
  transform: translate(-50%);
  font-family: "DOUYU";
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.04px;
  text-align: left;
  color: #b0cdfc;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  > div {
    height: 40px;
    background: url("@/assets/layout/poin.png") no-repeat 46px 8px;
    padding-left: 70px;
    line-height: 40px;
    background-size: 15px 19px;
  }
}
.bottom {
  width: 270px;
  position: fixed;
  bottom: 60px;
  display: flex;
  justify-content: space-between;
  left: 50%;
  transform: translate(-50%);
  .btn {
    width: 120px;
    line-height: 39px;
    font-family: "DOUYU 常规体";
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    color: #bbc8f4;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
    background: linear-gradient(
      90deg,
      rgba(95, 126, 227, 0) 0%,
      rgba(95, 126, 227, 1) 46.31%,
      rgba(95, 126, 227, 0) 100%
    );
    opacity: 0.3;
  }
  .active {
    opacity: 1;
  }
}
.tooltip {
  .sanse {
    width: 350px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    justify-content: space-between;
    .cont {
      width: 168px;
      height: 151px;
      padding: 0 14px;
      background: linear-gradient(
        147.35deg,
        rgba(95, 126, 227, 0) 0%,
        rgba(95, 126, 227, 0.3) 31.14%,
        rgba(95, 126, 227, 0) 100%
      );
      .title {
        line-height: 40px;
        font-family: "PingFang SC";
        font-weight: 500;
        font-size: 16px;
        text-align: center;
        color: #fff;
      }
      hr {
        background: rgba(42, 67, 123, 1);
      }
      ul {
        li {
          padding-top: 10px;
          span {
            display: inline-block;
            width: 20px;
            height: 6px;
            border-radius: 5px;
            margin-right: 10px;
          }
          &:nth-child(1) span {
            background: rgba(245, 64, 61, 1);
          }
          &:nth-child(2) span {
            background: rgba(249, 212, 35, 1);
          }
          &:nth-child(3) span {
            background: rgba(55, 220, 30, 1);
          }
          font-family: "PingFang SC";
          font-size: 14px;
          text-align: left;
          color: #fff;
        }
      }
    }
  }
  .dianwei {
    position: fixed;
    right: 20px;
    bottom: 40px;
    .cont {
      width: 188px;
      height: 122px;
      background: linear-gradient(
        180deg,
        rgba(95, 126, 227, 0.5) 0%,
        rgba(95, 126, 227, 0) 100%
      );
      .tip {
        padding-left: 46px;
        padding-top: 14px;
        font-family: "PingFang SC";
        font-weight: 400;
        font-size: 16px;
        color: #cedaff;
        &:nth-child(1) {
          background: url("@/assets/layout/tyjr.png") no-repeat 14px 16px;
          background-size: 22px;
        }
        &:nth-child(2) {
          background: url("@/assets/layout/cjzy.png") no-repeat 14px 16px;
          background-size: 22px;
        }
        &:nth-child(3) {
          background: url("@/assets/layout/jycy.png") no-repeat 14px 16px;
          background-size: 22px;
        }
      }
    }
  }
}
</style>
