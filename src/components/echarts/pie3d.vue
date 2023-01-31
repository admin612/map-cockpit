<template>
  <div class="chart-container">
    <div class="chart" ref="chart"></div>
  </div>
</template>

<script>
import { getPie3D } from "./chart.js"; //工具类js，页面路径自己修改
import * as echarts from "echarts";

const color = [
  "#FFD15C",
  "#5276F2",
  "#8ED5FB",
  "#20E6A4",
  "#F24539",
  "#F7E285FF",
  "#C19259FF",
  "#EA8414FF",
  "#ffffff",
];

export default {
  name: "chart",
  data() {
    return {
      optionData: [
        {
          name: "生活服务",
          value: 23,
        },
        {
          name: "美食美味",
          value: 20,
        },
        {
          name: "旅游出行",
          value: 10,
        },
        {
          name: "生活百货",
          value: 25,
        },
        {
          name: "银行业务",
          value: 10,
        },
        {
          name: "医疗健康",
          value: 25,
        },
        {
          name: "休闲娱乐",
          value: 20,
        },
        {
          name: "教育培训",
          value: 21,
        },
        {
          name: "其他",
          value: 16,
        },
      ],
      statusChart: null,
      option: {},
    };
  },
  created() {
    this.setLabel();
  },
  mounted() {
    this.initChart();

    //根据窗口变化自动调节图表大小
    const that = this;
    window.onresize = function () {
      that.changeSize();
    };
  },
  methods: {
    // 初始化label样式
    setLabel() {
      this.optionData.forEach((item, index) => {
        item.itemStyle = {
          color: color[index],
        };
        item.label = {
          normal: {
            show: true,
            color: color[index],
            formatter: ["{b|{b}}", "{c|{c}}{b|台}", "{d|{d}%}"].join("\n"), // 用\n来换行
            rich: {
              b: {
                color: "#fff",
                lineHeight: 25,
                align: "left",
              },
              c: {
                fontSize: 22,
                color: "#fff",
                textShadowColor: "#1c90a6",
                textShadowOffsetX: 0,
                textShadowOffsetY: 2,
                textShadowBlur: 5,
              },
              d: {
                color: color[index],
                align: "left",
              },
            },
          },
        };
        item.labelLine = {
          normal: {
            lineStyle: {
              width: 1,
              color: "rgba(255,255,255,0.7)",
            },
          },
        };
      });
    },
    // 图表初始化
    initChart() {
      this.statusChart = echarts.init(this.$refs.chart, null);
      // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
      this.option = getPie3D(this.optionData, 0.8, 240, 25, 15, 0.5);
      this.statusChart.setOption(this.option);
    },
    // 自适应宽高
    changeSize() {
      this.statusChart.resize();
    },
  },
};
</script>

<style lang="less" scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
  transform: scale(1.5);
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
