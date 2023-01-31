<template>
  <div class="m-map-box">
    <div :id="node" class="map"></div>
  </div>
</template>

<script>
import remoteLoad from "./utils/remoteLoad";
import { getScale } from "@/utils/tools.js";
import mapicon from "@/components/aMap/img/cjzy.svg";
import mapicon2 from "@/components/aMap/img/jycy.svg";
import mapicon_green from "@/components/aMap/img/tyjr.svg";
import jiemap from "@/components/map/shangcheng.json";
export default {
  props: ["lat", "lng", "zoom", "positions", "node", "mapName"],
  data() {
    return {
      AMapUI: null,
      AMap: null,
      infoWindow: null,
      map: null,
      layer: null,
      cusZoom: 12.3 + getScale() - 1,
      // center: [120.15785, 30.25772],
      center: getScale() >= 2 ? [120.22122, 30.31183] : [120.2153, 30.30084],
      icon: [mapicon_green, mapicon, mapicon2],
    };
  },
  watch: {
    positions() {
      this.map && this.initPosition();
    },
  },
  methods: {
    // 实例化地图
    initMap() {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      const AMapUI = (this.AMapUI = window.AMapUI);
      const AMap = (this.AMap = window.AMap);
      AMapUI.loadUI(["geo/DistrictExplorer"], (DistrictExplorer) => {
        const mapConfig = {
          zoom: this.cusZoom,
          cityName: "杭州",
          viewMode: "3D",
          // showLabel: false,
          // showIndoorMap: false,
          // features: ["bg", "point", "road", "building"], //'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
          animateEnable: false,
          mapStyle: "amap://styles/d840ce561c219c04d1c16ed87135b9bf",
        };
        mapConfig.center = [...this.center];
        const map = new AMap.Map(this.node, mapConfig);
        this.map = map;
        const districtExplorer = new DistrictExplorer({
          map,
        });
        this.loadMapReact(districtExplorer, map);

        this.map.on("complete", () => {
          this.positions && this.positions.length > 0 && this.initPosition();
          this.$emit("complete", this.map);
        });
        this.map.on("click", () => {
          // console.log(this.map.getCenter(), this.map.getZoom());
        });
        let color = ["#f5403d", "#f9d423", "#37dc1e"];
        jiemap.features.forEach((item, i) => {
          this.addPolygon(
            item.geometry.coordinates,
            color[i % 3],
            item.properties.name
          );
        });
      });
    },
    loadMapReact(districtExplorer, map) {
      const _this = this;
      districtExplorer.loadAreaNode(330100, function (error, areaNode) {
        //更新地图视野
        // map.setBounds(areaNode.getBounds(), null, null, true);
        //清除已有的绘制内容
        districtExplorer.clearFeaturePolygons();
        //绘制子区域
        const fillColor = "#fff"; //#49EEE4
        const strokeColor = "#96C6FF";
        districtExplorer.renderSubFeatures(areaNode, (feature) => {
          const adCode = feature.properties.adcode;
          // const isYH = adCode == 330102;
          const isYH = adCode == 0;
          isYH && _this.initMapCZ();
          return {
            cursor: "default",
            bubble: true,
            strokeColor: isYH ? strokeColor : null, //线颜色
            strokeOpacity: 1, //线透明度
            strokeWeight: 1, //线宽
            fillColor: isYH ? fillColor : null, //填充色
            fillOpacity: 0.2, //填充透明度
          };
        });
        //绘制父区域
        // districtExplorer.renderParentFeature(areaNode, {
        //   cursor: "default",
        //   bubble: true,
        //   strokeColor: null, //线颜色
        //   strokeOpacity: 1, //线透明度
        //   strokeWeight: 1, //线宽
        //   fillColor: null, //填充色
        //   fillOpacity: 0.35, //填充透明度
        // });
      });
    },
    initPosition(obj = this, positions = this.positions, isSec, iconType) {
      const _this = this;
      const scale = getScale();
      const AMap = this.AMap;
      // _this.map.on("complete", function () {
      if (obj?.layer) {
        this.map.removeLayer(obj.layer);
        // this.map.clearMap()
        obj.layer = {};
      }
      if (!positions || positions.length == 0) {
        return;
      }
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
        size: !isSec ? [26 * scale, 32 * scale] : [44 * scale, 82 * scale],
        anchor: "bottom-center",
      };
      positions.forEach((position, i) => {
        icon.image = this.icon[0];
        const curData = {
          position,
          icon,
        };
        const labelMarker = new AMap.LabelMarker(curData);
        markers.push(labelMarker);
        // const p = [];
        // 给marker绑定事件
        labelMarker.on("click", function (e) {
          const position = e.data.data && e.data.data.position;
          // 传入经纬度，设置地图中心点
          const centerP = new AMap.LngLat(...position); // 标准写法
          _this.map.setZoomAndCenter(16.91, centerP);
          setTimeout(() => {
            _this.$emit("iconClick", centerP);
          }, 0);
        });
      });
      // 一次性将海量点添加到图层
      if (this.mapName == "点位图") layer.add(markers);
      obj.layer = layer;
      // });
    },
    initMapCZ() {
      const centerP = new this.AMap.LngLat(...this.center); // 标准写法
      this.map.setZoomAndCenter(this.cusZoom, centerP);
    },
    openContent(position, refInfoContent) {
      const AMap = this.AMap;
      !this.infoWindow &&
        (this.infoWindow = new AMap.InfoWindow({
          isCustom: true, //使用自定义窗体
          content: refInfoContent, //传入 dom 对象，或者 html 字符串
          offset: new AMap.Pixel(0, -80),
        }));
      this.infoWindow.open(this.map, position);
    },
    addPolygon(data, color, address) {
      let _this = this;
      const AMap = this.AMap;
      let polygon = new AMap.Polygon({
        path: data,
        fillColor: color,
        strokeOpacity: 1,
        fillOpacity: 0.2,
        strokeColor: "#2b8cbe",
        strokeWeight: 1,
        strokeStyle: "solid",
        strokeDasharray: [5, 5],
        // draggable: true,  // 图层块移动
        zIndex: 2100,
      });
      //多边形覆盖物上点击显示窗体;
      polygon.on("click", function (e) {
        const position = [e.lnglat.lng, e.lnglat.lat];
        // 传入经纬度，设置地图中心点
        const centerP = new AMap.LngLat(...position);
        _this.map.setZoomAndCenter(14.4, centerP);
        setTimeout(() => {
          _this.$emit("polClick", address);
        }, 0);
      });
      //鼠标高亮效果
      polygon.on("mouseover", function (e) {
        polygon.setOptions({
          fillOpacity: 0.6,
        });
      });
      polygon.on("mouseout", function (e) {
        polygon.setOptions({
          fillOpacity: 0.2,
        });
      });
      this.map.add(polygon);
    },
  },
  created() {
    if (this.lng && this.lat) {
      this.center = [this.lng, this.lat];
    }
    this.zoom && (this.cusZoom = this.zoom);
    // 已载入高德地图API，则直接初始化地图
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
  },
};
</script>

<style lang="less">
.m-map-box {
  width: calc(100% + 80px);
  height: calc(100% + 80px);
  margin-top: -40px;
  margin-left: -40px;
  position: relative;
}
.m-map-box .map {
  width: 100%;
  height: 100%;
}
</style>
