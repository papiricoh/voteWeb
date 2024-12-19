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
  { price: 115, label: 'Resistencia', color: 'blue', style: 'dashed' },
  { price: 100, label: 'Soporte', color: 'green', style: 'dotted' },
  { price: 105, label: 'Objetivo', color: 'orange', style: 'solid' },
];

onMounted(() => {
  if (chartContainer.value) {
    chartInstance = echarts.init(chartContainer.value);

    chartInstance.setOption({
      title: {
        text: 'Gráfico con Múltiples Líneas y Colores',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'category',
        data: ['2024-06-01', '2024-06-02', '2024-06-03'],
        boundaryGap: true,
      },
      yAxis: {
        type: 'value',
        scale: true,
      },
      series: [
        {
          type: 'candlestick',
          data: [
            [100, 110, 95, 105],
            [105, 120, 102, 115],
            [115, 125, 110, 120],
          ],
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
