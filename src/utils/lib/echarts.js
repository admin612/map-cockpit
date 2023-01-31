import * as echarts from "echarts/core";
import {
  Map3DChart,
  // Lines3DChart,
  Scatter3DChart,
} from "echarts-gl/charts";
import { Grid3DComponent } from "echarts-gl/components";
// import { Geo3DComponent } from "echarts-gl/components";
// import {
//   BarChart,
//   LineChart,
//   PieChart,
//   MapChart,
//   PictorialBarChart,
//   RadarChart,
// } from "echarts/charts";

// import {
//   TitleComponent,
// TooltipComponent,
//   GridComponent,
//   PolarComponent,
//   AriaComponent,
//   ParallelComponent,
//   LegendComponent,
//   RadarComponent,
//   ToolboxComponent,
//   DataZoomComponent,
//   VisualMapComponent,
//   TimelineComponent,
//   CalendarComponent,
// } from "echarts/components";

// import { CanvasRenderer } from "echarts/renderers";

echarts.use([
  // LegendComponent,
  // TitleComponent,
  // TooltipComponent,
  // GridComponent,
  // PolarComponent,
  // AriaComponent,
  // ParallelComponent,
  // BarChart,
  // LineChart,
  // PieChart,
  // MapChart,
  // RadarChart,
  // CanvasRenderer,
  // PictorialBarChart,
  // RadarComponent,
  // ToolboxComponent,
  // DataZoomComponent,
  // VisualMapComponent,
  // TimelineComponent,
  // CalendarComponent,
  Map3DChart,
  Grid3DComponent,
  // Geo3DComponent,
  // Lines3DChart,
  Scatter3DChart,
]);
export default echarts;
