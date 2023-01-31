import { unref, nextTick, computed, ref } from "vue";
import echarts from "@/utils/lib/echarts";

export function useECharts(elRef) {
  let chartInstance = null;
  const cacheOptions = ref({});

  const getOptions = computed(() => {
    return cacheOptions.value;
  });

  function initCharts() {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }
    chartInstance = echarts?.init(el);
  }

  function setOptions(options) {
    cacheOptions.value = options;
    return new Promise((resolve, reject) => {
      nextTick(() => {
        if (!chartInstance) {
          initCharts();
          !chartInstance && reject(null);
        }
        chartInstance?.clear();
        const opt = unref(getOptions);
        chartInstance?.setOption(opt);
        resolve(chartInstance);
      });
    });
  }

  function resize() {
    chartInstance?.resize();
  }

  return {
    setOptions,
    resize,
    echarts,
  };
}
