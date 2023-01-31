<template>
  <div id="container"></div>
</template>

<script>
import remoteLoad from "@/utils/remoteLoad";
import image from "@/components/aMap/img/tzIcon_yellow.svg";
export default {
  props: ["positions"],
  data() {
    return {
      map: null,
      Amap: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (window.AMap) {
        this.initMap();
        // 未载入高德地图API，则先载入API再初始化
      } else {
        const MapKey = "e0b2b795bcd2a0f79f0de02a7ff26385";
        const securityJsCode = "d056558cf29ed70c4b39903430ccb130";
        window._AMapSecurityConfig = { securityJsCode };
        remoteLoad(`https://webapi.amap.com/maps?v=2.0&key=${MapKey}`)
          .then(() => {
            remoteLoad("https://webapi.amap.com/ui/1.1/main.js").then(
              this.initMap
            );
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  },
  methods: {
    initMap() {
      const AMap = (this.AMap = window.AMap);
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        center: [120.19403, 30.23546],
        zoom: 16,
      });
    },
    initPosition(obj = this, positions = this.positions) {
      const _this = this;
      const AMap = this.AMap;
      // 创建 AMap.LabelsLayer 图层
      const layer = new AMap.LabelsLayer({
        zooms: [3, 20],
        zIndex: 2000,
        collision: false,
      });
      // 将图层添加到地图
      _this.map.add(layer);
      const markers = [];
      const icon = {
        type: "image",
        image,
        size: [22, 41],
        anchor: "bottom-center",
      };
      positions.forEach((position) => {
        const curData = {
          position,
          icon,
        };
        const labelMarker = new AMap.LabelMarker(curData);
        markers.push(labelMarker);
        // 给marker绑定事件
        labelMarker.on("click", function (e) {
          const position = e.data.data && e.data.data.position;
          // 传入经纬度，设置地图中心点
          const centerP = new AMap.LngLat(...position);
          _this.map.setZoomAndCenter(16, centerP);
          setTimeout(() => {
            _this.$emit("iconClick", centerP);
          }, 0);
        });
      });
      // 一次性将海量点添加到图层
      layer.add(markers);
    },
    openContent(position, refInfoContent) {
      const AMap = this.AMap;
      !this.infoWindow &&
        (this.infoWindow = new AMap.InfoWindow({
          isCustom: true, //使用自定义窗体
          content: refInfoContent, //传入 dom 对象，或者 html 字符串
          offset: new AMap.Pixel(0, -45),
        }));
      this.infoWindow.open(this.map, position);
    },
  },
};
</script>
