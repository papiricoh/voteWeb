<template>
  <div class="chart-wrapper">
    <div ref="chartContainer" class="chart" />
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

const chartContainer = ref(null);
let chartInstance = null;

// Definimos múltiples líneas con valores y colores únicos
const markLines = [
  { price: 110, label: 'Precio Actual', color: 'red', style: 'solid' },
  { price: 140, label: 'Resistencia', color: 'blue', style: 'dashed' },
  { price: 100, label: 'Soporte', color: 'green', style: 'dotted' },
  { price: 105, label: 'Objetivo', color: 'orange', style: 'solid' },
];

const mainCategories = ['2024-06-01', '2024-06-02', '2024-06-03', '2024-06-04', '2024-06-05', '2024-06-06', '2024-06-07', '2024-06-08', '2024-06-09', '2024-06-10', '2024-06-11', '2024-06-12', '2024-06-13', '2024-06-14', '2024-06-15', '2024-06-16', '2024-06-17', '2024-06-18', '2024-06-19', '2024-06-20'];
const mainData = [
  [100, 110, 95, 105],
  [105, 120, 102, 115],
  [115, 125, 110, 120],
  [125, 105, 90, 140],
  [105, 110, 100, 115],
  [110, 115, 105, 120],
  [115, 120, 110, 125],
  [120, 125, 115, 130],
  [125, 40, 20, 135],
  [40, 90, 25, 100],
  [90, 100, 80, 105],
  [100, 105, 95, 110],
  [105, 110, 100, 115],
  [110, 80, 70, 120],
  [80, 120, 30, 125],
  [120, 125, 115, 130],
  [125, 130, 120, 135],
  [130, 135, 125, 140],
  [135, 140, 130, 145],
  [140, 145, 135, 150],
  
]

onMounted(() => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value);

    chartInstance.setOption({
      title: {
        text: '',
      },
      legend: {
        top: 20,
        left: 'center',
        data: ['Acciones', 'MA5', 'MA10', 'MA20', 'MA30']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'category',
        data: mainCategories,
        boundaryGap: true,
      },
      yAxis: {
        type: 'value',
        scale: true,
      },
      grid: {
        bottom: 80
      },
      dataZoom: [
        {
          textStyle: {
            color: '#8392A5'
          },
          handleIcon:
            'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          dataBackground: {
            areaStyle: {
              color: '#8392A5'
            },
            lineStyle: {
              opacity: 0.8,
              color: '#8392A5'
            }
          },
          brushSelect: true
        },
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'candlestick',
          name: 'Acciones',
          itemStyle: {
            color: "green",
            color0: "red",
            borderColor: undefined,
            borderColor0: undefined
          },
          data: mainData,

          markLine: {
            symbol: 'none',
            data: markLines.map((line) => ({
              yAxis: line.price, // Posición de la línea
              lineStyle: {
                color: line.color, // Color de la línea
                type: line.style, // Estilo de línea (solid, dashed, dotted)
                width: 2, // Grosor de la línea
              },
              label: {
                formatter: `${line.label}: ${line.price}`, // Etiqueta
                position: 'insideEnd',
                color: line.color, // Color del texto
              },
            })),
          },
        },
      ],
    });
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 400px;

  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>
